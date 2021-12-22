import { Component } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BridgGaps';
  currentRating = 3;
}
