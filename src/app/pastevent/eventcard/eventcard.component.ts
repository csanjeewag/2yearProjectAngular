import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../ShareData/repository.service";
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';

@Component({
  selector: 'app-eventcard',
  templateUrl: './eventcard.component.html',
  styleUrls: ['./eventcard.component.css']
})
export class EventcardComponent implements OnInit {

  
  constructor(private router: Router ,private repository:RepositoryService) { }
  
  public event:any;
  ngOnInit() {
    this.eventname();
  }


public eventname(){
  let url = "pastevent/getevents";
   this.repository.getData(url)
    .subscribe(res => {
      this.event =res;
      console.log(res);
    },(error) =>{

    })

}
public moredetail(id){
  console.log(id);
    this.router.navigate(['pastevent/event/s/'+id]);
}


}

