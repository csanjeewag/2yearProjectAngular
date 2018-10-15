import { Injectable } from '@angular/core';
import { environment } from './..//../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public urlAddress : string = environment.employee_url;
  public userurl : string = environment.employee_url;

  constructor() { }
}
