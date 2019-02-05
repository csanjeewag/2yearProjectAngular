import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../ShareData/repository.service";
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  constructor(private router: Router ,private repository:RepositoryService) { }
  

 public event:any;
 public ClickId:any;

  ngOnInit() {
    this.getEvents();
  }

  public getEvents(){

    let url = "pastevent/getevents";
   this.repository.getData(url)
    .subscribe(res => {
      this.event =res;
   
    },(error) =>{

    })
  }

 public  gotoEvent(id){
  this.ClickId=id;
    this.router.navigate(['pastevent/event/s/'+id]);
  
  }
  public  gotoEventImages(id){

       this.router.navigate(['pastevent/imageview/'+id]);
       
     }
}
