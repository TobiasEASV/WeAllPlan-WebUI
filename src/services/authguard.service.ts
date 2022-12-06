import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken = jwtDecode(token) as Token;
      let currentDate = new Date();
      if (decodedToken.exp){
        let expiry =  new Date(decodedToken.exp*1000);

        if (currentDate<expiry){
          return true;
        }
      }
    }
    this.router.navigate(['./Login'])
    return false;
  }
}

class Token {
  exp?: number;
}
