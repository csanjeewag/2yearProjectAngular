import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public department:any= true;
  public role:any;
  public project:any;
  constructor() { }

  ngOnInit() {
  }

  public isdepartment(){
    this.department = true;
    this.role = false;
    this.project = false;
  }
  public isrole(){
    this.role = true;
    this.department = false;
    this.project = false;
  }
  public isproject(){
    this.project = true;
    this.department = false;
    this.role = false;
  }
}
