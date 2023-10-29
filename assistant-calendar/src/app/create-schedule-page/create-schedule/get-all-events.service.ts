import { Injectable } from '@angular/core';
import { Deliverable } from './deliverable';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAllEventsService {

  
  //gets the events from the db to be used in the frontend
private endpoint = 'http://localhost:3000/api/events/';

  constructor(private http: HttpClient) { }

  private refresh = new Subject<void>();

  get refreshRequired(){
    return this.refresh;
  }
  //we cast the observable into a Deliverable array
  getUsers():Observable<Deliverable[]>{
    console.log("get all events called")
    return this.http.get<Deliverable[]>(this.endpoint);
  }

  

}
