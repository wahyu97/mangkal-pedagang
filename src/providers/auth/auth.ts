//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public af: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  loginWithEmail(credential) {
    return Observable.create(observer => {
      this.af.auth.signInWithEmailAndPassword(credential.email, credential.password)
        .then((authData) => {
          console.log(authData);
          console.log("Success!, user is login...");
        })
        .catch((error) => {
          console.log(error);
          console.log("Error, login fail..")
        })
    })
  }

}
