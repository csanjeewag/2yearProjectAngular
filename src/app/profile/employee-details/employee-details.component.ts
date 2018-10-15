import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../_interfaces/employee.model';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public empId;
  public result : Observable<Employee>;
  constructor(private route: ActivatedRoute,private repo :RepositoryService,private router: Router ) { }

  ngOnInit() {
  //  let id = parseInt(this.route.snapshot.paramMap.get('id'));
   // this.empId = id;

   this.route.paramMap.subscribe((params:ParamMap)=>{
    let id = parseInt(params.get('id'));
    this.empId=id;
    
    this.repo.getData('getall/'+id)
    .subscribe(res => {
      this.result = res as Observable<Employee>;
    },
    (error) => {
    //  this.handleErrors(error);n
    })
   });
    


  }

  goPrevious(){
    if(this.empId==1){
      this.router.navigate(['/profile/list','1'])
    }
    else{
      let goPreviousId = this.empId -1;
     // this.router.navigate(['/profile/list',goPreviousId])
      this.router.navigate(['../',goPreviousId],{relativeTo:this.route});
 
    }
   }

  goNext(){
    let gonextId = this.empId + 1;
    ///this.router.navigate(['/profile/list',gonextId])
    this.router.navigate(['../',gonextId],{relativeTo:this.route});
  }

  goBack(){
    let selectId = this.empId ? this.empId : null;
   // this.router.navigate(['/profile/list',{id:selectId}]);
   this.router.navigate(['../',{id:selectId}],{relativeTo:this.route});
 
  
  }
}
