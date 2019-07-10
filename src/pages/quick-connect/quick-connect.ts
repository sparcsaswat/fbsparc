import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the QuickConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quick-connect',
  templateUrl: 'quick-connect.html',
  providers: [DatePipe]
})
export class QuickConnectPage {
  friendListDetails: any = [];
  fromTime: any = '';
  toTime: any = '';
  toTime1: any = '';
  toTime2: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public datePipe: DatePipe
  ) {

    this.friendListDetails = this.navParams.data.friendlistData;
    console.log("friendListDetails list");
    console.log(this.friendListDetails);

    this.getFormatedDate();
  }

  getFormatedDate() {
    this.fromTime = this.datePipe.transform(new Date(), "hh:mm a");
    this.toTime = this.datePipe.transform(Date.now() + (3 * 60 * 60 * 1000), "hh:mm a");
    console.log("fromTime  " + this.fromTime);
    console.log("toTime  " + this.toTime);
  }

  goToFriendsProfile(item) {
    this.navCtrl.push('FriendsProfilePage', { "detail": item,"fromPage":"connectPage" })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickConnectPage');
  }

}
