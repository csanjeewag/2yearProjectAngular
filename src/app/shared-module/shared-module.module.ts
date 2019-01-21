import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { AuthServiceService } from "./../AuthGards/auth-service.service";
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule

  ],
  declarations: [NavBarComponent],
  exports:[NavBarComponent],
  providers: [
    AuthServiceService
  ],

})
export class SharedModuleModule { }
