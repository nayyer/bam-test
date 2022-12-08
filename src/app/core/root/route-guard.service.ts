import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenStorageService} from "@core/services/interceptors/token-storage.service";
import {Observable} from "rxjs";
import {AppService} from "@core/root/app.service";

@Injectable({
              providedIn: 'root'
            })
export class RouteGuard implements CanActivate
{

  constructor(public _tokenStorageService: TokenStorageService,private _appService:AppService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log(route,state)
    if (this._tokenStorageService.isAuthorized())
    {
      return true;
    }
    else
    {
      this._appService.signOut();
      return false;
    }

  }
}
