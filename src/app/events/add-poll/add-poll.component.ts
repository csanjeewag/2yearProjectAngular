import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {

  constructor(private router: Router,  private repository : RepositoryService) { }
  public pollForm: FormGroup;
  public poll:any;
  
  ngOnInit() {
  
    this.pollForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl(''),
      destination1: new FormControl('',[Validators.required]),
      destination2: new FormControl('',[Validators.required]),
      destination3: new FormControl(''),
      destination4: new FormControl(''),
      destination5: new FormControl(''),
      closingDate: new FormControl('',[Validators.required])

     })
  }

  public validateControl(controlName: string) {
    if (this.pollForm.controls[controlName].invalid && this.pollForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.pollForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }



  public createPoll(pollFormvalue) {
   
    if (this.pollForm.valid) {
      
      let formdata = new FormData;
       
      formdata.append('Title',pollFormvalue.title);
      formdata.append('Description',pollFormvalue.description);
       formdata.append('ClosingDate',pollFormvalue.closingDate);
      formdata.append('IsActive','true');

      let apiUrl = 'PollEvent/createPoll';
      
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {
          this.poll=res;
          this.repository.SuccessAlert("Poll is created succesfully");


   let formdata1=new FormData;
   formdata1.append('PollId',this.poll.id);
   formdata1.append('Dest',pollFormvalue.destination1);
   let apiUrl1 = 'PollEvent/addDestination';

   this.repository.postFile(apiUrl1, formdata1)
  .subscribe(res =>  {
  },
  (error => {
   })
  )

  let formdata2=new FormData;
  formdata2.append('PollId',this.poll.id);
  formdata2.append('Dest',pollFormvalue.destination2);
  let apiUrl2 = 'PollEvent/addDestination';

  this.repository.postFile(apiUrl2, formdata2)
 .subscribe(res =>  {
 },
 (error => {
  })
 )

 let formdata3=new FormData;
 formdata3.append('PollId',this.poll.id);
 formdata3.append('Dest',pollFormvalue.destination3);
 let apiUrl3 = 'PollEvent/addDestination';

 this.repository.postFile(apiUrl3, formdata3)
.subscribe(res =>  {
},
(error => {
 })
)

let formdata4=new FormData;
 formdata4.append('PollId',this.poll.id);
 formdata4.append('Dest',pollFormvalue.destination4);
 let apiUrl4 = 'PollEvent/addDestination';

 this.repository.postFile(apiUrl4, formdata4)
.subscribe(res =>  {
},
(error => {
 })
)

let formdata5=new FormData;
 formdata5.append('PollId',this.poll.id);
 formdata5.append('Dest',pollFormvalue.destination5);
 let apiUrl5 = 'PollEvent/addDestination';

 this.repository.postFile(apiUrl5, formdata5)
.subscribe(res =>  {
},
(error => {
 })
)




this.router.navigate(['profile/home']);

            
         
            
          },
          (error => {
          })
        )
  





    }
  }


}
