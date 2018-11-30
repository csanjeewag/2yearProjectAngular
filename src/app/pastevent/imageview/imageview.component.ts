import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';
@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.css']
})
export class ImageviewComponent implements OnInit {
  result : any;
  ImageUrl: string = "https://789456.azurewebsites.net/";

  constructor(private repo: RepositoryService, private route: ActivatedRoute) { }
  public eventId:any;
  ngOnInit() {

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.eventId=id;
    })
    this.getimage(this.eventId);
    

    

    
    // this.repo.getimage('').subscribe(
    //   res=>{
    //     this.result=res;
    //   },
    // (error)=>{

    // }
    // )
  }
 public getimage(id){
   
  this.repo.getData('PastEvent/getimages/'+id)
  .subscribe(res => {
    this.result = res ;
    console.log(this.result)
    
  },
  (error) => {
  //  this.handleErrors(error);n
  })


 }



}
