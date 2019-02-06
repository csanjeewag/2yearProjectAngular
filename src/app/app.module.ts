import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from "./shared-module/shared-module.module";
import { AuthLoginGuard } from "./AuthGards/auth-login.guard";
import { AuthRoleGuard } from "./AuthGards/auth-role.guard";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RepositoryService } from './ShareData/repository.service';
import {UserServiceService } from './ShareData/user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { SidenavbarComponent } from './SharePart/sidenavbar/sidenavbar.component';
//import {LandingPageComponent} from './landing-page/landing-page.component'
import { AuthServiceService } from "./AuthGards/auth-service.service";
                                              
@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  
    ReactiveFormsModule,
    SharedModuleModule,
    BrowserAnimationsModule,
    //LandingPageComponent

 
    
  ],
  providers: [
    RepositoryService,
    UserServiceService,
    AuthLoginGuard,
    AuthServiceService,
    AuthRoleGuard
  ],
  
  bootstrap: [AppComponent],
  exports:[ SharedModuleModule]
})
export class AppModule { }
