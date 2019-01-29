import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../../ShareData/repository.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})

export class TeamFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private repository: RepositoryService, private modalService: NgbModal) { }

  public teamForm: FormGroup;
  public result: any;
  public captainId: any;
  public employees: Array<string> = [];
  public todaydate: Date;
  emailFormArray: Array<any> = [];
  public name: any;
  public Message: any;
  public eventId: any;

  ngOnInit() {

    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getAllEmployee();
    this.teamForm = new FormGroup({
      teamName: new FormControl('', [Validators.required]),
      teamCaptainName: new FormControl(''),
      teamMember: new FormControl(''),
      teamVegeCount: new FormControl('', [Validators.required]),
      teamLiquor: new FormControl('', [Validators.required]),
      discription: new FormControl(''),

    })
  }

  public validateControl(controlName: string) {
    if (this.teamForm.controls[controlName].invalid && this.teamForm.controls[controlName].touched)
      return true;

    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.teamForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public teamData(value) {
    console.log(value)
    let formData = new FormData();
    formData.append('EventId', this.eventId);
    formData.append('TeamName', value.teamName);
    formData.append('VegeCount', value.teamVegeCount);
    formData.append('LiquorCount', value.teamLiquor);
    formData.append('Description', value.discription);
    formData.append('TeamCaptainId', this.captainId);
    formData.append('TeamMembers', this.employees[0]);
    formData.append('TeamMembers', this.employees[1]);
    formData.append('TeamMembers', this.employees[2]);
    formData.append('TeamMembers', this.employees[3]);
    formData.append('TeamMembers', this.employees[4]);
    formData.append('TeamMembers', this.employees[5]);
    formData.append('TeamMembers', this.employees[6]);
    formData.append('TeamMembers', this.employees[7]);
    formData.append('TeamMembers', this.employees[8]);
    formData.append('TeamMembers', this.employees[9]);
    formData.append('TeamMembers', this.employees[10]);
    formData.append('TeamMembers', this.employees[11]);
    formData.append('TeamMembers', this.employees[12]);
    formData.append('TeamMembers', this.employees[13]);
    formData.append('TeamMembers', this.employees[14]);
    let apiUrl = 'Cricketmatch/addteam';

    this.repository.postFile(apiUrl, formData)
      .subscribe(res => {
        this.Message = res;
        this.router.navigate(['events/cricketmatchs/teamview/'+this.eventId]);
      },
        (error => {

          this.Message = "try again, something wrong";

        })
      )
  }

  public getAllEmployee() {
    this.repository.getData('employee')
      .subscribe(res => {
        this.result = res;
      },
        (error) => {
        })
  }

  open(content) {
    this.modalService.open(content);
  }
  onChange(id: string, empName: string, isChecked: boolean) {
    if (isChecked) {
      this.Message = '';
      if (this.captainId == id) {
        this.Message = 'you can not selete captain again';
      }
      else {
        if (this.employees.indexOf(id) < 0) {
          this.employees.push(id);
          this.emailFormArray.push(empName);

        }
      }


    } else {
      let index = this.emailFormArray.indexOf(empName);
      this.emailFormArray.splice(index, 1);
    }
  }
  onChange2(id: string, empName: string, isChecked: boolean) {
    if (isChecked) {
      this.captainId = id;
      //this.employees.push(id);
      this.name = empName;
    } else {
      // let index = this.emailFormArray.indexOf(empName);
      // this.emailFormArray.splice(index,1);
    }
  }


}
