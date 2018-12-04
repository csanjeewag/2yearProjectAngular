

  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthServiceService } from "./../../AuthGards/auth-service.service";
  @Component({
    selector: 'app-header2',
    templateUrl: './header2.component.html',
    styleUrls: ['./header2.component.css']
  })
  export class Header2Component implements OnInit {
  
  
    constructor( private router : Router, private auth :AuthServiceService) { }
  public islogged:any;
  public isAdmin:any;
  public EmployeeName:any;
    ngOnInit() {
      this.islogged = this.auth.islogged();
      this.isAdmin= this.auth.isAdmin();
      this.EmployeeName = this.auth.tokenGetName();
      //console.log(this.EmployeeName)
    }
  
    public  logout(){
    this.auth.loggout();
    }
  
  }
  