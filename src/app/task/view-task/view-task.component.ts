import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  public result : any;
  public stts:string;
  public isAdmin:any;
  public taskId:any;
  public taskdetails:any;
  public employee:any;
  public eventId:any;
public Loading:any;
public completedtasks:any;
public IsAdmin:any;
public IsRC:any;

  constructor(private repo :RepositoryService,private router: Router,public auth:AuthServiceService, private route: ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { 
  config.backdrop = 'static';
  config.keyboard = false;
  }
 
  ngOnInit() {
    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();
    this.eventId=this.repo.curentEventId;
  
  //  this.getAllTask();
    this.getEventById(this.eventId);
    this.changeStatus(status);
      //this.isAdmin = this.auth.isAdmin();
  }

public getEventById(eventId){
  console.log(eventId)
  this.repo.getData('task/getall/'+this.eventId)
  .subscribe(res => {
    this.result = res ;

   console.log(this.result);
    
  },
  (error) => {

  })
}


public changeStatus(status){
  if(status)
    {
      this.stts="Completed"
    }
    else
    {
      this.stts="Not Completed"
    }
}
 

public detailsTask(tid) {


   
      
      this.repo.getData('task/'+tid)
      .subscribe(res => {
        this.taskdetails = res as any;
     this.changeStatus(this.taskdetails.status)

      },
      (error) => {
      })
     

}




public getempfortask(tid){
  
    console.log(tid)
    this.repo.getData('task/getempfortask/'+tid)
    .subscribe(res => {
      //this.result = res as Observable<NewTask>;
      this.employee = res as any;
      console.log(this.employee);
    },
    (error) => {
    //  this.handleErrors(error);n
    })
   

  }

  public updateTask(id){
    this.router.navigate(['/task/updatetask/'+id]);
  }

  open(content,id) {
    this.detailsTask(id);
    this.getempfortask(id);
    this.modalService.open(content);
  }

  public deleteTask(id){
    this.Loading = id;
    this.repo.getData('task/deletetask/'+id)
    .subscribe(res => {
      this.getEventById(this.eventId);
    this.Loading = false;
 
  },
   (error) => {
   this.Loading =false;
   })
  }


 
  

}
