import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";

@Component({
  selector: 'app-show-departments-details',
  templateUrl: './show-departments-details.component.html',
  styleUrls: ['./show-departments-details.component.css']
})
export class ShowDepartmentsDetailsComponent implements OnInit {

  constructor(private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }

  public departments:any;

  ngOnInit() {
    this.getAllDepartment()
  }

  public  getAllDepartment(){
    this.repository.getData('getdepartments')
    .subscribe(res => {
      this.departments = res ;
      console.log(res);
  },
    (error) => {
    
    })
  }

  public updateDepartment(id){
    this.router.navigate(['/profile/admin/updatedepartment/',id]);
  }

  public redirectToOwnerList(){
    this.router.navigate(['/profile/admin']);
    
   }
}

