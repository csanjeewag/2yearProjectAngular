import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
  import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap } from '@angular/router';
@Component({
  selector: 'app-select-attribute',
  templateUrl: './select-attribute.component.html',
  styleUrls: ['./select-attribute.component.css']
})
export class SelectAttributeComponent implements OnInit {

  constructor(private router: Router,  private repository : RepositoryService,private rou:ActivatedRoute) { }
  public EventForm: FormGroup;
  public Message:any;
  public EventId:any;
  public urlAddress:any;
  ngOnInit() {
    this.getparamId();
    this.EventForm = new FormGroup({
    
      EndDate: new FormControl(''),
      ClosingDate: new FormControl(''),
      Destination: new FormControl(''),
      Liquor: new FormControl(''),
      IsFamilyMembersAllowed: new FormControl(''),
      Venue: new FormControl(''),
      NumberOfTeams: new FormControl(''),
      })
  }


  public createrole(value) {
    
     
    
    let formdata = new FormData;
    formdata.append('EventId',this.EventId);
    formdata.append('EndDate',value.EndDate);
    formdata.append('ClosingDate',value.ClosingDate);
    formdata.append('Destination',value.Destination);
    formdata.append('Liquor',value.Liquor);
    formdata.append('IsFamilyMembersAllowed',value.IsFamilyMembersAllowed);
    formdata.append('Venue',value.Venue);
    formdata.append('NumberOfTeams',value.NumberOfTeams);
    formdata.append('EventId',this.EventId);
    

   
      let apiUrl = 'event/selectAttributes';
      
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {
          this.Message="Event Created!";
          this.urlAddress = "events/addevent/"+this.EventId;
          this.router.navigate([this.urlAddress]);
           //   this.router.navigate(['/profile/admin/roles']);
           
       
          },
          (error => {
            this.Message="Event Created Failed,Try Again!";
          })
        )
    
    
  }

  getparamId(){
    this.rou.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.EventId=id;
     });

  }
 


}
