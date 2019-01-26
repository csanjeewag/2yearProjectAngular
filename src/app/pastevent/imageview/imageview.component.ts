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
  
  ImageUrl: any; 

  constructor(private router : Router, private repo: RepositoryService, private route: ActivatedRoute) { }
  public eventId:any;
  ngOnInit() {
    this.ImageUrl = this.repo.ImageUrl;

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.eventId=id;
    })
    this.getimage();

  }
 public getimage(){
   let id = this.eventId;
  this.repo.getData('PastEvent/getimages/'+id)
  .subscribe(res => {
    this.result = res ;
  
  },
  (error) => {
  //  this.handleErrors(error);n
  })


 }
 public gotoimageupload(id){
  this.router.navigate(['pastevent/imageupload/'+id]);  
  
 }
 public gotocomment(id){
  this.router.navigate(['pastevent/comment/'+id]);  
   
 }
 public deleteimage(id){
  let url = "pastevent/deleteimage";        
  let formData = new FormData();
  formData.append('Caption', id);

 this.repo.postFile(url,formData)
      .subscribe( img => {
        this.getimage();
        
      }, (error => {
     
      })
      )


 }



}
