import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackButton } from './registerBackButtonAction';
import { LoginPage } from '../pages/login/login';
import { AppPreferences } from '@ionic-native/app-preferences';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers: [AppPreferences,BackButton]
})
export class MyApp {
  //rootPage:any = LoginPage;
  rootPage: any;

  constructor(
     public BackButton: BackButton,
     private appPreferences: AppPreferences,
     platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen
     ) {
    var currObj = this;  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
        this.appPreferences.fetch('','user_info').then(data=>{
          console.log(data)
          if(data != null){
            this.rootPage = "MenuTabPage";
          }else{
            this.rootPage =  LoginPage;
          }
            
         })
    });
  }
}

