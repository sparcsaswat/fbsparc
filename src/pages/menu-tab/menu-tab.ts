import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the MenuTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-tab',
  templateUrl: 'menu-tab.html',
})
export class MenuTabPage {
  @ViewChild('myTabs') tabRef: Tabs;
  activeTab:any = 2;
  
  tab1Root = "ExplorePage";
  tab2Root = "NotificationPage";
  tab3Root = HomePage;
  tab4Root = "ChatListPage";
  tab5Root = "ProfilePage";

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuTabPage');
  }
  ionViewDidEnter() {
    // this.tabRef.select(2);
  }
  checkActiveTab() {
    this.activeTab = this.tabRef.getSelected().index;
  }
  showOption(myEvent) {
    let popover = this.popoverCtrl.create("MenuOptionsPage");
    popover.present({
      ev: myEvent
    });
  }
}
