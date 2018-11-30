import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router} from '@angular/router';
import { Event} from './../_interfaces/event';

@Component({
  selector: 'app-event-home-page',
  templateUrl: './event-home-page.component.html',
  styleUrls: ['./event-home-page.component.css']
})
export class EventHomePageComponent implements OnInit {
  public urlAddress;
  public events:any;
  constructor(private repository :RepositoryService,private route:Router) { }

  ngOnInit() {
    this.getUpComingEvents()
   
  
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
    this.route.navigate([this.urlAddress]);
    console.log(this.urlAddress);
  }

}
