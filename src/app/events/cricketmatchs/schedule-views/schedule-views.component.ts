import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';

@Component({
  selector: 'app-schedule-views',
  templateUrl: './schedule-views.component.html',
  styleUrls: ['./schedule-views.component.css']
})
export class ScheduleViewsComponent implements OnInit {

  constructor( private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }

  public schId:any;
  public eventId: any;
  public teams:any;
  public captains:any;
  public result:any;
  public allSchedule:any;

  ngOnInit() {
    this.schId = this.route.snapshot.paramMap.get('id')
    this.getTeamSchedule();
   //  this.getAllSchedule();
  }

  public getTeamSchedule(){
    let apiAddress: string = "Cricketmatch/getshedulebyid/"+this.schId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.result=res;
      this.teams = this.result.teamnames;
      this.captains = this.result.teamcaptains;
     console.log(this.result);
    },(error =>{
    })
    )
  }
  
  public getAllSchedule(){
    let apiAddress: string = "Cricketmatch/getallshedulebyeventid/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.allSchedule = res;
     console.log(this.allSchedule);
    },(error =>{
    })
    )
  }
  



}
