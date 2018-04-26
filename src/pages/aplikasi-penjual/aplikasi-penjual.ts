import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import {} from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { AngularFireDatabase } from 'angularfire2/database';
// import { WeatherProvider } from '../../providers/weather/weather'
import { Geolocation } from '@ionic-native/geolocation'
import { JadwalMangkalPage } from '../jadwal-mangkal/jadwal-mangkal'
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';

declare var google: any;

@Component({
  selector: 'page-aplikasi-penjual',
  templateUrl: 'aplikasi-penjual.html'
})
export class AplikasiPenjualPage {

  mangkal:Observable<any[]>;
  toogleValue: boolean = false;
  // weather: any;
  // locationWeather: {
  //   city: string,
  //   state: string
  // }
  partEmail: any;
  partEmail2: any;
  phone: any;
  email: any;
  status: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  ref = firebase.database().ref('geolocations/pedagang/');
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('geolocations/pedagang/' + this.email);

  public statusChange(value){
    this.status = this.toogleValue;
    console.log("Toggled: "+ this.status);
    if(this.status == true){
      this.initMap();
      console.log("mangkal");
    } 
  }

  ionViewDidLoad() {
    //console.log(this.phone);    
    this.email = this.navParam.get("email");
    this.partEmail = this.email.split("@");
    this.partEmail2 = this.partEmail[1].split(".");
    console.log(this.partEmail);
    this.email = this.partEmail[0] + "-" + this.partEmail2[0] + "-" + this.partEmail2[1];
    console.log(this.partEmail[0] + "-" + this.partEmail2[0] + "-" + this.partEmail2[1]);
    // this.locationWeather = {
    //   city:'Denpasar',
    //   state:'Bali'
    // }
    // this.weatherProvider.getWeather(this.locationWeather.city, this.locationWeather.state).subscribe(weather => {
    // });
    this.itemRef.on('value', itemSnapshot => {
      this.items = [];
      itemSnapshot.forEach(itemSnap => {
        this.items.push(itemSnap.val());
        return false;
      });
    });
  }


  constructor(public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    private device: Device,
    private navParam: NavParams,
    private afDB: AngularFireDatabase,
    //private af: AngularFireAuth
    // private weatherProvider: WeatherProvider,
  ) {
    
    this.mangkal = this.afDB.list("mangkal").valueChanges();
    console.log("isi mangkal : " +this.mangkal)

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

  addMangkal(){
    this.navCtrl.push(JadwalMangkalPage, {email : this.email});
    console.log("pindah ke jadwal")
  }

  getDataFromFireBase() {
    this.afDB.list('geolocations/pedagang/' + this.email).valueChanges().subscribe(
      data => {
        console.log(data)
        this.items = data
      }
    )
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
      firebase.database().ref('geolocations/' + 'pedagang/'+ this.email).set({
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
    this.navCtrl.push(ProfilePage);
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
