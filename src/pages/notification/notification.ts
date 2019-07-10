import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Network } from '@ionic-native/network';
import { Services } from '../../utils/services';
import { CommonService } from '../../utils/commonService';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
  providers: [AppPreferences, Network, Services, DatePipe]
})
export class NotificationPage {
  activeTab: any = "calender";
  notificationData: any[] = []
  scheduledMeetsNotifData: any[] = []
  fromUserId: any = ''
  toUserId: any = ''
  requestStatus: any = '';
  requestDate: any = '';
  fromUserName: any = '';
  toUserName: any = '';
  meetupRequestId: any = '';
  requestParam: any = '';
  flag: number = 0;
  meetupDateTime: any = '';
  currentTime: any = '';
  allFreeFriends: any[] = [];
  flag1: number = 0;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    public network: Network,
    public loadingCtrl: LoadingController,
    public service: Services,
    public datePipe: DatePipe,
    public CommonServiceData: CommonService) {

    this.appPreferences.fetch('', "user_info").then((res) => {
      console.log(res);
      this.fromUserId = res.userId;
      this.fromUserName = res.name;
      this.loadNotificationData()
    })

  }

  getFormatedDate(date) {
    // var newDate = date.replace(' ', 'T')
    // this.meetupDateTime = this.datePipe.transform(new Date(date), "dd MMM yyyy");
    var res = date.split(" ");
    console.log(res[0]);
    console.log(res[1]);

    this.meetupDateTime = res[0];
    // this.currentTime = this.datePipe.transform(new Date(date), "hh:mm a");
    this.currentTime = res[1]
    return this.meetupDateTime
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  loadData(activeTabType: any) {
    this.activeTab = activeTabType
    if (activeTabType == 'calender') {
      this.loadCalenderData();
    }
    else {
      this.loadNotificationData();
    }
  }
  loadCalenderData() {

  }
  loadNotificationData() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {
      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });
      loading.present();
      var param = {
        "userId": this.fromUserId
      }
      console.log(param);
      this.service.fetchCommonData("getMeetupNotifications", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data);
        console.log(';;;;;;;;;;;;')
        console.log(response.data)
        if (response.data.status == 200) {
          this.notificationData = response.data.output.FriendRequestNotification;
          this.scheduledMeetsNotifData = response.data.output.ScheduledMeetsNotification;
          this.allFreeFriends = response.data.output.AllFriends
        }
        else if (response.data.status == 402) {
          this.CommonServiceData.presentToast(response.data.msg)
        }
        else {
          this.CommonServiceData.presentToast(response.error)
        }
      })
        .catch(error => {
          console.log(error)
          loading.dismiss();
          this.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
        });
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }

  acceptRequest(meetupRequestId) {
    this.sendFriendRequest('2', meetupRequestId)
  }
  rejectRequest(meetupRequestId) {
    this.sendFriendRequest('3', meetupRequestId)
  }

  sendFriendRequest(status, meetupRequestId) {
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });

      loading.present();

      var param = {
        "requestId": meetupRequestId,
        "requestStatus": status,
        "userId": this.fromUserId
      }
      console.log(param);


      this.service.fetchCommonData("acceptRejectRequest", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        console.log('meetup data');
        console.log(response.data)
        if (response.data.status == 200) {
          if (status == '2') {
            this.flag = 1;
          }
          else {
            this.flag = 0;
          }
        }
        else if (response.data.status == 402) {
          this.CommonServiceData.presentToast(response.data.msg)
        }
        else {
          this.CommonServiceData.presentToast(response.error)
        }
      })
        .catch(error => {
          console.log(error)
          loading.dismiss();
          this.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
        });
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }

  /**** MEET UP SCHEDULE */

  acceptMeetupRequest(meetupScheduleId, status) {
    this.meetUpAcceptReject(meetupScheduleId, status);
  }

  rejectMeetupRequest(meetupScheduleId, status) {
    this.meetUpAcceptReject(meetupScheduleId, status);
  }

  meetUpAcceptReject(meetupScheduleId, status) {
    if (this.network.type != 'none' && this.network.type != 'unknown') {
      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });
      loading.present();

      var param = {
        "meetupScheduleId": meetupScheduleId,
        "requestStatus": status,
        "userId": this.fromUserId
      }
      console.log(param);
      this.service.fetchCommonData("meetUpAcceptReject", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        console.log('meetup data');
        console.log(response.data)
        if (response.data.status == 200) {
          if (status == '2') {
            this.flag1 = 1;
          }
          else {
            this.flag1 = 0;
          }

        }
        else {
          this.CommonServiceData.presentToast(response.error)
        }
      })
        .catch(error => {
          console.log(error)
          loading.dismiss();
          this.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
        });
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }

}
