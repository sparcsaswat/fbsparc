import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { LoginPage } from '../login/login';
import { Socket } from 'ng-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CommonService } from '../../utils/commonService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AppPreferences, LocalNotifications]
})
export class HomePage {
  userName: any;
  interest: any[] = [];
  userId: any;
  emitedDataFromSocket: any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,public CommonServiceData: CommonService, public navParams: NavParams, private appPreferences: AppPreferences,
    private socket: Socket,public localNotifications:LocalNotifications) {
      var currObj = this
      this.socket.connect()
      this.appPreferences.fetch('', "user_info").then((res) => {
        
        this.userId = res.userId
        this.userName = res.name.split(' ')[0]
        this.interest = res.interest
        console.log('connectUser' + this.userId);
        
        this.socket.on('connectUser' + this.userId, (data) => {
          console.log("data111")
          console.log(data)
          this.emitedDataFromSocket = data    
          this.CommonServiceData.showAlertMsg(data.requestStatus)
  
          currObj.localNotifications.schedule({
            id: this.userId,
            text: 'You Recieved a friend request',
            sound: 'file://sound.mp3',
            data: null
          });
          // this.socket.removeListener('connectUser' + this.userId)
          
          // currObj.localNotifications.schedule({
          //   id: 1,
          //   text: 'Single ILocalNotification',
          //   sound: 'file://sound.mp3' ,
          //   data: "You Recieved a friend request"
          // });
          // currObj.localNotifications.on('click').subscribe((result) => {
          //   console.log(result);
          // })
          
        })
      })
  }

  logOut() {
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
            this.appPreferences.clearAll();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  profile() {
    this.navCtrl.push("ProfilePage");
  }
  explore() {
    this.navCtrl.push("ExplorePage");
  }
  notification() {
    this.navCtrl.push("NotificationPage");
  }
  FriendsProfile() {
    this.navCtrl.push("FriendsProfilePage");
  }
  Chatlist() {
    this.navCtrl.push("ChatListPage");
  }

  meetPeople() {
    this.navCtrl.push("ExplorePage");
  }

  findRastaurants() {
    // this.navCtrl.push("NearByRestaurantPage");
    this.navCtrl.push("ExplorePage",{"fromPage":"homePage"});
  }

  connect() {
    this.navCtrl.push("ChatListPage");
  }

  restaurants() {
    this.navCtrl.push("NearByRestaurantPage");
  }
}
