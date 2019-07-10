import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CommonService } from '../utils/commonService';
import { HTTP } from '@ionic-native/http';
import { IonicSelectableModule } from 'ionic-selectable';
import { HomePage } from '../pages/home/home';
import { LottieAnimationViewModule } from 'ng-lottie';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
//import { ServiceUrl } from '../../utils/apiConfig';

//const config: SocketIoConfig = { url: 'http://192.168.103.85:3001', options: {} }; //local
// const config: SocketIoConfig = { url: 'http://10.1.1.79:3002', options: {} };    //staging

// const config: SocketIoConfig = { url: 'http://10.1.1.79:3002', options: { withCredentials: false } };    //staging


// const config: SocketIoConfig = { url: 'http://192.168.103.85:3002', options: { withCredentials: false } }; //local
const config: SocketIoConfig = { url: 'http://164.164.122.176:3003', options: { withCredentials: false } }; //local

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    LottieAnimationViewModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicSelectableModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
