import { Component, OnInit } from '@angular/core';
import { RepositoryService} from './../../../ShareData/repository.service';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";

@Component({
  selector: 'app-show-roles-details',
  templateUrl: './show-roles-details.component.html',
  styleUrls: ['./show-roles-details.component.css']
})
export class ShowRolesDetailsComponent implements OnInit {

  constructor(private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }

  public roles:any;
  public Loading:any;
  ngOnInit() {
    this.getAllRoles()
  }

  public  getAllRoles(){
    this.repository.getData('position/getallroles')
    .subscribe(res => {
      this.roles = res ;
  },
    (error) => {
    
    })
  }

  public updateRoles(id){
    this.router.navigate(['/profile/admin/updaterole',id]);
  }

  public redirectToOwnerList(){
   this.router.navigate(['/profile/admin']);
   
  }

  public DeActive(id){
    this.Loading = id;
      this.repository.getData('position/deactive/'+id)
   .subscribe(res => {
    this.getAllRoles();
    this.Loading = false;
 },
   (error) => {
   this.Loading =false;
   })
  }

  public Active(id){
   this.Loading =id;
   this.repository.getData('position/active/'+id)
.subscribe(res => {
 this.getAllRoles();
 this.Loading =false;
},
(error) => {
 this.Loading =false;
})
}
}