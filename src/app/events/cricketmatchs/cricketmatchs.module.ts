import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from './../../shared-module/shared-module.module';

import { TeamFormComponent } from './team-form/team-form.component';
import { TeamViewComponent } from "./team-view/team-view.component";
import { CaptainEmailComponent } from './captain-email/captain-email.component';
import { EmailAlertComponent } from './email-alert/email-alert.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'teamform/:id', component: TeamFormComponent },
      { path: 'teamview/:id', component: TeamViewComponent },
      { path: 'emailform/:id', component: CaptainEmailComponent },
      { path: 'emailview/:id', component: EmailAlertComponent },
      { path: 'scheduleform/:id', component: ScheduleComponent },
      { path: 'scheduleview/:id', component: ScheduleViewComponent },
      
    ])
  ],
  declarations: [TeamFormComponent,TeamViewComponent, CaptainEmailComponent, EmailAlertComponent, ScheduleComponent, ScheduleViewComponent]
})
export class CricketmatchsModule { }
