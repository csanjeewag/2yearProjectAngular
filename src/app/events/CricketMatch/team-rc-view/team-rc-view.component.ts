import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../../ShareData/repository.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-team-rc-view',
  templateUrl: './team-rc-view.component.html',
  styleUrls: ['./team-rc-view.component.css']
})
export class TeamRcViewComponent implements OnInit {

  constructor(private repository:RepositoryService,private router: Router,) { }
  public teams:any;

  ngOnInit() {
this.getAllCricketTeams();
  }

public getAllCricketTeams(){
    let apiAddress: string = "event/getcricketteams";

    this.repository.getData(apiAddress)
    .subscribe(res =>  {
      this.teams = res;
      console.log(res);
    },(error=>{

    }))
  }

  public updateteam(id){
    this.router.navigate(['/teamupdate/updateteam',id]);
  }
}
