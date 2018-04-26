import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'Firebase';


import { LoginPage } from '../pages/login/login';


const config = {
  apiKey: "AIzaSyAiTx7Edwl-C9wiAiDK2A9bnfuNWrI-mWI",
  authDomain: "mangkal-apps.firebaseapp.com",
  databaseURL: "https://mangkal-apps.firebaseio.com",
  projectId: "mangkal-apps",
  storageBucket: "mangkal-apps.appspot.com",
  messagingSenderId: "783166009858"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
    rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
  
}
