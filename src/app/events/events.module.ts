import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEventPageForTripComponent } from './create-event-page-for-trip/create-event-page-for-trip.component';
import { ViewEventPageComponent } from './view-event-page/view-event-page.component';
import { OneDayTripComponent } from './one-day-trip/one-day-trip.component';
import { TwoDayTripComponent } from './two-day-trip/two-day-trip.component';
import { EventHomePageComponent } from './event-home-page/event-home-page.component';
import { YearEndPartyComponent } from './year-end-party/year-end-party.component';

import { AuthLoginGuard } from "./../AuthGards/auth-login.guard";
import { AuthRoleGuard } from "./../AuthGards/auth-role.guard";
import { SharedModuleModule } from "./../shared-module/shared-module.module";
import { TaskModule } from "./../task/task.module";
import { AddEventTypeComponent } from './add-event-type/add-event-type.component';
import { AddEventComponent } from './add-event/add-event.component';
import { SelectAttributeComponent } from './select-attribute/select-attribute.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { AddRegistrationFormComponent } from './add-registration-form/add-registration-form.component';
import { SelectAttributeRegistrationComponent } from './select-attribute-registration/select-attribute-registration.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { SelectAttributeForUpdateComponent } from './select-attribute-for-update/select-attribute-for-update.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { AddPollComponent } from './add-poll/add-poll.component';
import { ViewPollComponent } from './view-poll/view-poll.component';
@NgModule({
  imports: [
    SharedModuleModule,

    TaskModule,
    CommonModule,
    ReactiveFormsModule,
  
    RouterModule.forChild([
     
      {path:'vieweventpage/:id', component:ViewEventPageComponent,canActivate:[AuthLoginGuard]},
    
      {path:'addeventtype', component:AddEventTypeComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'} },
      {path:'addevent', component:AddEventComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'addevent/:id', component:AddEventComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'updateevent/:id', component:UpdateEventComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'viewEmployee/:id', component:ViewEmployeeComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'addPoll', component:AddPollComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'viewPoll', component:ViewPollComponent,canActivate:[AuthLoginGuard]},


      {path:'selectattributes/:id', component:SelectAttributeComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'selectattributesforupdate/:id', component:SelectAttributeForUpdateComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'selectattributesforregistration/:id', component:SelectAttributeRegistrationComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'employeeregistration/:id', component:EmployeeRegistrationComponent,canActivate:[AuthLoginGuard]},
      {path:'addregistrationform/:id', component:AddRegistrationFormComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'addregistrationform', component:AddRegistrationFormComponent,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'}},
      {path:'eventHomePage', component:EventHomePageComponent},
      //{ path: 'CricketMatch', loadChildren: "./CricketMatch/CricketMatch.module#CricketMatchModule" },  
      { path: 'cricketmatchs', loadChildren: "./cricketmatchs/cricketmatchs.module#CricketmatchsModule" },        
    ]),
  ],
  providers:[AuthLoginGuard,AuthRoleGuard],
  declarations: [CreateEventPageForTripComponent, ViewEventPageComponent, OneDayTripComponent, TwoDayTripComponent,EventHomePageComponent,YearEndPartyComponent, AddEventTypeComponent, AddEventComponent, SelectAttributeComponent, UpdateEventComponent, AddRegistrationFormComponent, SelectAttributeRegistrationComponent, EmployeeRegistrationComponent, SelectAttributeForUpdateComponent, ViewEmployeeComponent, DeleteEmployeeComponent, AddPollComponent, ViewPollComponent]
})
export class EventsModule { }