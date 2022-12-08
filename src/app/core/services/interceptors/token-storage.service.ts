import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "@environment/environment";

import {Storage} from "@core/helpers/Storage";


@Injectable({
              providedIn: 'root'
            })
export class TokenStorageService
{
  constructor(private _router: Router) { }




  public saveToken(token: string): void
  {
    Storage.set(environment.accessTokenKey, token);
  }

  public getToken(): string | undefined
  {
    return Storage.get(environment.accessTokenKey);
  }

  /**
   * check token validation
   * @returns boolean the token validity
   * */
  public isAuthorized(): boolean
  {
    let token: any = Storage.get('user')
    if (!token)
    {
      return false;
    }
    //console.log(token,token.uid)
    //let decoded: any = this.decodeToken(token);
    return true;
  }


  decodeToken(token: string): any
  {
    if (!token || token === "")
    {
      return false;
    }

    const parts = token.split(".");

    if (parts.length !== 3)
    {
      return false;
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded)
    {
      return false;
    }

    return JSON.parse(decoded);
  }

  urlBase64Decode(str: string): string | null
  {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4)
    {
      case 0:
      {
        break;
      }
      case 2:
      {
        output += "==";
        break;
      }
      case 3:
      {
        output += "=";
        break;
      }
      default:
      {
        return null;
      }
    }
    return this.b64DecodeUnicode(output);
  }

  b64DecodeUnicode(str: any)
  {
    return decodeURIComponent(
      Array.prototype.map
           .call(this.b64decode(str), (c: any) => {
             return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
           })
           .join("")
    );
  }

  b64decode(str: string): string
  {
    const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output  = "";

    str = String(str).replace(/=+$/, "");

    if (str.length % 4 === 1)
    {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }

    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    )
    {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }


  public saveRefreshToken(token: string): void
  {
    Storage.set(environment.refreshTokenKey, token);
  }

  public getRefreshToken(): string | null
  {
    return Storage.get(environment.refreshTokenKey);
  }

}
