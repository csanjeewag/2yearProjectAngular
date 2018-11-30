import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "./../../../ShareData/repository.service";
import { Router,ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { consumeBinding } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css']
})
export class DetailsViewComponent implements OnInit {

private result: any;
private detailsId: any;

  constructor(private repository: RepositoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.detailsId=id;
    })
    this.getMatchDetails(this.detailsId);
    
  }

  private getMatchDetails(id){
    let apiAddress: string = "event/getdetailsform/"+id;
  
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.result = res;
      console.log(res);
    },(error=>{

    }))
  }

}
