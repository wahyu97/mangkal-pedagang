import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-login',
    templateUrl: 'user-login.html',
})
export class UserLogin {

  user = {} as User;
  loginMail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFireAuth) {
  }


  login(user: User) {
    try {
      const result = this.af.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {

        this.loginMail = user.email;
        this.navCtrl.setRoot(HomePage, { email: this.loginMail });
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  dashboardPage() {
    this.navCtrl.setRoot(HomePage);
  }
}
