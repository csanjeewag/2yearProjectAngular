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
    this.empId=7;
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
      this.repository.getData('Poll/getDestination/'+this.pollId)
    .subscribe(res => {
      this.destinations = res ;
      console.log("event = "+this.destinations);
      
    },
    (error) => {
    
    })
      
    },
    (error) => {
    
    })
   

    
 
  }
  public vote(id,destVote,dest){
    this.repository.getData('Poll/getEmp/'+this.pollId+'/'+this.empId)
    .subscribe(res => {
      this.voted = res ; 
      console.log("voted = "+this.voted); 
      this.addVote(id,destVote,dest);
    
    },
    (error) => {
    
    })
  }

  public addVote(id,destVote,dest){
    if(this.voted!=null){
      window.alert("You have already voted");
    }else{
      this.num=destVote+1;
      let formdata = new FormData;
      formdata.append('Id',id);
      formdata.append('DestVote',this.num);
      formdata.append('Dest',dest);
      formdata.append('PollId',this.pollId);



      let apiUrl = 'Poll/addVote';
          
      this.repository.postFile(apiUrl, formdata)
        .subscribe(res =>  {         
          this.addEmployee();

          },
          (error => {
           
          })
        )

    }
  }

public addEmployee(){
  let formdata1 = new FormData;
  formdata1.append('PollId',this.pollId);
  console.log("poll id = "+this.pollId);

  formdata1.append('EmployeeId',this.empId);
  console.log("emp id"+this.empId);


  let apiUrl = 'Poll/addEmployee';
          
      this.repository.postFile(apiUrl, formdata1)
        .subscribe(res =>  {  
          window.alert("Your vote has succesfully recorded");
       
       console.log("succes");
          },
          (error => {
           
          })
        )

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
