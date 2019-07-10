import { Injectable, Component } from "@angular/core";
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
@Component({
    providers: [File]
})
export class CommonService {
    loading: any = '';
    constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public loadingController: LoadingController) { }


    presentLoading(msg, duration) {
        this.loading = this.loadingCtrl.create({
            content: msg,
            duration: duration
        });

        this.loading.present();
    }

    dismissLoading() {
        setTimeout(() => {
            this.loading.dismiss();
        }, 2000);
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }
    showAlert(msg) {
        const alert = this.alertCtrl.create({
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    //   dismissToast(msg) {
    //         let toast = this.toastCtrl.create({
    //             message: msg,
    //             duration: 4000
    //         });
    //          toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });
    //         // toast.present();
    //     }


    // presentLoading(value) {
    //     let loader = this.loadingCtrl.create({
    //         content: "Please wait...",
    //         duration: 4000
    //     });
    //     if (value) {
    //         console.log('loader  present val=' + value)
    //         loader.present();
    //     }
    //     else {
    //         //  console.log('loader dissmiss val='+value)
    //         loader.dismiss();
    //         // this.presentToast();
    //     }
    // }
    presentAlert(msg) {
        let alert = this.alertCtrl.create({
            subTitle: msg,
            buttons: ['Cancel']
        });
        alert.present();
    }
    getMonthIdByName(name) {
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        // month['Jan'] = "01"; month['Feb'] = "02"; month['Mar'] = "03"; month['Apr'] = "04"; month['May'] = "05"; month['Jun'] = "06"; month['Jul'] = "07"; month['Aug'] = "08"; month['Sep'] = "09"; month['Oct'] = "10"; month['Nov'] = "11"; month['Dec'] = "12";

        return month[name]
    }
    formatDate(date) {
        var month = new Array();
        month['01'] = "Jan"; month['02'] = "Feb"; month['03'] = "Mar"; month['04'] = "Apr"; month['05'] = "May"; month['06'] = "Jun"; month['07'] = "Jul"; month['08'] = "Aug"; month['09'] = "Sep"; month['10'] = "Oct"; month['11'] = "Nov"; month['12'] = "Dec";
        var tempDate = date.split('-')
        return tempDate[2] + '-' + month[tempDate[1]] + '-' + tempDate[0]
    }
    showAlertMsg(val) {

        var msg;
        msg = "You have recieved a new notication. please check your notification section for detail."
        const alert = this.alertCtrl.create({
          title: 'New Friend!',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      }
}
