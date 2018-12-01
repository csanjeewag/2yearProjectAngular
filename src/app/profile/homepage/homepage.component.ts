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

  ngOnInit() {
  }
  public urlAddress;
  public events:any;
 
  public detailsemployee( id) {
    
    this.router.navigate(['/profile/list',id]);
 
}


public  getUpComingEvents(){
  this.repository.getData('v')
  .subscribe(res => {
    this.events = res ;
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

}


