import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../_interfaces/employee.model';
//import { AuthServiceService } from "./../../../AuthGards/auth-service.service";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  public empId:1;
  public result : any;
  public result2:any;
  public ImageUrl:any;
  public ProfileImage:any= "assets/_image/cslogo.png";
  public stts:true;
  constructor(private route: ActivatedRoute,private repository :RepositoryService,private router: Router ) { }

  ngOnInit() {
    this.ImageUrl = this.repository.ImageUrl;
    //console.log(this.auth.tokencheckId)
    this.repository.getData('employee/getall/')
    .subscribe(res => {
      this.result = res ;
      
      if(this.result.empProfilePicture)
      { this.ProfileImage =this.ImageUrl+ this.result.empProfilePicture;}
    },
    (error) => {
    //  this.handleErrors(error);n
    
   });

   this.getTaskForEmployee(this.empId);
    
  }
public  getTaskForEmployee(empId){
    this.repository.getData('task/gettaskforemp/'+empId)
    .subscribe(res => {
      this.result2 = res ;
      //var myObjStr = JSON.stringify(res);
   
     //console.log(this.result.taskId);
     console.log();
      
    },
    (error) => {
    //  this.handleErrors(error);n
    })
  }

  onChange( isChecked: boolean) {
    if(isChecked) {
      let url = "task/create";
      let formData = new FormData();
      formData.append('status','true');
      this.repository.postData(url, formData)
      .subscribe(res => {
  
        //this.route.navigate(['/task']);
  
        console.log(res);
      }, (error => {
        console.log("error");
      })
      )
      //???????????????????????

      
      console.log()

    } else {
      // let index = this.emailFormArray.indexOf(empName);
      // this.emailFormArray.splice(index,1);
    }
}


  
  
  
  
  
  public updateprofile(id){
   
    this.router.navigate(['/profile/update/'+id]);
  }


  public changepassword(id){
    this.router.navigate(['/profile/changepassword']);
   
  }

}
