import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {

  constructor(private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }
  public eventId:any;
  public teams:any;

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getTeamSchedule();
  }

  public getTeamSchedule(){
    let apiAddress: string = "Cricketmatch/getteamsheduler/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.teams = res;
     console.log(this.teams);
    },(error =>{

    })
    )
  }

}
