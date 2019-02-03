import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../ShareData/repository.service';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { AuthServiceService } from "../../AuthGards/auth-service.service";
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-uploadpastevent',
  templateUrl: './uploadpastevent.component.html',
  styleUrls: ['./uploadpastevent.component.css'],
  providers: [RepositoryService]
})
export class UploadpasteventComponent implements OnInit {
  public eventid:any;
  public result: any;

  constructor(private rout: ActivatedRoute, private repo: RepositoryService) { }

  ngOnInit() {
    this.gettaskbyid();
  this.eventid=this.rout.snapshot.paramMap.get('id')
  }

  public gettaskbyid() {
    let id = this.eventid;
    this.repo.getData('PastEvent/getimages/' + id)
      .subscribe(res => {
        this.result = res;
        console.log(this.result);
      },
        (error) => {
        
        })
  }


}
