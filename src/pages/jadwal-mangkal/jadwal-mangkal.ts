import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-jadwal-mangkal',
  templateUrl: 'jadwal-mangkal.html'
})
export class JadwalMangkalPage {

  email: any;
  tempatMangkal: any;
  jamMangkal: any;
  mangkal : AngularFireList<any>;


  onViewDidLoad(){
    
  }

  constructor(public afdb: AngularFireDatabase,public navCtrl: NavController, private navParam: NavParams) {
    this.email = this.navParam.get("email");
    console.log(this.email);
    this.mangkal = afdb.list('geolocations/pedagang/' + this.email);
    //import email dari login kesini :)
  }

  addTempat(){
    // var mangkalBaru = this.mangkal.push({});
    // mangkalBaru.set({
    //   tempatMangkal : this.tempatMangkal,
    //   jamMangkal : this.jamMangkal
    // })
    firebase.database().ref('geolocations/' + 'pedagang/'+ this.email).update({
      tempatMangkal : this.tempatMangkal,
      jamMangkal: this.jamMangkal
    });
  }


  
}
