import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AplikasiPenjualPage } from '../aplikasi-penjual/aplikasi-penjual';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;
  loginMail: any;
  isLogin:any;

  constructor(public navCtrl: NavController, 
    public navParams:NavParams, 
    private af: AngularFireAuth,
    private toastCtrl: ToastController,
  ) {
  }
  goToAplikasiPenjual(user: User){
    try{
      const result = this.af.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.loginMail= user.email;
        this.isLogin = "isLogin";
        this.navCtrl.setRoot(AplikasiPenjualPage, {email : this.loginMail, login : this.isLogin});
      }
    }
    catch(e){
      this.presentToast();
    }
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Kata Sandi atau Email Salah',
      duration: 3000
    });
    toast.present();
  }

  appPenjual(){
    this.navCtrl.setRoot(AplikasiPenjualPage);
  }
}
