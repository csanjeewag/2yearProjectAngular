import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser} from '../_interfaces/login-user.model';
import {  RepositoryService} from '../../ShareData/repository.service';
import { Router } from '@angular/router';
import { Employee } from '../_interfaces/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-user-interface',
  templateUrl: './login-user-interface.component.html',
  styleUrls: ['./login-user-interface.component.css']
})
export class LoginUserInterfaceComponent implements OnInit {

 public IsHaveAccount:any=true;

  public r :any ;
  public Message: {};
  public loginForm: FormGroup;
  public loginEmail:any;
  public IsLogin:any;
  
  constructor(private router: Router,  private repository : RepositoryService) { }


  ngOnInit() {
  
     }

  }


