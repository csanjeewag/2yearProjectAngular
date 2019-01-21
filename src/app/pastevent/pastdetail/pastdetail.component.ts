import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RepositoryService} from '../../ShareData/repository.service';
import { eventNames } from 'cluster';



@Component({
  selector: 'app-pastdetail',
  templateUrl: './pastdetail.component.html',
  styleUrls: ['./pastdetail.component.css']
})
export class PastdetailComponent implements OnInit {
 public x:any;
 public y:any;
 

  constructor( private router : Router  , private route: ActivatedRoute , private repository: RepositoryService) { }
  public event:any;
  public Id:any;
  ngOnInit() {
    

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = params.get('id');
      this.Id=id;
      this.getEvent(id);
    })
   
  
  }
 public getEvent(id){

  let url = "pastevent/getevent/"+id;
  this.repository.getData(url)
  .subscribe(res => {
    this.event =res;
    console.log(res);
  },(error) =>{

  })
 }

  }

  //////////////
  // public getEvents(){

  //   let url = "pastevent/getevents";
  //  this.repository.getData(url)
  //   .subscribe(res => {
  //     this.event =res;
  //     console.log(res);
  //   },(error) =>{

  //   })
  // }