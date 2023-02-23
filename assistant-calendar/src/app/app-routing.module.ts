import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindScheduleComponent } from './find-schedule/find-schedule.component';

const routes: Routes = [
  {path: 'find-schedule', component: FindScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
