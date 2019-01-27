import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../ShareData/repository.service";
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { AuthServiceService } from "../../AuthGards/auth-service.service";



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public comment: any;
  public eventid: any;
  public author: any;
  public ImageUrl:any;

  constructor(private router: Router, private repository: RepositoryService, private rout: ActivatedRoute, private auth: AuthServiceService) { }

  public commentForm: FormGroup;
  ngOnInit() {
    this.ImageUrl = this.repository.ImageUrl;
    this.eventid = this.rout.snapshot.paramMap.get('id');
    this.author = this.auth.tokencheckId();
    this.getcomment(this.eventid);

    this.commentForm = new FormGroup({
      // EventId: new FormControl('', [Validators.required]),
      CommentIn: new FormControl(''),


    })

  }
  onClick(){
    // this.router.navigate(['pastevent/comment'+this.eventid]);
    
   
  }

  public getcomment(id) {
    let url = "pastevent/getcomment/"+id;
    this.repository.getData(url)
      .subscribe(res => {
        this.comment = res;
       console.log(res)
      }, (error) => {

      })

  }

  OnSubmit(value) {
    console.log(value)
    let url = "pastevent/addcomment";
    let formData = new FormData();
    formData.append('EventId', this.eventid);
    formData.append('EmployeeId', this.author);
    formData.append('CommentIn', value.CommentIn);
    console.log(this.author, this.eventid);

    this.repository.postFile(url,formData)
      .subscribe(res => {
       
        console.log(res);
      }, (error => {
        console.log("error");
      })
      )
  }






}