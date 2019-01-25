import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from './../../shared-module/shared-module.module';

import { TeamFormComponent } from './team-form/team-form.component';
import { TeamViewComponent } from "./team-view/team-view.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'teamform/:id', component: TeamFormComponent },
      { path: 'teamview/:id', component: TeamViewComponent },
      
    ])
  ],
  declarations: [TeamFormComponent,TeamViewComponent]
})
export class CricketmatchsModule { }
