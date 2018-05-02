import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AplikasiPenjualPage } from '../pages/aplikasi-penjual/aplikasi-penjual';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilEditPage } from '../pages/profil-edit/profil-edit';
import { JadwalMangkalPage } from '../pages/jadwal-mangkal/jadwal-mangkal';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule  } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GeocoderProvider } from '../providers/geocoder/geocoder';

export const firebaseConfig = {
  apiKey: "AIzaSyAiTx7Edwl-C9wiAiDK2A9bnfuNWrI-mWI",
  authDomain: "mangkal-apps.firebaseapp.com",
  databaseURL: "https://mangkal-apps.firebaseio.com",
  projectId: "mangkal-apps",
  storageBucket: "mangkal-apps.appspot.com",
  messagingSenderId: "783166009858"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AplikasiPenjualPage,
    ProfilePage,
    ProfilEditPage,
    JadwalMangkalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
   
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AplikasiPenjualPage,
    ProfilePage,
    ProfilEditPage,
    JadwalMangkalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Geolocation,
    Device,
    Camera,
    Diagnostic,
    GeocoderProvider,
  ]
})
export class AppModule {}