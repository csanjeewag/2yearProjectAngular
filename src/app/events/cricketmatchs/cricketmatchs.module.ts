import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from './../../shared-module/shared-module.module';

import { TeamFormComponent } from './team-form/team-form.component';
import { TeamViewComponent } from "./team-view/team-view.component";
import { CaptainEmailComponent } from './captain-email/captain-email.component';
import { EmailAlertComponent } from './email-alert/email-alert.component';


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
      { path: 'emaildisplay/:id', component: EmailAlertComponent },
      
    ])
  ],
  declarations: [TeamFormComponent,TeamViewComponent, CaptainEmailComponent, EmailAlertComponent]
})
export class CricketmatchsModule { }
