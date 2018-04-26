import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AplikasiPenjualPage } from '../aplikasi-penjual/aplikasi-penjual';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-profil-edit',
  templateUrl: 'profil-edit.html'
})
export class ProfilEditPage {

  constructor(public navCtrl: NavController) {
  }
  goToAplikasiPenjual(params){
    if (!params) params = {};
    this.navCtrl.push(AplikasiPenjualPage);
  }goToProfile(params){
    if (!params) params = {};
    this.navCtrl.push(ProfilePage);
  }
}
