import { Component, OnInit } from '@angular/core';
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
  
  public empId:any;
  public destId:any;
  public num:any;
  public dest:any;
  constructor(private route: ActivatedRoute,private router: Router,  private repository : RepositoryService) { }

  ngOnInit() {
    this.empId=6;
    this.destId=22;
    this.num=1;
    this.dest='s';
    this.getparamId();
  }

  getparamId(){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id =params.get('id');
      this.pollId=id;
      this.getPoll();
      console.log("id of the evenet = "+id)
     });
  
  
  }

  public getPoll(){
    console.log("inside get project");
     this.repository.getData('Poll/getPoll/'+this.pollId)
    .subscribe(res => {
      this.poll = res ;
      console.log("event = "+this.poll);
      
    },
    (error) => {
    
    })
   

    this.repository.getData('Poll/getDestination/'+this.pollId)
    .subscribe(res => {
      this.destinations = res ;
      console.log("event = "+this.destinations);
      
    },
    (error) => {
    
    })
 
  }
  public vote(){
    this.repository.getData('Poll/getEmp/'+this.pollId+'/'+this.empId)
    .subscribe(res => {
      this.voted = res ; 
      console.log("voted = "+this.voted);     
    },
    (error) => {
    
    })
    this.addVote();
  }

  public addVote(){
    if(this.voted!=null){
      window.alert("You have already voted");
    }else{
      let formdata = new FormData;
      formdata.append('Id',this.destId);
      formdata.append('DestVote',this.num);
      formdata.append('Dest',this.dest);
      formdata.append('PollId',this.pollId);



      let apiUrl = 'Poll/addVote';
          
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {         
       
          },
          (error => {
           
          })
        )
    }
  }

  public removePoll(){
    let formdata = new FormData;
      formdata.append('Id',this.pollId);
      formdata.append('IsActive','true');



      let apiUrl = 'Poll/removePoll';
          
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {         
       
          },
          (error => {
           
          })
        )
  }
}
