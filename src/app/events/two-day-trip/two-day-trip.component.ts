import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TwoDayTrip} from './../_interfaces/twoDayTrip';


@Component({
  selector: 'app-two-day-trip',
  templateUrl: './two-day-trip.component.html',
  styleUrls: ['./two-day-trip.component.css']
})
export class TwoDayTripComponent implements OnInit {
  public errorMessage: string='';
  public registerForm: FormGroup;
  public eventId;
  public event:any;
  regForms = [{'id':'Private', 'name':'use my vehicle'}, {'id':'Company', 'name': 'Company Transportation'}];
  accom = [{'id':'SingleRoom', 'name':'single room'}, {'id':'DoubleRsoom', 'name': 'Double Room'},{'id':'FamilyRoom', 'name': 'Family Room'}];
  constructor(private repository : RepositoryService, private route:Router,private rou:ActivatedRoute) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
     
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      nic:new FormControl('',[Validators.required]),
      dob:new FormControl('',[Validators.required]),
      transportationMode:new FormControl('',[Validators.required]),
      accomadation:new FormControl('',[Validators.required]),
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

     this.repository.getData('event/getall/'+this.eventId)
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
  
    let reg: TwoDayTrip = {
      eventId:this.eventId,
      name:registerFormValue.name,
      email:registerFormValue.email,
      nic:registerFormValue.nic,
      dob:registerFormValue.dob,
      transportationMode:registerFormValue.transportationMode,
      accomadation: registerFormValue.accomadation,
      mealType:registerFormValue.mealType,
      gender:registerFormValue.gender,
      spouseName:registerFormValue.spouseName,
      spouseNic:registerFormValue.spouseNic,
      spouseDob:registerFormValue.spouseDob,
     
    };
    
    let apiUrl = 'event/registerForTwoDayTrip';
  
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
