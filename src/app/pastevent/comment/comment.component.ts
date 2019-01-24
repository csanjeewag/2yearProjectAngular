import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../ShareData/repository.service";
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public comment:any;
  constructor(private router: Router ,private repository:RepositoryService) { }

  ngOnInit() {

   this.getcomment();
  }

  public getcomment(){
    let url = "pastevent/getcomment";
     this.repository.getData(url)
      .subscribe(res => {
        this.comment =res;
        console.log();
      },(error) =>{
  
      })
  
  }

}
