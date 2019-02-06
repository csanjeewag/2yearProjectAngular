import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../ShareData/repository.service";
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';
import { AuthServiceService } from "../../AuthGards/auth-service.service";

@Component({
  selector: 'app-eventcard',
  templateUrl: './eventcard.component.html',
  styleUrls: ['./eventcard.component.css']
})
export class EventcardComponent implements OnInit {

  
  constructor(private router: Router ,private repository:RepositoryService, private auth:AuthServiceService) { }
  public IsAdmin:any;
  public IsRC:any;
  public event:any;
  public ImageUrl:any;
  ngOnInit() {
    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();
    this.ImageUrl = this.repository.ImageUrl;
    this.eventname();
  }


public eventname(){
  let url = "pastevent/getevents";
   this.repository.getData(url)
    .subscribe(res => {
      this.event =res;
    
    
    },(error) =>{

    })

}
public moredetail(id){

    this.router.navigate(['pastevent/event/s/'+id]);
}

public Upgradeevent(id){
   this.router.navigate(['events/updateevent/'+id]);
}
}

