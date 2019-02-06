import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { AuthServiceService } from "./../../../AuthGards/auth-service.service";


@Component({
  selector: 'app-email-alert',
  templateUrl: './email-alert.component.html',
  styleUrls: ['./email-alert.component.css']
})
export class EmailAlertComponent implements OnInit {

  constructor(private auth: AuthServiceService,private route :ActivatedRoute ,private router: Router, private repository: RepositoryService ) { }
  
  public details: any;
  public eventId: any;
  public IsAdmin:any;
  public IsRC:any;  

  ngOnInit() {
    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEmailDetails();
  }

  public getEmailDetails(){
    let apiAddress: string = "Cricketmatch/getemail/"+this.eventId;

    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.details = res;
   
    },(error =>{

    })
    )
  }

  public composeMail(){
    this.router.navigate(['events/cricketmatchs/emailform/'+this.eventId]);
  }

}
