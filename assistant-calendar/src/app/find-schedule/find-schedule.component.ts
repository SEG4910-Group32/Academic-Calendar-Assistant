import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-find-schedule',
  templateUrl: './find-schedule.component.html',
  styleUrls: ['./find-schedule.component.css']
})
export class FindScheduleComponent {
  scheduleIdForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24),
              Validators.pattern('[0-9a-fA-F]*')]]
  });

  doesScheduleExist: boolean = true; // boolean keeping track of if a schedule with the id provided exists

  /**
   * Function which checks if a schedule with the provided id exists and navigates to subscribe to schedule
   * if it does
   * @param id 24 length hexadecimal id corresponding to a schedule
   */
  scheduleExists = async (id: string) => {
    return this.http.get("http://localhost:3000/schedule/check/" + id).subscribe(exists => {
      if (exists) {
        this.doesScheduleExist = true;

        this.router.navigate(['/subscribe-schedule'], { queryParams: { id: id } });
      }
      else {
        console.log("doc does not exist");

        this.doesScheduleExist = false;
      }
      
    }, err => {
      console.log("error");
    });
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * Function which checks if schedule exists if the form has no errors
   */
  search(): void {
    let id = this.scheduleIdForm.controls.id.value;
    let invalid = this.scheduleIdForm.controls.id.errors;

    if (id && !invalid) {
      this.scheduleExists(id);
    }
  }
}
