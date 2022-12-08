import {Injectable} from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import {AuthSignUpContract} from "@core/interfaces/Auth";
import {User, User2FA, UserInfo} from "@core/interfaces/User";
import {BehaviorSubject} from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn:"root"
})
export class AuthService
{
  userData:any;
  onUserInfoFetched: BehaviorSubject<UserInfo>    = new BehaviorSubject<UserInfo>({});
  getUserInfoFetch()
  {
    return this.onUserInfoFetched;
  }
  
  constructor(private afs:AngularFirestore,private afAuth: AngularFireAuth,public router: Router, // Inject Firebase auth service
  ){
        /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user:any) => { 
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        this.getUserInfo(this.userData.uid);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);

      }
    });
  }

  user2FAType:User2FA=User2FA.sms_otp
  GA_verify:boolean=false
  user2FATypeTemp:User2FA = User2FA.sms_otp
  data: any = {
    mobile     : '',
    //national_id: '',
  }

  /**
  * reset the stored data
  * */
  resetData(){
   this.data = {
     mobile     : '',
     //national_id: '',
   }
    this.user2FAType=User2FA.sms_otp
    this.GA_verify=false
    this.user2FATypeTemp= User2FA.sms_otp
  }


  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user?.toJSON());
        //this.SetUserData(result.user);

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

    // Sign up with email/password
    SignUp(user:User) {
      return this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
        
          //this.SendVerificationMail();
          let profileData : any = {};
          if (result && result.user){
            profileData={firstname:user.firstname,lastname:user.lastname}
          }
          this.SetUserData(result.user,profileData);

        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

      /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any,profileData:any) {
    console.log(user);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData:any = {
      firstname:profileData?.firstname || null,
      lastname:profileData?.lastname || null
    };
    return userRef.set(userData, {
      merge: true,
    });

  }

  getUserInfo(uid:string){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${uid}`
    );
     userRef.get().subscribe((doc:any) => {
      if (doc.exists) {
          this.userData.firstname =doc.data().firstname;
          this.userData.lastname =doc.data().lastname;
          console.log("this.userData",this.userData)
          this.onUserInfoFetched.next(this.userData);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })
     

  }

  //var docRef = db.collection("cities").doc("SF");


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('result',result)
        this.router.navigate(['/']);
        this.SetUserData(result.user,{});
      })
      .catch((error) => {
        window.alert(error);
      });
  }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      
      return this.afAuth.currentUser
        .then((u: any) => {
          console.log("Uuuuuuu",u)
          u.sendEmailVerification()})
        .then(() => {
          this.router.navigate(['/auth/verify-email-address']);
        });
    }

      // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/sign-in']);
    });
  }

}
