import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  constructor(private auth:AuthServiceService,private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }
  
  public message= "Delete Team";
  public teams:any;
  public eventId:any;
  public event:any;
  public ImageUrl:any;
  public IsAdmin:any;
  public IsRC:any;

  ngOnInit() {
    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();
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
      
     
    },(error =>{

    })
    )
  }

  public getEventDetails(){
    let apiAddress: string = "Event/getall/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.event = res;
   
    },(error =>{

    })
    )
  }
  public redirectToAddTeam(){
    this.router.navigate(['events/cricketmatchs/teamform/'+this.eventId]);
  }
  
public redirectToSendMail() {
  this.router.navigate(['events/cricketmatchs/emailview/'+this.eventId]);
}

public redirectToTeamSchedule() {
  this.router.navigate(['events/cricketmatchs/scheduleview/'+this.eventId]);
}

public delete(){
  alert(this.message);
}

public deleteCard(id){
  console.log("hiiiiii"+ id);
let url = "Cricketmatch/deleteteam/"+id;        
  
 this.repository.getData(url)
      .subscribe( crd => {
        this.getCricketTeams();
        this.getEventDetails(); 
      }, (error => {
     
      })
      )
 }


}
