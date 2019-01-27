import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';


import {NgbModal,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-two-day-trip',
  templateUrl: './two-day-trip.component.html',
  styleUrls: ['./two-day-trip.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TwoDayTripComponent implements OnInit {
 constructor(){}


  ngOnInit(){}


}
