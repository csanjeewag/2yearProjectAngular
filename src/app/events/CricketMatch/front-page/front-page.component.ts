import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../../ShareData/repository.service";
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,private repository: RepositoryService, private router: Router ) { }
  public result: any;
  public eventId:any;
  ngOnInit() {
    
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.eventId=id;
    })
    this.getAllCricketMatch(this.eventId);
  }

  public getAllCricketMatch(id){
    let apiAddress: string = "event/getfrontpage/"+id;

    this.repository.getData(apiAddress)
    .subscribe(res =>  {
      this.result = res;
      console.log(res);
     // this.cricketmatchfrontpage = res as CricketMatch[];
    },(error=>{

    }))
  }

}
