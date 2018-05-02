import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import {} from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation'
import { JadwalMangkalPage } from '../jadwal-mangkal/jadwal-mangkal'
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-aplikasi-penjual',
  templateUrl: 'aplikasi-penjual.html'
})
export class AplikasiPenjualPage {

  
  toogleValue: boolean = false;

  partEmail: any;
  partEmail2: any;


  ionViewDidLoad() {
    //console.log(this.phone);    
   
  }
  
  
  mangkal:Observable<any[]>;
  mangkalRef : AngularFireList<any>;
  statusRef : AngularFireList<any>;
  phone: any;
  email: any;
  status: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  ref: any;
  public items: Array<any> = [];
  //public itemRef: firebase.database.Reference = firebase.database().ref('detail/pedagang/' + this.email);
  isLogin:any;
  mangkalStatus: any = "tidak_aktif";

  constructor(public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    private device: Device,
    private navParam: NavParams,
    private afDB: AngularFireDatabase,
    private toastCtrl: ToastController,
  ) {

    this.email = this.navParam.get("email");
    this.isLogin = this.navParam.get("login");
    if(this.isLogin === "isLogin"){
    this.isLogin = "notLogin";
    this.partEmail = this.email.split("@");
    this.partEmail2 = this.partEmail[1].split(".");
    console.log(this.partEmail);
    this.email = this.partEmail[0] + "-" + this.partEmail2[0] + "-" + this.partEmail2[1];
    console.log(this.partEmail[0] + "-" + this.partEmail2[0] + "-" + this.partEmail2[1]);
    // this.itemRef.on('value', itemSnapshot => {
    //   this.items = [];
    //   itemSnapshot.forEach(itemSnap => {
    //     this.items.push(itemSnap.val());
    //     return false;
    //   });
    // });
    }
    this.ref = firebase.database().ref('aktif/' +this.email +"/email");
  this.mangkal = this.afDB.list('detail/pedagang/' + this.email+'/email' ).valueChanges();
  this.mangkalRef = this.afDB.list('detail/pedagang/' + this.email+'/email');
  console.log(this.mangkal);
    this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if (data.uuid !== this.device.uuid) {
          let image = 'assets/imgs/logo.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/imgs/logo.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        }
      });
    });   
  }


  public statusChange(value){
    this.status = this.toogleValue;
    console.log("Toggled: "+ this.status);
    if(this.status == true){
      this.initMap();
      this.mangkalStatus = "aktif";
      console.log("aktif");
    } else{
      this.mangkalStatus = "tidak_aktif";
      this.deleteMap();
      console.log(this.mangkalStatus);
    }
  }

  addMangkal(){
    this.navCtrl.push(JadwalMangkalPage, {email : this.email});
    console.log("pindah ke jadwal")
  }

  
  hapusMangkal(id){
    this.mangkalRef.remove(id)
    .then(msg=>{
      console.log(msg);
      console.log("data berhasil dihapus")
    })
    .catch(err=>{
      console.error(err);
      console.log("error bro");
    })
  }

  getDataFromFireBase() {
    if(this.mangkalStatus == "aktif"){
    this.afDB.list(this.mangkalStatus +'/' + this.email).valueChanges().subscribe(
      data => {
        console.log(data)
        this.items = data
      }
    )
  }
  }


  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.email,  data.coords.latitude, data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let image = 'assets/imgs/logo.png';
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });


  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
    console.log("Selamat Mangkal");
   
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }


  updateGeolocation(uuid, lat, lng) {
    if (localStorage.getItem('mykey')) {
      firebase.database().ref(this.mangkalStatus +'/' + this.email).set({
        email: this.email,
        latitude: lat,
        longitude: lng,
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        email: this.email,
        latitude: lat,
        longitude: lng,
      });
      localStorage.setItem('mykey', this.email);
    }
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage, {email : this.email});
  }



  deleteMap(){
  this.statusRef = this.afDB.list('aktif/');
    this.statusRef.remove(this.email)
      .then(msg=>{
        console.log(msg);
        console.log("data berhasil dihapus")
        this.message= "Anda Tidak Mangkal";
        this.presentToast();
      })
      .catch(err=>{
        console.error(err);
        console.log("error bro");
      })
    } 


    ionViewWillUnload(){
      this.message= "Anda Tidak Mangkal";
        this.presentToast();
    }

    message: any;
    presentToast(){
      let toast = this.toastCtrl.create({
        message: this.message,
        duration: 3000
      });
      toast.present();
    }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
  
  

};
