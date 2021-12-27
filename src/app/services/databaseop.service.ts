import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseopService {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  create(address: string, value: any) {
    return this.db.collection(address).add(value);
  }

  createdoc(address: string, value: any) {
    return this.db.doc(address).set(value);
  }

  upload(path: any, dbpath: any, file: any, data: any) {
    return new Promise((resolve, reject) => {
      console.log(file[0]);
      const ref = this.storage.ref(path);
      this.storage.upload(path + "/" + file[0].name, file[0]).then(
        (ress: any) => {
          ref.getDownloadURL().subscribe((res: any) => {
            console.log(res);
            data["link"]=res;
            this.db.collection(dbpath).add(data).then(e => {
              // 
              console.log(e)
              resolve("done");
            }).
              catch(e => {
                console.log(e);
                reject(e)
              });
          })

        });
    })
  }

  readCollection(path: any){
    return this.db.collection(path);
  }

  readDoc(path: any){
    return this.db.doc(path);
  }


}
