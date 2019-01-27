import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{NewTask} from './../_interfaces/new-task';
  import {  RepositoryService } from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute} from '@angular/router';
  import { AuthServiceService } from "./../../AuthGards/auth-service.service";
  import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private router: Router,  private repository : RepositoryService,private auth:AuthServiceService,config: NgbModalConfig, private modalService: NgbModal) { }

public taskForm: FormGroup;
public task:any;
public taskId:any;
public todaydate:Date;
public goalText:any;
public employeeId:any;
public result:any;
public employees:Array<any> = [];

  ngOnInit() {
    this.getTask();
    this.getAllEmployee();

    this.taskForm = new FormGroup({        
    
      //TaskId: new FormControl('',[Validators.required,Validators.maxLength(5)]),
      TaskName:  new FormControl('',[Validators.required]),
      //EventName: new FormControl(''),
      StartDate: new FormControl('',[Validators.required]),
      EndDate: new FormControl('',[Validators.required]),
      BudgetedCost: new FormControl('',[Validators.required]),
      Description: new FormControl(''),
      EmployeeEmpId: new FormControl('',[Validators.required]),
      //Admin: new FormControl('',[Validators.required]),
      },
      //{ validators: isvalidconfirmpassword }
      );
  }


  
  public updateTask(profileFormValue) {

    console.log("updateawaaa"+this.employeeId+" "+this.taskId+" "+this.goalText)
    let t: NewTask = {
      
      //taskId:this.taskId,
      taskName:profileFormValue.TaskName,
      eventId:profileFormValue.EventName,
      startDate:profileFormValue.StartDate,
      endDate:profileFormValue.EndDate,
      budgetedCost:profileFormValue.BudgetedCost,
      description:profileFormValue.Description,
      employeeEmpId:this.employeeId,
      employees:this.employees,
      admin:profileFormValue.Admin,
      status:false,
      addDate:this.todaydate
    };

    let apiUrl = '/task/updatetask';
    this.repository.postData(apiUrl,t)
        .subscribe(res => {
          this.router.navigate(['/task/list']);
            
          },
          (error => {
          //  this.errorHandler.handleError(error);
          //  this.errorMessage = this.errorHandler.errorMessage;
          })
        )
    }
    public fillTask(){
      //this.taskForm.controls['TaskId'].setValue(this.task.taskId);
      this.taskForm.controls['TaskName'].setValue(this.task.taskName);
      //this.taskForm.controls['EventName'].setValue(this.task.eventName);
      this.taskForm.controls['StartDate'].setValue(this.task.startDate);
      this.taskForm.controls['EndDate'].setValue(this.task.endDate);
      this.taskForm.controls['BudgetedCost'].setValue(this.task.budgetedCost);
      this.taskForm.controls['Description'].setValue(this.task.description);
      this.taskForm.controls['EmployeeEmpId'].setValue(this.task.employeeEmpId);
      //this.taskForm.controls['Admin'].setValue(this.task.admin);
      console.log()
      }
      

     
   
  public getTask(){

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
       this.taskId=id;
      
      this.repository.getData('task/'+id)
      
      .subscribe(res => {
        this.task = res as any;
        console.log( this.task)
        this.fillTask();
      },
      (error) => {
      //  this.handleErrors(error);n
      })
     });
   
  }

  open(content) {
    this.modalService.open(content);
    //console.log("opencome")
  }

  public selectEmp(id,Name)
{
this.goalText=Name;
this.employeeId=id;
console.log(this.employeeId+""+Name);
}  
  
public  getAllEmployee(){
  this.repository.getData('')
  .subscribe(res => {
    this.result = res ;
    //var myObjStr = JSON.stringify(res);
 
   console.log(this.result);
   console.log(this.result.empId);
  },
  (error) => {
  //  this.handleErrors(error);n
  })
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


}
