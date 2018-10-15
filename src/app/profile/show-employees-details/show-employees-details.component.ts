import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";
import {Employee} from './../_interfaces/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-employees-details',
  templateUrl: './show-employees-details.component.html',
  styleUrls: ['./show-employees-details.component.css']
})
export class ShowEmployeesDetailsComponent implements OnInit {

  public result : any;
  public isAdmin:any;
 
  constructor(private repo :RepositoryService,private router: Router, private auth:AuthServiceService) { }

  ngOnInit() {
    this.getAllEmployee()
    this.isAdmin = this.auth.isAdmin();
   }

  public detailsemployee( id) {
    
        this.router.navigate(['/profile/list',id]);
     
  }

 

  
 public  getAllEmployee(){
    this.repo.getData('getall')
    .subscribe(res => {
      this.result = res ;
      var myObjStr = JSON.stringify(res);
   
     console.log(this.result.empId);
    // console.log(this.result);
      
    },
    (error) => {
    //  this.handleErrors(error);n
    })
  }

  public deleteEmployee(id){

    this.router.navigate(['/profile/delete',id]);

  }

  public updateEmployee(id){
    this.router.navigate(['/profile/update',id]);
  }

}
