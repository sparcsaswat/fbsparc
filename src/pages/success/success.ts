import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCntrlr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
  }
  back() {
    var currObj = this;
    this.navCtrl.setRoot(LoginPage).then(() => {
      let index = currObj.viewCntrlr.index;
      for (let i = index; i > 0; i--) {
        currObj.navCtrl.remove(i);
      }
    })
  }

}
