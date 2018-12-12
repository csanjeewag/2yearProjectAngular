import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavbarComponent } from "./../../SharePart/sidenavbar/sidenavbar.component";
import { FrontPageComponent } from './front-page/front-page.component';
import { RcFrontPageComponent } from './rc-front-page/rc-front-page.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamRcViewComponent } from './team-rc-view/team-rc-view.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeViewPageComponent } from './employee-view-page/employee-view-page.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { TeamUpdateFormComponent } from './team-update-form/team-update-form.component';
import { EmployeeUpdateFormComponent } from './employee-update-form/employee-update-form.component';

import { SharedModuleModule } from "./../../shared-module/shared-module.module";
 
@NgModule({
  imports: [
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'frontpage/:id', component: FrontPageComponent },
      { path: 'rcfrontpage', component: RcFrontPageComponent },
      { path: 'teamform', component: TeamFormComponent },
      { path: 'teamview', component: TeamRcViewComponent },
      { path: 'employeeform', component: EmployeePageComponent },
      { path: 'employeeview', component: EmployeeViewPageComponent },
      { path: 'detailsform', component: DetailsFormComponent },
      { path: 'detailsview', component: DetailsViewComponent },
      { path: 'teamformupdate/:id', component: TeamUpdateFormComponent },

    ])
  ],
  declarations: [SidenavbarComponent,FrontPageComponent, RcFrontPageComponent, TeamFormComponent, TeamRcViewComponent, EmployeePageComponent, EmployeeViewPageComponent, DetailsFormComponent, DetailsViewComponent, TeamUpdateFormComponent, EmployeeUpdateFormComponent, ]
})
export class CricketMatchModule { }