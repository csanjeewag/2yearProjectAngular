import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  constructor(private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }
  
  public teams:any;
  public eventId:any;
  public event:any;
  public ImageUrl:any;

  ngOnInit() {
    this.ImageUrl = this.repository.ImageUrl;
    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getCricketTeams();
    this.getEventDetails();    
  }

  public getCricketTeams(){
    let apiAddress: string = "Cricketmatch/viewteammembers/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.teams = res;
     console.log(this.teams);
    },(error =>{

    })
    )
  }

  public getEventDetails(){
    let apiAddress: string = "Event/getall/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.event = res;
     console.log(this.event);
    },(error =>{

    })
    )
  }



}
