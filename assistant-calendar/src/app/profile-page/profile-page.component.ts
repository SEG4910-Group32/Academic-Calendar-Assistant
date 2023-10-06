import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  
})
export class ProfilePageComponent {
  Schedules: string[] = ['SEG3102', 'SEG3101'];
}
