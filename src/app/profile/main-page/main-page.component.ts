import { Component, OnInit } from '@angular/core';
import {  RepositoryService} from './../../ShareData/repository.service';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }
public Last3Event:any;
public Upcommming3Event:any;
public ImageUrl:any;
public IsAdmin:any;
public IsRC:any;

  ngOnInit() {

    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();  
  this.ImageUrl = this.repository.ImageUrl;
      this.getUpComingEvents();
      this.getpastEvents();
  }

  public  getUpComingEvents(){
    this.repository.getData('pastevent/getupcomingeventlast3')
    .subscribe(res => {
      this.Upcommming3Event = res ;
      console.log(res)
   
  },
    (error) => {
    
    })
   
  }

  public ViewUpcommingEvent(id){
    this.router.navigate(['events/vieweventpage/'+id]);
  }
  
  public ViewPastEvent(id){
    this.router.navigate(['pastevent/event/s/'+id]);
  }
  
  
  public  getpastEvents(){
    this.repository.getData('pastevent/getpasteventlast3')
    .subscribe(res => {
      this.Last3Event = res ;
      console.log(res);
  
  },
    (error) => {
    
    })
   
  }

  public onClick(){
  
    this.router.navigate(['events/addevent']);
  }
  

}
