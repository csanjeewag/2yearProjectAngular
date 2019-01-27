import { Component, OnInit } from '@angular/core';
import { Router,ParamMap } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewcontacts',
  templateUrl: './viewcontacts.component.html',
  styleUrls: ['./viewcontacts.component.css']
})
export class ViewcontactsComponent implements OnInit {

  constructor(private router:Router,private repository:RepositoryService,private rou:ActivatedRoute) { }
public cid:any;
public result:any;
public Loading:any;
  ngOnInit() {
    this.getparamId();
    this.viewAll();
  }

  public viewAll(){
    this.repository.getData('contact/getallfortype/'+this.cid)
    .subscribe(res => {
     
      this.result = res as any;
      console.log(this.result);
   
  
    })
    
  
  }

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.cid=id;
      console.log("id of the contact type = "+id)
      console.log("get the  param id"+id)
      if(this.cid!=null){
        
      }})
}

public deleteDetail(id){
  this.Loading = id;
  this.repository.getData('contact/deactivedetail/'+id)
  .subscribe(res => {
   this.viewAll();

  this.Loading = false;
console.log('deleted');
  
},
 (error) => {
 this.Loading =false;
 })

}
}