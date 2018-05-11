import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilEditPage } from '../profil-edit/profil-edit';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../models/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user = {} as User;
  email : any;
  mangkal:Observable<any[]>;
  mangkalRef : AngularFireList<any>;
  constructor(public navCtrl: NavController, private navParam: NavParams, 
    private af: AngularFireAuth, 
    private afDB: AngularFireDatabase,) {

    this.email = this.navParam.get("email");
    console.log(this.email);
    this.mangkal = this.afDB.list('detail/pedagang/' + this.email +"/detail_pedagang").valueChanges();
    this.mangkalRef = this.afDB.list('detail/pedagang/' + this.email +"/detail_pedagang");

    

  }

  editProfile(){
    this.navCtrl.push(ProfilEditPage, {email : this.email});
  }

  logOut(){
    // this.af.auth.signOut();
    // this.navCtrl.setRoot(LoginPage);
    return Observable.create(observer =>{
      this.user.email = null;
      observer.next(true);
      observer.complete();
    })
  }
  
}
