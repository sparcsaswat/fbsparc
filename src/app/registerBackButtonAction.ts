// import { ServiceUrl } from '../util/appConfig';
import { Injectable } from "@angular/core";
import {
  Platform,
  App,
  IonicApp,
  AlertController,
  MenuController 
} from "ionic-angular";

@Injectable()
export class BackButton {
  constructor(
    public platform: Platform,
    app: App, 
    public menuCtrl: MenuController,
    private ionicApp: IonicApp,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        let activePortal =
          this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();
 
        if (activePortal) {
          //alert(1)
          activePortal.dismiss();
          //  if(ServiceUrl.appVersionUpdate=="Y")
          //    this.platform.exitApp();
        } 
        else {
          console.log("can go back=" + app.getActiveNav().canGoBack())
          if (app.getActiveNav().canGoBack()) { //Can we go back?
            app.getActiveNav().pop();
          }
          else if (app.getRootNav().canGoBack()) { //Can we go back?
            app.getRootNav().pop();
          }
          else if (this.menuCtrl.isOpen('SidemenuPage')) { //Can we go back?
            this.menuCtrl.close();
          }
          else {
            this.myHandlerFunction();
          }
        }
      });
      //statusBar.styleDefault();
      //splashScreen.hide();
    });
  }
  myHandlerFunction() {
    var currObj = this;
    let alert = this.alertCtrl.create({
      title: "Exit?",
      message: "Do you want to exit the app?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Exit",
          handler: () => {
            currObj.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  existApp(e) {
    if (e == 1) {
      navigator["app"].exitApp();
    }
  }
}
