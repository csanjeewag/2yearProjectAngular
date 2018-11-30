import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { OneDayTrip} from './../_interfaces/oneDayTrip';

@Component({
  selector: 'app-one-day-trip',
  templateUrl: './one-day-trip.component.html',
  styleUrls: ['./one-day-trip.component.css']
})
export class OneDayTripComponent implements OnInit {
  public errorMessage: string='';
    public registerForm: FormGroup;
    regForms = [{'id':'Private', 'name':'use my vehicle'}, {'id':'Company', 'name': 'Company Transportation'}];

  constructor(private repository : RepositoryService, private route:Router,private rou:ActivatedRoute) { }
  
 public eventId;

  ngOnInit() {

    this.registerForm = new FormGroup({
     
      employeeId:new FormControl('',[Validators.required]),
      transportationMode:new FormControl('',[Validators.required]),
      numberOfFamilyMembers:new FormControl('',[Validators.required]),
      
      
      
    // year:new FormControl('',[Validators.required]),
     
      
    })

    this.getparamId();

  }

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      console.log(id);
      this.eventId=id;
     });

     console.log(this.eventId);
  }

  public validateControl(controlName: string) {
    if (this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.registerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }
  public touchanddirty(controlName: string) {
    if (this.registerForm.controls[controlName].value !=="" && this.registerForm.controls[controlName].touched )
      return true;

    return false;
  }


  public register(registerFormValue) {

    
    if (this.registerForm.valid) {
      
      this.executeRegistartion(registerFormValue);
     
    }
  }


  private executeRegistartion(registerFormValue) {
  
    let reg: OneDayTrip = {
      pKey:""+this.eventId+"-"+registerFormValue.employeeId,
      eventId:this.eventId,
      employeeId: registerFormValue.employeeId,
      transportationMode:registerFormValue.transportationMode,
      numberOfFamilyMembers:registerFormValue. numberOfFamilyMembers,
     
     
     
    };
    
    let apiUrl = 'registerForOneDayTrip';
  
    this.repository.postData(apiUrl, reg)
      .subscribe(res => {
       // this.router.navigate(['/profile/list']);
         
        },
        (error => {
         
        //  this.errorHandler.handleError(error);
        //  this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

}
