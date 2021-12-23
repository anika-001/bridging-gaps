import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationComponent } from './consultation/consultation.component';
import { FamilyMembersComponent } from './family-members/family-members.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { MeddeliveryComponent } from './meddelivery/meddelivery.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  {
    path: 'consultation',
    component: ConsultationComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
