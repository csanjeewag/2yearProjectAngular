import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService} from './../../ShareData/repository.service';
import { Router,ParamMap } from '@angular/router';
import { Event} from './../_interfaces/event';
import { splitAtColon } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view-event-page',
  templateUrl: './view-event-page.component.html',
  styleUrls: ['./view-event-page.component.css']
})




export class ViewEventPageComponent implements OnInit {
   
  constructor(private repository :RepositoryService,private route:Router,private rou:ActivatedRoute) { }

  public PrId:any;
  public event:any;
  
  ngOnInit() {
   this.getparamId();
  }
 
  public getproject(){
    this.repository.getData('event/getall/'+this.PrId)
       .subscribe(res => {
         this.event = res ;
         
         
         
       },
       (error) => {
       //  this.handleErrors(error);n
       })
      
    
   }
  
   getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.PrId=id;
      console.log("id of the evenet = "+id)
      this.getproject();
     });
  
  
  }

 

 
}
