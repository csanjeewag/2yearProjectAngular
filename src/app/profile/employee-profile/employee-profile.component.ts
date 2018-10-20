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
  constructor(private auth:AuthServiceService,private route: ActivatedRoute,private repo :RepositoryService,private router: Router ) { }

  ngOnInit() {
    
    //console.log(this.auth.tokencheckId)
    this.repo.getData('getall/'+this.auth.tokencheckId())
    .subscribe(res => {
      this.result = res ;
      console.log(this.result)
    },
    (error) => {
    //  this.handleErrors(error);n
    
   });
    
  }

}
