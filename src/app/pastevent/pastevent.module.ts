import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { ImageviewComponent } from './imageview/imageview.component';
import { PastdetailComponent } from './pastdetail/pastdetail.component';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';
import { CricketMatchComponent } from './cricket-match/cricket-match.component';
import { AnnualTripComponent} from './annual-trip/annual-trip.component';
import { BdonationComponent } from './bdonation/bdonation.component';
import { CricketinfoComponent } from './cricketinfo/cricketinfo.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadpasteventComponent } from './uploadpastevent/uploadpastevent.component';
import { BudgetComponent } from './budget/budget.component';

import { LoggedHeaderComponent} from "./../SharePart/logged-header/logged-header.component";
import { EventcardComponent } from './eventcard/eventcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'imageupload', component: ImageuploadComponent },
      { path: 'imageview/:id', component: ImageviewComponent },
      { path: 'bdonation', component: BdonationComponent  },
      { path: 'budget', component: BudgetComponent  },
      { path: 'eventcard', component: EventcardComponent  },
      { path: 'cricketinfo', component: CricketinfoComponent},
      { path: 'uploadpastevent', component: UploadpasteventComponent },
      // { path: 'imageview', component: ImageviewComponent},
      { path: 'event', component: SidebarComponent,
      
       children: [
        { path: 's/:id', component: PastdetailComponent },
      
      ]
    },
     
      // { path: 'Pastdetail', component: PastdetailComponent,
      //   children: [

      //     { path: 'BloodDonation', component: BloodDonationComponent },
      //     { path: 'CricketMatch', component: CricketMatchComponent },
      //     { path: 'AnnualTrip', component: AnnualTripComponent },
      //   ]
      // },

    ])
  ],
  declarations: [ ImageuploadComponent, ImageviewComponent, PastdetailComponent,
    BloodDonationComponent,CricketMatchComponent,AnnualTripComponent, BdonationComponent, CricketinfoComponent, SidebarComponent, UploadpasteventComponent, BudgetComponent,LoggedHeaderComponent, EventcardComponent ],
  exports: [RouterModule]

})
export class PasteventModule { }
