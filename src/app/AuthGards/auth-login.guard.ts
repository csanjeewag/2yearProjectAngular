
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from "./auth-service.service";

import { RepositoryService } from "./../ShareData/repository.service";
import { LoginUser } from "./../profile/_interfaces/login-user.model";


@Injectable({
  providedIn: 'root'
})

export class AuthLoginGuard implements CanActivate {
  constructor(private auth : AuthServiceService, private repository:RepositoryService){}
logRC:any;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     
   this.auth.tokencheckRole();
 if(this.auth.islogged()){
   return true;
 }
 else{
   return false;
 }
 

  }
 
  
}

