import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';
@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  public result: any;
  constructor(private repo :RepositoryService,private router: Router, private route: ActivatedRoute) { }
public EmployeeEmpId='1';
  ngOnInit() {

    this.getTaskForEmployee(this.EmployeeEmpId);

}

 public  getTaskForEmployee(empid){
    this.repo.getData('task/gettaskforemp/'+empid)
    .subscribe(res => {
      this.result = res ;
      //var myObjStr = JSON.stringify(res);
   
     //console.log(this.result.taskId);
     console.log();
      
    },
    (error) => {
    //  this.handleErrors(error);n
    })
  }


public addInfo() {
  this.router.navigate(['/task/addinfo']);
}

public showTaskDetails(){
  this.router.navigate(['/task/list']);
}

/*public detailsemployee(id) {
    
  this.repo.getData(''+id)
    .subscribe(res => {
      this.router.navigate(['/task/details',id]);
      this.result = res ;
     
    },
    (error) => {
     
    //  this.handleErrors(error);n
    })
   

}*/


}
