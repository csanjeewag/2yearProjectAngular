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
import { ScheduleViewsComponent } from './schedule-views/schedule-views.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { AuthLoginGuard } from "./../../AuthGards/auth-login.guard";
import { AuthRoleGuard } from "./../../AuthGards/auth-role.guard";

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'teamform/:id', component: TeamFormComponent,canActivate:[AuthLoginGuard] },
      { path: 'teamview/:id', component: TeamViewComponent,canActivate:[AuthLoginGuard] },
      { path: 'emailform/:id', component: CaptainEmailComponent,canActivate:[AuthRoleGuard],data: {expectedRole2: 'RC'}  },
      { path: 'emailview/:id', component: EmailAlertComponent,canActivate:[AuthLoginGuard] },
      { path: 'scheduleform/:id', component: ScheduleComponent,canActivate:[AuthRoleGuard],data: {expectedRole2: 'RC'}  },
      { path: 'scheduleview/:id', component: ScheduleViewComponent,canActivate:[AuthLoginGuard] },
      { path: 'scheduleviews/:id', component: ScheduleViewsComponent,canActivate:[AuthLoginGuard] },
      { path: 'scheduleforms/:id', component: ScheduleFormComponent,canActivate:[AuthRoleGuard],data: {expectedRole2: 'RC'}  },      
    ])
  ],
  providers:[AuthLoginGuard,AuthRoleGuard],
  declarations: [TeamFormComponent,TeamViewComponent, CaptainEmailComponent, EmailAlertComponent, ScheduleComponent, ScheduleViewComponent, ScheduleViewsComponent, ScheduleFormComponent]
})
export class CricketmatchsModule { }
