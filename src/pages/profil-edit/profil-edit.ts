import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'Firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  selector: 'page-profil-edit',
  templateUrl: 'profil-edit.html'
})
export class ProfilEditPage {

  email: any;
  namaPedagang: any;
  telpPedagang: any;
  detailDagangan: any;
  @ViewChild('map') mapElement: ElementRef;
  mangkal:AngularFireList<any>;
  editMangkal: any;
  ref: any;
  myPhoto: any;

  constructor(public afdb: AngularFireDatabase,
    public navCtrl: NavController, 
    private navParams: NavParams,
    private camera: Camera,) {
    this.email = this.navParams.get("email");
    console.log(this.email);
    this.mangkal = this.afdb.list('detail/pedagang/'+this.email+'/detail_pedagang')
    this.editMangkal= navParams.get('item');
    if(this.editMangkal!=null){
      this.editMangkal = true;
      this.namaPedagang = this.editMangkal.namaPedagang;
      this.telpPedagang = this.editMangkal.telpPedagang;
      this.detailDagangan = this.editMangkal.detail_pedagang;
    }
    this.ref = firebase.database().ref('detail/pedagang/' +this.email +'/detail_pedagang/profile');
  }

  capture(){
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.myPhoto = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      });
  }
  
  openGalery(){
    const CameraOptions: CameraOptions = {
      quality: 20,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      targetWidth: 1000,
    };
    this.camera.getPicture(CameraOptions).then((file_uri) =>{
      this.myPhoto = file_uri;
    }), (err) =>{
      console.log(err);
      console.log("gagal memuat galery");
    }
  }
  
  addProfile(){
    let newData = this.ref;
      newData.set({
        nama: this.namaPedagang,
        telp: this.telpPedagang,
        detail: this.detailDagangan,
        gambar: this.myPhoto,
      });
      this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }
}
