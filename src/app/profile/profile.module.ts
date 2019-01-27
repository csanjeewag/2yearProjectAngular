import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, filter } from 'rxjs/operators';
import { FileSelectDirective } from 'ng2-file-upload';

import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModuleModule} from "./../shared-module/shared-module.module";
import { TaskModule } from "./../task/task.module";

import { LoggedHeaderComponent} from "./../SharePart/logged-header/logged-header.component";
import { LoginUserInterfaceComponent } from './login-user-interface/login-user-interface.component';
//employee
import { ShowEmployeesDetailsComponent } from './employee/show-employees-details/show-employees-details.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';

//departments
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { UpdateDepartmentComponent } from './department/update-department/update-department.component';
import { ShowDepartmentsDetailsComponent } from './department/show-departments-details/show-departments-details.component';

//projects
import { ProjectCreateComponent } from './Project/project-create/project-create.component';
import { ProjectUpdateComponent } from './Project/project-update/project-update.component';
import { ProjectViewComponent } from './Project/project-view/project-view.component';


//position
import { RoleCreateComponent } from './position/role-create/role-create.component';
import { UpdateRolesComponent } from './position/update-roles/update-roles.component';
import { ShowRolesDetailsComponent } from './position/show-roles-details/show-roles-details.component';

//Auth
import { AuthRoleGuard } from "./../AuthGards/auth-role.guard";
import { AuthLoginGuard } from "./../AuthGards/auth-login.guard";

//login
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { SignupEmployeeComponent } from './signup-employee/signup-employee.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeRegisterByLinkComponent } from './employee-register-by-link/employee-register-by-link.component';
import { ForgetEmployeePasswordComponent } from './forget-employee-password/forget-employee-password.component';

//admin
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { FilterPipePipe2 } from './filter-pipe.pipe';
import { FilterPipePipe3 } from './filter-pipe.pipe';

import { HomepageComponent } from './homepage/homepage.component';
import { ChangePositionComponent } from './Employee/change-position/change-position.component';
import { EmployeePasswordChangeComponent } from './Employee/employee-password-change/employee-password-change.component';

@NgModule({
  imports: [

    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatTabsModule,
    
    SharedModuleModule,
    TaskModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'home', component: HomepageComponent},
      { path: 'lists', component: ShowEmployeesDetailsComponent,canActivate:[AuthLoginGuard]},
      
      { path: 'login', component: LoginUserInterfaceComponent },
      { path: 'lists/:id', component: EmployeeDetailsComponent ,canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD',expectedRole2: 'RC'} },
      { path: 'delete/:id', component: DeleteEmployeeComponent },
      { path: 'update/:id', component: UpdateEmployeeComponent },      
      { path: 'profile', component: EmployeeProfileComponent  },
      { path: 'register', component: EmployeeRegisterByLinkComponent  },
      { path: 'forgetpassword', component: ForgetEmployeePasswordComponent  },
      { path: 'changepassword', component: EmployeePasswordChangeComponent  },
      { path: 'update', component: ChangePositionComponent },
      { path: 'admin', component: AdminPageComponent, canActivate:[AuthRoleGuard],data: { expectedRole1: 'AD'},children:[
       
        { path: 'roles', component: ShowRolesDetailsComponent },
        { path: 'project', component: ProjectViewComponent },
        { path: 'departments', component: ShowDepartmentsDetailsComponent},
        { path: 'updateproject/:id', component: ProjectUpdateComponent },
        { path: 'updatedepartment/:id', component: UpdateDepartmentComponent },
        { path: 'updaterole/:id', component: UpdateRolesComponent },
        
      ]},
      
    ])
  ],
  declarations: [FileSelectDirective,LoggedHeaderComponent,LoginUserInterfaceComponent, ShowEmployeesDetailsComponent, EmployeeDetailsComponent,  DeleteEmployeeComponent, LoginEmployeeComponent, SignupEmployeeComponent, DepartmentCreateComponent, RoleCreateComponent, UpdateEmployeeComponent, UpdateDepartmentComponent, UpdateRolesComponent, ShowDepartmentsDetailsComponent, ShowRolesDetailsComponent, AdminPageComponent, EmployeeProfileComponent, FilterPipePipe,FilterPipePipe2,FilterPipePipe3, EmployeeRegisterComponent, EmployeeRegisterByLinkComponent, ForgetEmployeePasswordComponent, ProjectCreateComponent, ProjectUpdateComponent, ProjectViewComponent, HomepageComponent, ChangePositionComponent, EmployeePasswordChangeComponent],
  exports: [RouterModule]
})
export class ProfileModule { }
 