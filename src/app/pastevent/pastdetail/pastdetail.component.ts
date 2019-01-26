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



  constructor( private router : Router  , private route: ActivatedRoute , private repository: RepositoryService) { }
  public event:any;
  public ImageUrl:any;
  public Id:any;
  public task:any;
  ngOnInit() {
    
    this.ImageUrl = this.repository.ImageUrl;
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = params.get('id');
      this.Id=id;
      this.getEvent(id);
      this.getTask();
    })
   
  
  }
 public getEvent(id){

  let url = "pastevent/getevent/"+id;
  this.repository.getData(url)
  .subscribe(res => {
    this.event =res;
    console.log(this.event)
  },(error) =>{

  })
 }
 public getTask(){

  let url = "task/getall/"+this.Id;
  this.repository.getData(url)
  .subscribe(res => {
    this.task =res;
    console.log(this.task)
  },(error) =>{

  })
 }

 public  gotoEventImages(id){
  console.log(id);
     this.router.navigate(['pastevent/imageview/'+id]);
     
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