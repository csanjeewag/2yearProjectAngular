
  import { Component, OnInit } from '@angular/core';
  import { RepositoryService} from './../../../ShareData/repository.service';
  import { Router } from '@angular/router';
  import { AuthServiceService } from "./../../../AuthGards/auth-service.service";
  
  @Component({
    selector: 'app-project-view',
    templateUrl: './project-view.component.html',
    styleUrls: ['./project-view.component.css']
  })
  export class ProjectViewComponent implements OnInit {
  
    constructor(private repository :RepositoryService,private router: Router, private auth:AuthServiceService) { }
  
    public project:any;
    public Loading:any;
  
    ngOnInit() {
      this.getAllProject();
    }
  
    public  getAllProject(){
      this.repository.getData('project/getprojects')
      .subscribe(res => {
        this.project = res ;
        
    },
      (error) => {
      
      })
    }
  
    public updateProject(id){
      this.router.navigate(['/profile/admin/updateproject/',id]);
    }
  
    public redirectToOwnerList(){
      this.router.navigate(['/profile/admin']);
      
     }

     public DeActive(id){
       this.Loading = id;
         this.repository.getData('project/deactiveproject/'+id)
      .subscribe(res => {
       this.getAllProject();
       this.Loading = false;
    },
      (error) => {
      this.Loading =false;
      })
     }

     public Active(id){
      this.Loading =id;
      this.repository.getData('project/activeproject/'+id)
   .subscribe(res => {
    this.getAllProject();
    this.Loading =false;
 },
   (error) => {
    this.Loading =false;
   })
  }
  }
  