import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {

  constructor( private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }

  public eventId:any;
  public teams:any;
  public captains:any;
public allSchedule:any;
  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getTeamSchedule();
    this.getCaptainSchedule();
    this.getAllSchedule();
  }

  public getTeamSchedule(){
    let apiAddress: string = "Cricketmatch/getteamsheduler/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.teams = res;
 
    },(error =>{
    })
    )
  }
  
  public getCaptainSchedule(){
    let apiAddress: string = "Cricketmatch/getcaptainsheduler/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.captains = res;

    },(error =>{
    })
    )
  }
  

  public redirectToAddSchedule(){
    this.router.navigate(['events/cricketmatchs/scheduleform/'+this.eventId]);
  }

  public getAllSchedule(){
    let apiAddress: string = "Cricketmatch/getallshedulebyeventid/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.allSchedule = res;
      console.log(res)
     
    },(error =>{
    })
    )
  }
  public viewshedule(id){
    this.router.navigate(['events/cricketmatchs/scheduleviews/'+id]);
  }
  

}
