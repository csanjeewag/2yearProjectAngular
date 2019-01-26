import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {


  
  public taskdetails:any;
  public employee:any;
  constructor(private repo :RepositoryService,private router: Router, private route: ActivatedRoute,config: NgbModalConfig, private modalService: NgbModal) { }


  public result:any;

  ngOnInit() {
    
   
    this.getTasks();
  }
public getTasks(){
  this.repo.getData('task/getall')
  .subscribe(res => {
    this.result = res ;

 
   //console.log(this.result.taskId);
   console.log(this.result);
  
    
  },
  (error) => {
  //  this.handleErrors(error);n
  })
}

open(content,id) {
  this.detailsTask(id);
  this.getempfortask(id);
  this.modalService.open(content);
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

  

}
