import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { Event } from 'src/app/Models/event.model';

declare var gapi: any;
declare var createGoogleEvent: any;

@Injectable({
    providedIn: 'root'
})
export class googleCalendar{
    

    constructor() { 
        
    }

    ngOnInit() {
        
    }

    

   
    createEvent(event:Event) {
        createGoogleEvent(event);

    }

}
