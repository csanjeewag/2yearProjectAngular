//import { NgModule, Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AddtaskComponent } from './addtask/addtask.component';
import { RouterModule } from '@angular/router';

import { LogingHeaderComponent } from "./../SharePart/loging-header/loging-header.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';

//import { LoggedHeaderComponent} from "./../SharePart/logged-header/logged-header.component";
import { ViewTaskComponent } from './view-task/view-task.component';
import { AuthLoginGuard } from '../AuthGards/auth-login.guard';
import { AuthRoleGuard } from '../AuthGards/auth-role.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { MainTaskComponent } from './main-task/main-task.component';
import { ContactsComponent } from './contacts/contacts.component';
//import { LoginUserInterfaceComponent } from './login-user-interface/login-user-interface.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileDropModule } from 'ngx-file-drop';

import { SharedModuleModule} from "./../shared-module/shared-module.module";


@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatTabsModule,
    FileUploadModule,
    FileDropModule,
    FormsModule,
    ReactiveFormsModule,
     RouterModule.forChild([
       { path: 'addtask', component: AddtaskComponent },
       { path: 'list', component: ViewTaskComponent},
       {path:'',component:LandingPageComponent},
       {path:'mytask',component:MyTaskComponent},
       {path:'addinfo',component:AddInfoComponent},
       //{path:'details/:id', component: ShowTaskDetailsComponent},
       { path: 'update/:id', component: UpdateTaskComponent },
       {path:'newtask',component:MainTaskComponent},
       {path:'contact',component:ContactsComponent},



       //{ path: 'list/:id', component: EmployeeDetailsComponent ,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD'} },

  
   ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [MainTaskComponent,ContactsComponent,LogingHeaderComponent,AddtaskComponent, ViewTaskComponent, LandingPageComponent, MyTaskComponent, AddInfoComponent, UpdateTaskComponent]
})
export class TaskModule { }
