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
public emailFormArray:any;
public employee:any;
public taskstatus:any;
public sdate:any;
public edate:any;
public IsAdmin:any;
public IsRC:any;

public event:any;
error1:any={isError:false,errorMessage:''};
error2:any={isError:false,errorMessage:''};
public errorMessage:any;



  ngOnInit() {
    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();
    this.gettask();
    this.getAllEmployee();
    this.getempfortask(this.taskId);


    this.taskForm = new FormGroup({        
    
      //TaskId: new FormControl('',[Validators.required,Validators.maxLength(5)]),
      TaskName:  new FormControl('',[Validators.required]),
      //EventName: new FormControl(''),
      StartDate: new FormControl('',[Validators.required]),
      EndDate: new FormControl('',[Validators.required]),
      BudgetedCost: new FormControl('',[Validators.required]),
      Description: new FormControl(''),
     
      },
      );
  }


  
  public updateTask(value) {

    
    let t:NewTask={
        
        taskId:this.taskId,
        taskName:value.TaskName,
        eventId:this.repository.curentEventId,
        startDate:value.StartDate,
        endDate:value.EndDate,
        budgetedCost:value.BudgetedCost,
        description:value.Description,
        employees:this.employees,
        status:this.taskstatus,
        addDate:value.addDate,
    };
let apiUrl = 'task/create';

        this.repository.postData(apiUrl, t)
          .subscribe(res =>  {
              this.router.navigate(['task/list']);
         
            },
            (error => {
              //this.Message="project updated Failed,Try Again!";
            })
          )
      
      }

      public gettask(){

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
      

        
    public fillTask(){

      this.sdate=""+this.task.startDate;
      let x=this.sdate.split('T')
      this.sdate=x[0];

      this.edate=""+this.task.endDate;
      let y=this.edate.split('T')
      this.edate=x[0];
      
      this.taskForm.controls['TaskName'].setValue(this.task.taskName);
      this.taskForm.controls['StartDate'].setValue(this.sdate);
      this.taskForm.controls['EndDate'].setValue(this.edate);
      this.taskForm.controls['BudgetedCost'].setValue(this.task.budgetedCost);
      this.taskForm.controls['Description'].setValue(this.task.description);
      
      console.log()
      }
      

     
   


  open(content) {
    this.modalService.open(content);
  }

  public selectEmp(id,Name)
{
this.goalText=Name;
this.employeeId=id;
console.log(this.employeeId+""+Name);
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
    
   

onChange(id:string,empName:string, isChecked: boolean) {
  if(isChecked) {
    console.log(empName)
    this.employeeId=id;
    this.employees.push(id);
    this.emailFormArray.push(empName);
    console.log(this.employeeId)

  } else {
    let index = this.emailFormArray.indexOf(empName);
    this.emailFormArray.splice(index,1);
  }
}

onChangeStatus(isChecked: boolean){
  if(isChecked){
    this.taskstatus=true;
  }
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

  public getempfortask(tid){
  
    console.log(tid)
    this.repository.getData('task/getempfortask/'+tid)
    .subscribe(res => {
      //this.result = res as Observable<NewTask>;
      this.employee = res as any;
      console.log(this.employee);

    },
    (error) => {
    //  this.handleErrors(error);n
    })
   

  }

  public geteventbyid(eventid){
    this.repository.getData('Event/getall/'+eventid)
        .subscribe(res => {
          this.event = res ;
  
         console.log('----------->'+this.event.startDate);
          
        },
        (error) => {
        //  this.handleErrors(error);n
        })
  }
  compareTwoDates(){
    if(new Date(this.taskForm.controls['EndDate'].value)<new Date(this.taskForm.controls['StartDate'].value)){
      this.error1={
        isError:true,errorMessage:'*End date before strat date'};
    }
    if(new Date(this.taskForm.controls['EndDate'].value)>new Date(this.event.startDate)){
      this.error1={
        isError:true,errorMessage:'*End date after event date'};
  
    }
  
    
  }
  compareTwoDates2(){
    if(new Date(this.taskForm.controls['StartDate'].value)>new Date(this.event.startDate)){
       this.error2={isError:true,errorMessage:'*Event date before Task strat date'};
    }
    
  else{
    this.error2={isError:false,errorMessage:''};
  }
  }




}
