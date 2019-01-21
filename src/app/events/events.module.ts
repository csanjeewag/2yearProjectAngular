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
import { Header2Component } from "./../SharePart/header2/header2.component";

import { SharedModuleModule } from "./../shared-module/shared-module.module";
import { AddEventTypeComponent } from './add-event-type/add-event-type.component';
import { AddEventComponent } from './add-event/add-event.component';
import { SelectAttributeComponent } from './select-attribute/select-attribute.component';

@NgModule({
  imports: [
    SharedModuleModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'createEventPageForTrip', component:CreateEventPageForTripComponent},
      {path:'vieweventpage', component:ViewEventPageComponent},
      {path:'oneDayTrip/:id', component:OneDayTripComponent},
      {path:'twoDayTrip/:id', component:TwoDayTripComponent},
      {path:'yearEndParty/:id', component:TwoDayTripComponent},
      {path:'addeventtype', component:AddEventTypeComponent},
      {path:'addevent', component:AddEventComponent},
      {path:'eventHomePage', component:EventHomePageComponent},
      { path: 'CricketMatch', loadChildren: "./CricketMatch/CricketMatch.module#CricketMatchModule" },       
    ]),
  ],
  declarations: [Header2Component,CreateEventPageForTripComponent, ViewEventPageComponent, OneDayTripComponent, TwoDayTripComponent,EventHomePageComponent,YearEndPartyComponent, AddEventTypeComponent, AddEventComponent, SelectAttributeComponent]
})
export class EventsModule { }