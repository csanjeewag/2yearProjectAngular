import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../../ShareData/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";

@Component({
  selector: 'app-captain-email',
  templateUrl: './captain-email.component.html',
  styleUrls: ['./captain-email.component.css']
})
export class CaptainEmailComponent implements OnInit {

  constructor(private auth :AuthServiceService,private route: ActivatedRoute, private router: Router, private repository: RepositoryService ) { }
  
    public msg = "Success Email Details.";
    public Message:any;
    public Form: FormGroup;
    public eventId: any;
    public logId:any;
    
   ngOnInit() {
      this.logId = this.auth.tokencheckId();
      this.eventId = this.route.snapshot.paramMap.get('id');
      this.Form = new FormGroup({
      formTopic: new FormControl('',[Validators.required]),
      formDiscription1: new FormControl('',[Validators.required]),
      formDiscription2: new FormControl('',[Validators.required]),
      formDiscription3: new FormControl(''),
    })
   }

  public validateControl(controlName: string) {
    if (this.Form.controls[controlName].invalid && this.Form.controls[controlName].touched)
      return true;
    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.Form.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public sendEmail(){
    alert(this.msg);
  }
  
  public emailData(value){
    console.log(value);
    let formData = new FormData();
    formData.append('eventId',this.eventId);
    formData.append('senderId',this.logId);
    formData.append('topic',value.formTopic);
    formData.append('description1',value.formDiscription1);
    formData.append('description2',value.formDiscription2);
    formData.append('description3',value.formDiscription3);

    console.log(this.eventId);
    console.log(this.logId);

    let apiUrl = "Cricketmatch/sendemails/"+this.eventId;
    
      this.repository.postFile(apiUrl, formData)
        .subscribe(res => {
         this.Message = res;
         this.router.navigate(['events/cricketmatchs/emailview/'+this.eventId]);
          },
          (error => {
            this.Message = "try again, something wrong";
          })
        )
  }

}
