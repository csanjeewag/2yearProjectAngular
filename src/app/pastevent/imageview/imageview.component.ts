import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { AuthServiceService } from "../../AuthGards/auth-service.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.css']
})
export class ImageviewComponent implements OnInit {
  result: any;
  eevent: any;
  ImageUrl: any;
  greeting: any;
  public author: any;
  constructor(private router: Router, private repo: RepositoryService, private route: ActivatedRoute, private auth:AuthServiceService, config: NgbModalConfig, private modalService: NgbModal) { }
  public eventId: any;
  ngOnInit() {
    this.ImageUrl = this.repo.ImageUrl;
   
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.eventId = id;
      this.repo.commenteventId = this.eventId;
      
    })
    this.getimage();
    this.eventname();
    this.author = this.auth.tokencheckId();
    console.log(this.author);
  }
  public getimage() {
    let id = this.eventId;
    this.repo.getData('PastEvent/getimages/' + id)
      .subscribe(res => {
        this.result = res;
        console.log(this.result);

      },
        (error) => {
          //  this.handleErrors(error);n
        })


  }

  open(image) {
    this.modalService.open(image);
  }
  public gotoimageupload(id) {
    this.router.navigate(['pastevent/imageupload/' + id]);
   
  }
  public gotocomment(id) {
    this.router.navigate(['pastevent/comment/' + id]);

  }
  public deleteimage(id) {
    let url = "pastevent/deleteimage";
    let formData = new FormData();
    formData.append('Caption', id);

    this.repo.postFile(url, formData)
      .subscribe(img => {
        this.getimage();

      }, (error => {

      })
      )
  }

  public eventname() {
    let id= this.eventId
    console.log(id);
    let url = "pastevent/getevent/"+id;
    this.repo.getData(url)
      .subscribe(res => {
        this.eevent = res;
        console.log(this.eevent);
      }, (error) => {

      })
  }



}
