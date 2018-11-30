import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router ,ParamMap, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team-update-form',
  templateUrl: './team-update-form.component.html',
  styleUrls: ['./team-update-form.component.css']
})
export class TeamUpdateFormComponent implements OnInit {
  public teamId: any;
  public team: any;
  
  constructor(private repository: RepositoryService,private route: ActivatedRoute,private router: Router, ) { }

  public teamForm: FormGroup;

  ngOnInit() {
    this.getCricketTeam();
    this.teamForm = new FormGroup({
      teamId: new FormControl('',[Validators.required]),
      teamName: new FormControl('',[Validators.required]),
      teamCaptainId: new FormControl('',[Validators.required]),
      teamCaptainName: new FormControl('',[Validators.required]),
      teamCaptainContact: new FormControl('',[Validators.required]),
      teamCaptainEmail: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      
    })
  }

  public validateControl(controlName: string) {
    if (this.teamForm.controls[controlName].invalid && this.teamForm.controls[controlName].touched)
      return true;

    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.teamForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public teamData(value){
    console.log(value);
    let formData = new FormData();
    formData.append('CriTeamID',value.teamId);
    formData.append('CriTeamName',value.teamName);
    formData.append('CriTeamCaptionId',value.teamCaptainId);
    formData.append('CriTeamCaptionName',value.teamCaptainName);
    formData.append('CriTeamCaptionContact',value.teamCaptainContact);
    formData.append('CriTeamCaptionEmail',value.teamCaptainEmail);
    formData.append('CriTeamParticipations',value.teamParticipations);
    formData.append('CriTeamVegitarion',value.teamVegitarion);
    formData.append('CriTeamNonVegitarion',value.teamNonVegitarion);

    let apiUrl = 'event/updatecricketteam';
    
      this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
          console.log(res);
          },
          (error => {
            console.log(error);
            console.log("data not submitted");
          })
        )
  }

  public getCricketTeam(){
    
    this.teamId = this.route.snapshot.paramMap.get('id')
    console.log(this.teamId)
    
    this.repository.getData('getposition/'+this.teamId)
    .subscribe(res => {
      this.team = res ;
      console.log(res)
      this.fillTeams();
    },
    (error) => {
    //  this.handleErrors(error);n
    })
  }
   
  public fillTeams(){
    this.teamForm.controls['teamId'].setValue(this.team.criTeamID);
   // this.positionForm.controls['positionName'].setValue(this.roles.positionName);
    //this.positionForm.controls['positionDis'].setValue(this.roles.positionDis);

  }


}
