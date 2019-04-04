import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  constructor(private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }
  
  public msg="Add Schedule"
  public schedule: any;
  public scheduleName:any;
  public eventId:any;
  public Message: any;
  public schedulearray= [""];
  public TeamId:any;
  public ClickNum:any;
  public team1:any;
  public team2:any;
  public team3:any;
  public team4:any; 
  public team5:any;
  public team6:any;
  public team7:any; 
  public team8:any; 
  public team9:any;
  public team10:any;
  public team11:any;
  public team12:any;
  public team13:any;
  public team14:any; 
  public team15:any;
  public team16:any;
  

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getCricketTeams()

  }

  public getCricketTeams() {
    let apiAddress: string = "Cricketmatch/viewteammembers/" + this.eventId;

    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.schedule = res;
        
      }, (error => {

      })
      )
  }

  addHero(newHero) {
    for (var i=0; i<16; i++) {
      newHero.push(i);
      if (newHero) {
        if (this.schedulearray.indexOf(newHero) < 0) {
          this.schedulearray.push(newHero);
          this.ClickNum = newHero;
          
        }
      }
    }

  }

  addId(id) {
    

    this.TeamId = id;
    if (this.ClickNum == 1) { this.team1 = this.TeamId; }
    else if (this.ClickNum == 2) { this.team2 = this.TeamId; }
    else if (this.ClickNum == 3) { this.team3 = this.TeamId; }
    else if (this.ClickNum == 4) { this.team4 = this.TeamId; }
    else if (this.ClickNum == 5) { this.team5 = this.TeamId; }
    else if (this.ClickNum == 6) { this.team6 = this.TeamId; }
    else if (this.ClickNum == 7) { this.team7 = this.TeamId; }
    else if (this.ClickNum == 8) { this.team8 = this.TeamId; }
    else if (this.ClickNum == 9) { this.team9 = this.TeamId; }
    else if (this.ClickNum == 10) { this.team10 = this.TeamId; }
    else if (this.ClickNum == 11) { this.team11 = this.TeamId; }
    else if (this.ClickNum == 12) { this.team12 = this.TeamId; }
    else if (this.ClickNum == 13) { this.team13 = this.TeamId; }
    else if (this.ClickNum == 14) { this.team14 = this.TeamId; }
    else if (this.ClickNum == 15) { this.team15 = this.TeamId; }
    else if (this.ClickNum == 16) { this.team16 = this.TeamId; }


  }

  public submitData() {

    

    let formData = new FormData();


    formData.append('EventId', this.eventId),
    formData.append('SchName', this.scheduleName);
    formData.append('team1', this.team1);
    formData.append('team2', this.team2);
    formData.append('team3', this.team3);
    formData.append('team4', this.team4);
    formData.append('team5', this.team5);
    formData.append('team6', this.team6);
    formData.append('team7', this.team7);
    formData.append('team8', this.team8);
    formData.append('team9', this.team9);
    formData.append('team10', this.team10);
    formData.append('team11', this.team11);
    formData.append('team12', this.team12);
    formData.append('team13', this.team13);
    formData.append('team14', this.team14);
    formData.append('team15', this.team15);
    formData.append('team16', this.team16);

    let apiUrl = 'Cricketmatch/addshedule';

    this.repository.postFile(apiUrl, formData)
      .subscribe(res => {
        this.Message = res;   
        this.router.navigate(['events/cricketmatchs/scheduleview/'+this.eventId]);
      },
        (error => {
          this.repository.errorAlert("try again, something wrong");
        })
      )
  }

  public alertSub(){
    this.repository.SuccessAlert(this.msg);
  }
public setscheduleName(name){
  this.setscheduleName = name;
}

}
