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
  
 public eventtopic = [{'topic':'gfxgbx'},{'topic':'cgh'},{'topic':'jgjh'}]
 public eventt = [{'topic':'blood donation'},{'topic':'cricket match 2018'},{'topic':'blood donation 15'}]
 public event:any;

  ngOnInit() {
    this.getEvents();
  }

  public getEvents(){

    let url = "";
   this.repository.getData(url)
    .subscribe(res => {
      this.event =res;
      console.log(res);
    },(error) =>{

    })
  }

 public  gotoEvent(id){
 console.log(id);
    this.router.navigate(['pastevent/event/s/'+id]);
  }
}
