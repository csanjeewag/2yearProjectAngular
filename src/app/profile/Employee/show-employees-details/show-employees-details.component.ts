import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";
import {Employee} from './../../_interfaces/employee.model';
import { Observable } from 'rxjs';
import { FilterPipePipe } from "./../../filter-pipe.pipe";

@Component({
  selector: 'app-show-employees-details',
  templateUrl: './show-employees-details.component.html',
  styleUrls: ['./show-employees-details.component.css']
})
export class ShowEmployeesDetailsComponent implements OnInit {

  public result : any;
  public isAdmin:any;
  public toggle:any;
  public ImageUrl:any;
  public ProfileImage:any= "assets/_image/cslogo.png";
  constructor(private repo :RepositoryService,private router: Router, private auth:AuthServiceService) { }

  ngOnInit() {
    this.ImageUrl = this.repo.ImageUrl;
    this.getAllEmployee()
    this.isAdmin = this.auth.isAdmin();
   }

  public detailsemployee( id) {
    
        this.router.navigate(['/profile/list',id]);
     
  }

 

  
 public  getAllEmployee(){
    this.repo.getData('employee/getall')
    .subscribe(res => {
      this.result = res ;
      var myObjStr = JSON.stringify(res);
   
   
 
      
    },
    (error) => {
    //  this.handleErrors(error);n
    })
  }

  public deleteEmployee(id){

    this.router.navigate(['/profile/delete',id]);

  }

  public deActiveEmployee(id){

    if(confirm("Are you sure?")){
    this.repo.getData('employee/deleteEmployee/'+id)
    .subscribe(res => {
      location.reload();
    },
    (error) => {
    
    })
  }
  else{

  }
  }

  public updateEmployee(id){
    this.router.navigate(['/profile/update',id]);
  }
  public filterInput(){
    this.toggle = !this.toggle;
  }

}
