import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {  RepositoryService} from './../../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router,private repository: RepositoryService) { }

  public teamForm: FormGroup;

  ngOnInit() {
    this.teamForm = new FormGroup({
      teamId: new FormControl('',[Validators.required]),
      teamName: new FormControl('',[Validators.required]),
      teamCaptainId: new FormControl('',[Validators.required]),
      teamCaptainName: new FormControl('',[Validators.required]),
      teamCaptainEmail: new FormControl('',[Validators.required]),
      teamCaptainContact: new FormControl('',[Validators.required]),
      
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

    let apiUrl = 'event/addcricketteam';
    
      this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/events/CricketMatch/teamview']);
          },
          (error => {
            console.log(error);
            console.log("data not submitted");
          })
        )
  }


}
