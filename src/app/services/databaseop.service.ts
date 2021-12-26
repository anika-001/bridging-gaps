import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseopService {

  constructor(private db: AngularFirestore) { }

  create(address: string, value: any){
    return this.db.collection(address).add(value);
  }

  
}
