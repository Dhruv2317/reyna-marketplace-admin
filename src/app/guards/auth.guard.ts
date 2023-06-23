import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _http: HttpClient
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve: Function, reject: Function) => {
        if (!this._authService.checkIfLoggedIn()) {
          // not logged in so redirect to login page with the return url
          this._router.navigate(['account', 'login']);
          reject(true);
        }
        else
          resolve(true);
      });
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.checkIfLoggedIn()) {
      return true;
    } else {
      return true;
    }
  }
}
