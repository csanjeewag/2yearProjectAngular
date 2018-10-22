import { Component,OnInit } from '@angular/core';

import { AuthServiceService } from "./AuthGards/auth-service.service";
import { RepositoryService } from "./ShareData/repository.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthServiceService, private repo :RepositoryService,private router : Router){}
  title = 'app';
  logged:any;
  

  showFiller = false;

  ngOnInit(){
    this.auth.istokenExpired();
  
    
  }

}
