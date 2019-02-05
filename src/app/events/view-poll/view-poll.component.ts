import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "./../../AuthGards/auth-service.service";
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
  
  import {  RepositoryService} from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute } from '@angular/router';
  

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {

  public pollId:any;
  public poll:any;
  public destinations:any;
  public voted:any;
  public urlAddress:any;
  public IsAdmin:any;
  public IsRC:any;
  
  public empId:any;
  public destId:any;
  public num:any;
  public dest:any;
  constructor( private auth : AuthServiceService ,private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }

  ngOnInit() {
    this.IsAdmin = this.auth.isAdmin();
    this.IsRC = this.auth.isRC();
    this.empId = this.auth.tokencheckId();
    
    this.getPoll();
  }


  public getPoll(){
   this.repository.getData('PollEvent/getPoll')
    .subscribe(res => {
     
      this.poll = res ;
      this.repository.getData('PollEvent/getDestination/'+this.poll.id)
    .subscribe(res => {
      this.destinations = res ;
     
    },
    (error) => {
    
    })
      
    },
    (error) => {
    
    })
   

    
 
  }
  public vote(id,destVote,dest){
    this.repository.getData('PollEvent/getEmp/'+this.poll.id+'/'+this.empId)
    .subscribe(res => {
      this.voted = res ; 
      this.addVote(id,destVote,dest);
    
    },
    (error) => {
    
    })
  }

  public addVote(id,destVote,dest){
    if(this.voted!=null){
      window.alert("You have already voted");
    }else{
      let today=new Date();
      if(new Date(today)<new Date(this.poll.closingDate)){
      this.num=destVote+1;
      let formdata = new FormData;
      formdata.append('Id',id);
      formdata.append('DestVote',this.num);
      formdata.append('Dest',dest);
      formdata.append('PollId',this.poll.id);



      let apiUrl = 'PollEvent/addVote';
          
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {         
          this.addEmployee();

          },
          (error => {
           
          })
        )
      }else{
        window.alert("Vote is closed");

      }
    }
  }

public addEmployee(){
  let formdata1 = new FormData;
  formdata1.append('PollId',this.poll.id);
  formdata1.append('EmployeeId',this.empId);
 
  let apiUrl = 'PollEvent/addEmployee';
          
      this.repository.postFile(apiUrl, formdata1)
        .subscribe(res =>  {  
          window.alert("Your vote has succesfully recorded");
          this.getPoll();
        },
          (error => {
           
          })
        )

}


  public removePoll(){
    let formdata = new FormData;
      formdata.append('Id',this.poll.id);
      formdata.append('IsActive','false');


let apiUrl = 'PollEvent/removePoll';
          
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {         
          this.urlAddress = "profile/home";
                 this.router.navigate([this.urlAddress]);
          },
          (error => {
           
          })
        )
  }
public addPoll(){
  this.router.navigate(['events/addPoll']);
}

}
