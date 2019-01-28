import { Component, OnInit } from '@angular/core';
import { Router,ParamMap } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-task-info',
  templateUrl: './view-task-info.component.html',
  styleUrls: ['./view-task-info.component.css']
})
export class ViewTaskInfoComponent implements OnInit {

  constructor(private router:Router,private repository:RepositoryService,private rou:ActivatedRoute) { }

  public taskid:any;
  public result:any;
  public Loadinginfo:any;
  public Loadingdetail:any;
  public contactresult:any;
  ngOnInit() {
    this.getparamId();
    this.viewallinformation();
this.viewallcontacts();
  }

public viewallinformation(){
  this.repository.getData('taskinfo/'+this.taskid)
    .subscribe(res => {
     
      this.result = res as any;
      console.log(this.result);
   
  
    })
}

public viewallcontacts(){
  this.repository.getData('contact/'+this.taskid)
  .subscribe(res => {
   
    this.contactresult = res as any;
    console.log(this.contactresult);
 

  })
}

public deleteInfoDetails(id){
  this.Loadinginfo = id;
  this.repository.getData('taskinfo/deletetaskinfo/'+id)
  .subscribe(res => {
   this.viewallinformation();
    alert('detail deleted');
  this.Loadinginfo = false;
console.log('deleted');
  
},
 (error) => {
 this.Loadinginfo =false;
 })
}


public deleteContactDetail(id){
  this.Loadingdetail = id;
  this.repository.getData('contact/deactivedetail/'+id)
  .subscribe(res => {
    this.viewallcontacts();
    this.Loadingdetail = false;
console.log('deleted');
  
},
 (error) => {
 this.Loadingdetail =false;
 })
}

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.taskid=id;
      console.log("id of the info type = "+id)
      if(this.taskid!=null){
        
      }})
}

}
