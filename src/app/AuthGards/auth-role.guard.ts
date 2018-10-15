
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from "./auth-service.service";
import { RepositoryService } from "./../ShareData/repository.service";


@Injectable({
  providedIn: 'root'
})

export class AuthRoleGuard implements CanActivate {
  constructor(private auth : AuthServiceService, private repository:RepositoryService){}

log:any;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     
      this.auth.tokencheckRole();
     

 const expectedRole1 = next.data.expectedRole1;
 const expectedRole2 = next.data.expectedRole2;
 const expectedRole3 = next.data.expectedRole3;

 if((this.auth.tokencheckRole()===expectedRole1)||(this.auth.tokencheckRole()===expectedRole2)||(this.auth.tokencheckRole()===expectedRole3)){
   return true;
 }
 else{
   return false;
 }
 
  }
  
}

