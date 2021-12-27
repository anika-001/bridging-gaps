import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultationComponent } from './consultation/consultation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeddeliveryComponent } from './meddelivery/meddelivery.component';
import { FamilyMembersComponent } from './family-members/family-members.component';
import { HistoryComponent } from './history/history.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormTemplateComponent } from './form-template/form-template.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormComponent } from './form/form.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeslotsComponent } from './timeslots/timeslots.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    ConsultationComponent,
    NavbarComponent,
    MeddeliveryComponent,
    FamilyMembersComponent,
    HistoryComponent,
    FormTemplateComponent,
    DynamicFormComponent,
    FormComponent,
    ScheduleComponent,
    CartComponent,
    TimeslotsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatSelectModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule
  ],
  providers: [],
  
  bootstrap: [AppComponent]

})
export class AppModule { }
