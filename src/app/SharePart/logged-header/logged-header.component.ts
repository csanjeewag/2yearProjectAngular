import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";
@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {

  constructor( private router : Router, private auth :AuthServiceService) { }
public islogged:any;
public isAdmin:any;
  ngOnInit() {
    this.islogged = this.auth.islogged();
    this.isAdmin= this.auth.isAdmin();
  }

  public  logout(){
  this.auth.loggout();
  }

}
