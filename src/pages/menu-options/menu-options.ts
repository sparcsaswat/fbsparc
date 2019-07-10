import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController, Events } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { LoginPage } from '../login/login';
import { CommonService } from '../../utils/commonService';
import { Services } from '../../utils/services';
import { Network } from '@ionic-native/network';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the MenuOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-options',
  templateUrl: 'menu-options.html',
  providers: [AppPreferences, Services, CommonService, Network,Events]
})
export class MenuOptionsPage {
  userId: any; 

  constructor(public alertCtrl: AlertController,public events: Events,public navCtrl: NavController, public navParams: NavParams,public network: Network,
    private appPreferences: AppPreferences,public viewCtrl: ViewController,private socket: Socket, public CommonServiceData: CommonService, public service: Services,public toastCntrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuOptionsPage');
  }

  logOut() {
    var currObj = this;
    this.appPreferences.fetch('', "user_info").then((res) => {
      this.userId = res.userId
      this.socket.removeListener('connectUser' + this.userId)
    })
    let alert = this.alertCtrl.create({
      title: 'Logout?',
      message: 'Do you want to Logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            currObj.appPreferences.clearAll();
            currObj.navCtrl.push(LoginPage).then(()=>{
              var index = this.viewCtrl.index
              console.log(index)
                for(let i=0;i<=index;i++)
                {
                  this.navCtrl.remove(i);
                }
            });
          }
        }
      ]
    });
    alert.present();
  }

  syncMasterData() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      // var loading = this.loadingCtrl.create({
      //   content: 'Please wait..',
      //   spinner: 'crescent',
      // });
      // loading.present();
      this.CommonServiceData.presentLoading('Please wait...', 4000);

      this.service.fetchCommonGetData("getAllMasterData").then(response => {
        response.data = JSON.parse(response.data)
        console.log(response.data.output);
        if (response.data.status == 200) {
          // alert('1')
          console.log(response.data.output);
          this.appPreferences.store('', 'masterData', response.data.output).then(() => {
            this.CommonServiceData.dismissLoading();
            this.presentToast("Master data synced successfully!");

          })

        }
        else {
          this.CommonServiceData.dismissLoading();
          this.CommonServiceData.presentToast(response.error)
        }
      })
        .catch(error => {
          console.log(error)
          this.CommonServiceData.dismissLoading();
          this.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
        });
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }

  // editedData()
  // {
  //   alert('1')
  //   this.events.publish('onEdit')
  // }

  presentToast(msg) {
    let toast = this.toastCntrl.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      cssClass: 'masterSynced',
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
