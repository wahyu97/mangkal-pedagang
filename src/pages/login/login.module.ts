import { NgModule } from '@angular/core';
import { IonicPageModule  } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule .forChild(LoginPage),
  ],
  exports: [
    LoginPage
  ]
})
export class UserLoginModule {
	
	mytest(){
		console.log("this is my test");
	}
}
