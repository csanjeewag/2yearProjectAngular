import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public department:any= true;
  public role:any;
  constructor() { }

  ngOnInit() {
  }

  public isdepartment(){
    this.department = true;
    this.role = false;
  }
  public isrole(){
    this.role = true;
    this.department = false;
  }
}
