import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewcontacts',
  templateUrl: './viewcontacts.component.html',
  styleUrls: ['./viewcontacts.component.css']
})
export class ViewcontactsComponent implements OnInit {

  constructor(private router: Router, private repository: RepositoryService, private rou: ActivatedRoute) { }
  public cid: any;
  public result: any;
  public Loading: any;
  public detailid: any;
  public detail: any;
  ngOnInit() {
    this.getparamId();
    this.viewAll();
  }

  public viewAll() {
    this.repository.getData('contact/getallfortype/' + this.cid)
      .subscribe(res => {

        this.result = res as any;


      })


  }

  getparamId() {
    this.rou.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.cid = id;

      if (this.cid != null) {

      }
    })
  }

  public deleteDetail(id) {
    this.Loading = id;
    this.repository.getData('contact/deactivedetail/' + id)
      .subscribe(res => {
        this.viewAll();

        this.Loading = false;
        this.repository.SuccessAlert('Deleted!');
      },
        (error) => {
          this.Loading = false;
        })

  }

  public updateDetail(id) {
    this.router.navigate(['/task/updatecontactdetail/' + id]);

  }

  public GetDetailbyId(id) {
    this.repository.getData('contact/getdetailbyid/' + this.detailid)
      .subscribe(res => {

        this.detail = res as any;


      })
  }


}