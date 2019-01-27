import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  public result : any;
  public stts:string;
  public isAdmin:any;
  public taskId;
  public taskdetails:any;
  public employee:any;
  public eid:any;

  constructor(private repo :RepositoryService,private router: Router, private route: ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { 
  config.backdrop = 'static';
  config.keyboard = false;
  }
 
  ngOnInit() {
    this.eid=this.repo.curentEventId;
    this.getAllTask();
    //this.getEventById(this.eid);
    this.changeStatus(status);
      //this.isAdmin = this.auth.isAdmin();
  }

public getEventById(eid){
  this.repo.getData('task/'+eid)
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
        //this.result = res as Observable<NewTask>;
        this.taskdetails = res as any;
        console.log(this.taskdetails);
     

      },
      (error) => {
      //  this.handleErrors(error);
      })
     

}



  public  getAllTask(){
    this.repo.getData('task/getall')
    .subscribe(res => {
      this.result = res ;
      var myObjStr = JSON.stringify(res);
   
     //console.log(this.result.taskId);
     console.log(this.result);
      
    },
    (error) => {
    //  this.handleErrors(error);n
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
    this.router.navigate(['/task/update',id]);
  }
  open(content,id) {
    this.detailsTask(id);
    this.getempfortask(id);
    this.modalService.open(content);
  }

}
