import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { ImageviewComponent } from './imageview/imageview.component';
import { PastdetailComponent } from './pastdetail/pastdetail.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadpasteventComponent } from './uploadpastevent/uploadpastevent.component';

import { SharedModuleModule } from "./../shared-module/shared-module.module";

import { EventcardComponent } from './eventcard/eventcard.component';

import { Header1Component } from "./../SharePart/header1/header1.component";
import { CommentComponent } from './comment/comment.component';
import { AuthLoginGuard } from "./../AuthGards/auth-login.guard";

@NgModule({
  imports: [
    SharedModuleModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([

      { path: 'imageupload/:id', component: ImageuploadComponent, canActivate: [AuthLoginGuard] },
      { path: 'imageview/:id', component: ImageviewComponent, canActivate: [AuthLoginGuard] },
      { path: 'comment/:id', component: CommentComponent, canActivate: [AuthLoginGuard] },
      { path: 'eventcard', component: EventcardComponent, canActivate: [AuthLoginGuard] },

      { path: 'uploadpastevent/:id', component: UploadpasteventComponent, canActivate: [AuthLoginGuard] },

      {
        path: 'event', component: SidebarComponent, canActivate: [AuthLoginGuard],

        children: [
          { path: 's/:id', component: PastdetailComponent },


        ]
      },


    ])
  ],
  declarations: [Header1Component, ImageuploadComponent, ImageviewComponent, PastdetailComponent,
     SidebarComponent, UploadpasteventComponent, EventcardComponent, CommentComponent,],
  providers: [AuthLoginGuard],
  exports: [RouterModule]

})
export class PasteventModule { }
