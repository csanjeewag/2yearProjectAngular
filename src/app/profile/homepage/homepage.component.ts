import { Component, OnInit } from '@angular/core';
import {  RepositoryService} from './../../ShareData/repository.service';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }
public Last3Event:any;
public Upcommming3Event:any;
public ImageUrl:any;



  ngOnInit() {
    
this.ImageUrl = this.repository.ImageUrl;
    this.getUpComingEvents();
    this.getpastEvents();
  }
  public urlAddress;
  public events:any;
 
  public detailsemployee( id) {
    
    this.router.navigate(['/profile/list',id]);
 
}


public  getUpComingEvents(){
  this.repository.getData('pastevent/getupcomingeventlast3')
  .subscribe(res => {
    this.Upcommming3Event = res ;
 
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
register(pKeys){

  ///this.router.navigate(['/profile/list',gonextId])
  console.log(pKeys);
  this.urlAddress = "events/viewEventPage/"+pKeys;
  this.router.navigate([this.urlAddress]);
  console.log(this.urlAddress);
}
public Task(){
  this.router.navigate(['/task/']);

}

public onClick(){
  this.urlAddress = "events/addevent";
  this.router.navigate([this.urlAddress]);
}

public UpdateEvents(){
  this.urlAddress="events/updateevent/2";
  this.router.navigate([this.urlAddress]);

}


}


