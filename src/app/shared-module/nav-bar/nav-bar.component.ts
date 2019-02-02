

  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthServiceService } from "./../../AuthGards/auth-service.service";
  import { RepositoryService } from "./../../ShareData/repository.service";
    @Component({
      selector: 'app-nav-bar',
      templateUrl: './nav-bar.component.html',
      styleUrls: ['./nav-bar.component.css']
    })
    export class NavBarComponent implements OnInit {

    constructor(private repository:RepositoryService, private router : Router, private auth :AuthServiceService) { }
  public islogged:any;
  public isAdmin:any;
  public EmployeeName:any;
  public EmpId:any;
  public notification:any;
  public notificationcount:any;
    ngOnInit() {
      this.islogged = this.auth.islogged();
      this.isAdmin= this.auth.isAdmin();
      this.EmployeeName = this.auth.tokenGetName();
     this.EmpId= this.auth.tokencheckId();
     this.getNotification();
    
    }
  
    public  logout(){
    this.auth.loggout();
    }
  public getNotification(){
    this.repository.getData('Notification/getnotification/'+this.EmpId)
    .subscribe(res => {
      this.notification = res ;
      this.notificationcount = this.notification[0].count;
  },
    (error) => {
    
    })
  }

  public remove(id){
    
    this.repository.getData('Notification/removenotification/'+id+"/"+this.EmpId)
    .subscribe(res => {
      this.getNotification();
      
  },
    (error) => {
    
    })
  }
  public gotoUrl(url){
    if(url!=""){
      this.router.navigate([url]);
    }
 
    
  }

  
  
  }
  