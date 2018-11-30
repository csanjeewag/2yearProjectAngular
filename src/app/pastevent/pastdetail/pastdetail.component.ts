import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RepositoryService} from '../../ShareData/repository.service';



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

  // this.repository.gettest(id)
  // .subscribe(res => {
  //   this.event =res;
  // },(error) =>{

  // })
 }
  // public showblooddonation(){
  //  this.x = true;
  //  this.y=false;
  // }
  // public showcricketmatch(){
  //   this.x = false;
  //   this.y= true;
  //  }


  }

