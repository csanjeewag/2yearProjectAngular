import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogingHeaderComponent } from './SharePart/loging-header/loging-header.component';
import { RepositoryService } from './ShareData/repository.service';
import {UserServiceService } from './ShareData/user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavbarComponent } from './SharePart/sidenavbar/sidenavbar.component';

import { AuthServiceService } from "./AuthGards/auth-service.service";

@NgModule({
  declarations: [
    AppComponent,
    //LoggedHeaderComponent,
    LogingHeaderComponent,
    SidenavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 
    BrowserAnimationsModule,
    

 
    
  ],
  providers: [
    RepositoryService,
    UserServiceService,
  
    AuthServiceService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
