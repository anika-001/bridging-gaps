import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ConsultationComponent } from './consultation/consultation.component';
// import { DoctorsProfileComponent } from './doctors-profile/doctors-profile.component';
import { FamilyMembersComponent } from './family-members/family-members.component';
import { FormComponent } from './form/form.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { MeddeliveryComponent } from './meddelivery/meddelivery.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TimeslotsComponent } from './timeslots/timeslots.component';
import { LabtestComponent } from './labtest/labtest.component';
import { HelperComponent } from './helper/helper.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {
    path: 'schedule',
    component: ScheduleComponent,
  },
  {
    path: 'helper',
    component: HelperComponent,
  },
  {
    path: 'lab',
    component: LabtestComponent,
  },
  {
    path: 'slots',
    component: TimeslotsComponent,
  },
  
  {
    path: 'consultation',
    component: ConsultationComponent,
  },
  {
    path: 'review',
    component: ReviewsComponent,
  },
  {
    path: 'family',
    component: FamilyMembersComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'meddelivery',
    component: MeddeliveryComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
