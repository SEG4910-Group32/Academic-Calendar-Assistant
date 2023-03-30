import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { FindScheduleComponent } from './find-schedule/find-schedule.component';
import { CreateSchedulePageComponent } from './create-schedule-page/create-schedule-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SubscribescheduleComponent } from './subscribeschedule/subscribeschedule.component';
import { UpdateProfilePageComponent } from './update-profile-page/update-profile-page.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path: 'find-schedule', component: FindScheduleComponent },
  { path: 'create-schedule', component: CreateSchedulePageComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'subscribe-schedule', component: SubscribescheduleComponent },
  { path: 'profile', component: UpdateProfilePageComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
