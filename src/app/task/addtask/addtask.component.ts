import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import {  RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import{NewTask} from './../_interfaces/new-task';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {formatDate } from '@angular/common';



@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
public taskForm: FormGroup;
public result:any;
public task:any;
public goalText:any;
public employeeId:any;
public employees:Array<string> = [];
public todaydate:Date;
emailFormArray: Array<any> = [];
public eventid:any;
public event:any;
public eventdate:any;
error1:any={isError:false,errorMessage:''};
error2:any={isError:false,errorMessage:''};
public errorMessage:any;

  constructor(private router: Router,  private repository : RepositoryService,config: NgbModalConfig, private modalService: NgbModal) { }
  

  ngOnInit() {
    this.getAllEmployee();
    this.getToday();
    this.getallevents();
    this.taskForm = new FormGroup({        
    
      //TaskId: new FormControl('',[Validators.required,Validators.maxLength(5)]),
      TaskName:  new FormControl('',[Validators.required]),
      //EventName: new FormControl(''),
      StartDate: new FormControl('',[Validators.required]),
      EndDate: new FormControl('',[Validators.required]),
      BudgetedCost: new FormControl('',[Validators.required]),
      Description: new FormControl(''),
      EmployeeEmpId: new FormControl(''),
      //Admin: new FormControl('',[Validators.required]),
      },
      //{ validators: isvalidconfirmpassword }
      );
    }

   
    
    public redirectToTaskList(){
      this.router.navigate(['task']);
    }


    public createTask(profileFormValue) {
      //console.log(profileFormValue)
      if (this.taskForm.valid) {
        this.executeTaskCreation(profileFormValue);
  
      }
    }
   

  private executeTaskCreation(profileFormValue) {
    let t: NewTask = {
      
    //taskId:profileFormValue.TaskId,
    taskName:profileFormValue.TaskName,
    eventId:'2',
    startDate:profileFormValue.StartDate,
    endDate:profileFormValue.EndDate,
    budgetedCost:profileFormValue.BudgetedCost,
    description:profileFormValue.Description,
    employeeId:this.employeeId,
    employees:this.employees,
    //admin:profileFormValue.Admin,
    status:false,
    addDate:profileFormValue.addDate,

    };

    let apiUrl = 'task/create';
    this.repository.postData(apiUrl,t)
        .subscribe(res => {
          this.router.navigate(['task/list']);
            
          },
          
        )
    }

    public getToday(){
      this.todaydate=new Date()
    }
    
    public  getAllEmployee(){
      this.repository.getData('employee')
      .subscribe(res => {
        this.result = res ;
        //var myObjStr = JSON.stringify(res);
     
       console.log(this.result);
        
      },
      (error) => {
      //  this.handleErrors(error);n
      })
    }
    
    open(content) {
      this.modalService.open(content);
    }

    public selectEmp(id,Name)
{
this.goalText=Name;
this.employeeId=id;
  console.log();
}  


 public validateControl(controlName: string) {
    if (this.taskForm.controls[controlName].invalid && this.taskForm.controls[controlName].touched)
      return true;

    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.taskForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public touchanddirty(controlName: string) {
    if (this.taskForm.controls[controlName].value !=="" && this.taskForm.controls[controlName].touched )
      return true;

    return false;
  }

  public validateDate(group: FormGroup) {
    const invalid = group.get('startDate').value > group.get('endDate').value;
  
  
    return invalid ? { 'invalidDate': true } : null;
  }

  onChange(id:string,empName:string, isChecked: boolean) {
    if(isChecked) {
      this.employeeId=id;
      this.employees.push(id);
      this.emailFormArray.push(empName);
      console.log(this.employeeId)

    } else {
      let index = this.emailFormArray.indexOf(empName);
      this.emailFormArray.splice(index,1);
    }
}


public getallevents(){
  this.repository.getData('Event/getall/'+this.eventid)
      .subscribe(res => {
        this.event = res ;

       console.log(this.result);
        
      },
      (error) => {
      //  this.handleErrors(error);n
      })
}

compareTwoDates(){
  if(new Date(this.taskForm.controls['EndDate'].value)<new Date(this.taskForm.controls['StartDate'].value)){
    this.error1={
      isError:true,errorMessage:'End date before strat date'};
  }
  else{
    this.error1={isError:true,errorMessage:''};

  }
}
compareTwoDates2(){
  this.eventdate=this.event.eventDate;
  //this.eventdate=2019-1-30;
  if(new Date(this.taskForm.controls['StartDate'].value)>new Date(this.eventdate)){
     this.error2={isError:true,errorMessage:'Event date before Task strat date'};
  }
  
else{
  this.error2={isError:false,errorMessage:''};
}
    

  }
 
}





  

    