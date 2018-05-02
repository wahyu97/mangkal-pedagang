import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-jadwal-mangkal',
  templateUrl: 'jadwal-mangkal.html'
})
export class JadwalMangkalPage {
  editStatus: boolean;
	editKey: any;
  email: any;
  tempatMangkal: any;
  jamMangkal: any;
  mangkal : AngularFireList<any>;
  editMangkal : any;
	
  onViewDidLoad(){
    
  }

  constructor(public afdb: AngularFireDatabase,public navCtrl: NavController, private navParam: NavParams) {
    this.email = this.navParam.get("email");
    console.log(this.email);
    this.mangkal = this.afdb.list('detail/pedagang/' + this.email+'/email');
    this.editMangkal = navParam.get('item');
  	if (this.editMangkal!=null) {
  		this.editMangkal = true;
  		this.editKey = this.editMangkal.id;
  		this.tempatMangkal = this.editMangkal.tempatMangkal;
  		this.jamMangkal = this.editMangkal.jamMangkal;
  	}
  }

  addTempat(){
    if (this.editMangkal) {
  		this.mangkal.update(this.editKey,{
  			tempatMangkal: this.tempatMangkal,
  			jamMangkal: this.jamMangkal,
  			
  		}).then(msg =>{
  			console.log("Data Berhasil diupdate")
        this.navCtrl.pop();
  		}).catch(err =>{
  			console.error("Data Gagal Disimpan")
  		})
  	}else{
  	var newLaporan = this.mangkal.push({});
  	newLaporan.set({
  		id: newLaporan.key,
  		tempatMangkal: this.tempatMangkal,
  		jamMangkal : this.jamMangkal,
      
  	})
	}
	this.navCtrl.pop();
  }
  }
 
