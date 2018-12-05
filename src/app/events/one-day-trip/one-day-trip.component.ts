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
  public eventId;
  public event:any;
  closeResult: string;
  regForms = [{'id':'Private', 'name':'Use my vehicle'}, {'id':'Company', 'name': 'Company Transportation'}];
  gender = [{'id':'male', 'name':'Male'}, {'id':'female', 'name': 'Female'}];
 
  meal = [{'id':'vegi', 'name':'Vegi'}, {'id':'non vegi', 'name': 'Non vegi'}];
  constructor(private repository : RepositoryService, private route:Router,private rou:ActivatedRoute,     ) { }



  


  ngOnInit() {
    this.registerForm = new FormGroup({
     
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      nic:new FormControl('',[Validators.required]),
      dob:new FormControl('',[Validators.required]),
      transportationMode:new FormControl('',[Validators.required]),
      
      mealType:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      spouseName:new FormControl('',[Validators.required]),
      spouseNic:new FormControl('',[Validators.required]),
      spouseDob:new FormControl('',[Validators.required]),
      
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

     this.repository.getData('event/getall/'+this.event.id)
     .subscribe(res => {
       this.event = res ;
       console.log(res);
       var myObjStr = JSON.stringify(res);
       console.log(this.event.id);
 
     },
     (error) => {
     //  this.handleErrors(error);n
                }
    )
    this.eventId=this.event.id;
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
  
    let reg:OneDayTrip= {
      eventId:this.eventId,
      name:registerFormValue.name,
      email:registerFormValue.email,
      nic:registerFormValue.nic,
      dob:registerFormValue.dob,
      transportationMode:registerFormValue.transportationMode,
      mealType:registerFormValue.mealType,
      gender:registerFormValue.gender,
      spouseName:registerFormValue.spouseName,
      spouseNic:registerFormValue.spouseNic,
      spouseDob:registerFormValue.spouseDob,
     
    };
    
    let apiUrl = 'event/registerForOneDayTrip';
  
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
