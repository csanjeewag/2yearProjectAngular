import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../_interfaces/employee.model';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  public empId;
  public result : any;
  public ImageUrl:any;
  public ProfileImage:any= "assets/_image/cslogo.png";
  constructor(private auth:AuthServiceService,private route: ActivatedRoute,private repo :RepositoryService,private router: Router ) { }

  ngOnInit() {
    this.ImageUrl = "http://localhost:5308/";
    //console.log(this.auth.tokencheckId)
    this.repo.getData('getall/'+this.auth.tokencheckId())
    .subscribe(res => {
      this.result = res ;
      
      if(this.result.empProfilePicture)
      { this.ProfileImage =this.ImageUrl+ this.result.empProfilePicture;}
    },
    (error) => {
    //  this.handleErrors(error);n
    
   });
    
  }

}
