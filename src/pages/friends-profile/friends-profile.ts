import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Network } from '@ionic-native/network';
import { CommonService } from '../../utils/commonService';
import { Services } from '../../utils/services';
import { DatePipe, JsonPipe } from '@angular/common';

/**
 * Generated class for the FriendsProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends-profile',
  templateUrl: 'friends-profile.html',
  providers: [Services, CommonService, Network, AppPreferences, DatePipe]
})
export class FriendsProfilePage {
  data: any = '';
  foodPreferences: any = [];
  interest: any = [];
  freeTimming: any[] = [];
  noOfInterest: number = 1;
  cuisine: number = 0;
  currentDate: any = '';
  activeTab: any = "preferences";
  friendUserId: any = '';
  fromUserId: any = '';
  fromUserName; any = '';
  flag: number = 0;
  flag1: number = 0;
  flag2: number = 0;
  restaurantData: any = [];
  openModal: any = false;
  restaurantName: any = '';
  restautantAddress: any = '';
  meetUpTime: any = '';
  restaurantId: any = '';
  meetupid: any = '';
  sendVal: number = 0;
  meetupDate: any = '';
  dateTosend: string = '';
  date: string = '';
  time: string = '';
  foodPrintCount: any = '';
  buddiesCount: any = '';
  preference: any;
  foodPreference: any = [];
  fromPage: any = "";
  tempArr: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    public loadingCtrl: LoadingController,
    public service: Services,
    public datePipe: DatePipe,
    public CommonServiceData: CommonService,
    public network: Network) {

    this.data = this.navParams.data.detail;

    this.foodPreferences = this.data.foodPreference
    this.restaurantData = this.navParams.data.restaurantData;
    this.friendUserId = this.navParams.data.friendUserId;
    this.foodPrintCount = this.data.foodPrintCount;
    this.buddiesCount = this.data.BuddiesCount;

    this.getCurrentDate();

    this.appPreferences.fetch('', "user_info").then((res) => {
      this.freeTimming =res.freeTime
      this.fromUserId = res.userId;
      this.fromUserName = res.name;
      this.getFriendRequestStatus(this.friendUserId, this.fromUserId);
      this.appPreferences.fetch('', "meetup_info").then((res1) => {
        this.meetupid = res1;
        if (this.meetupid != "" || this.meetupid != undefined || this.meetupid != null) {
          this.sendVal = 1;
        }
        else {
          this.sendVal = 0;
        }

        this.appPreferences.fetch('', "masterData").then((res3) => {
          this.preference = res3.foodPreference;
          var count = 0
          for (let k = 0; k < this.preference.length; k++) {
            this.tempArr.push(this.preference[k].FoodPreferences)
            count++
          }
          if (count == this.preference.length) {
            this.loadPreferncesData();
          }
        },
          (error) => {
            console.log(error);
            this.preference = [];
          })
          .catch(() => {
            this.preference = [];
          })
      })
    })
    // this.getFormatedDate();
  }

  ionViewDidEnter() {


  }

  getFriendRequestStatus(friendUserId, fromUserId) {

    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });

      loading.present();

      var param = {
        "fromUserId": fromUserId,
        "toUserId": friendUserId
      }
      console.log(param);
      // this.appPreferences.store('', 'friendrequestparam_info', param).then(() => {
      // })

      this.service.fetchCommonData("checkBeforeFriendRequest", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data);
        if (response.data.value == "1") {
          // this.flag = false;
          this.sendVal = 1;
          this.CommonServiceData.presentAlert("Friend request sent successfully.");
        }
        else if (response.data.value == "2") {
          this.sendVal = 2;
          // this.CommonServiceData.presentToast("Friend request has been sent already.")
        }
        else if (response.data.value == "3") {
          this.sendVal = 0;
          // this.CommonServiceData.presentToast(response.data.msg)
        }
        else {
          this.sendVal = 0;
          // this.CommonServiceData.presentToast(response.error)
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

  getFormatedDate(date) {
    // var newDate = date.replace(' ', 'T')
    this.dateTosend = this.datePipe.transform(new Date(date), "dd-MM-yyyy hh:mm a");
    this.date = this.datePipe.transform(new Date(date), "dd MMM");
    this.time = this.datePipe.transform(new Date(date), "hh:mm a");
    console.log(" this.dateTosend  " + this.dateTosend + "date  " + this.date + "time  " + this.time)
  }


  /**
* This function used for get current date
* Max and min date also calculated form this function
*/
  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear() - 18;
    var yyyyNew = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    console.log("hr   " + hh);
    console.log("min   " + min);
    var ddVal = ""; var mmVal = "";
    if (dd < 10) {
      ddVal = '0' + dd
    }
    else {
      ddVal = dd.toString()
    }
    if (mm < 10) {
      mmVal = '0' + mm
    }
    else {
      mmVal = mm.toString()
    }
    this.currentDate = dd + "-" + mmVal + "-" + yyyyNew;
    this.meetUpTime = mmVal + " " + dd;
    console.log(this.currentDate)
    this.getFormatedDate(today);
    // console.log("meetupdate", this.meetupDate);
    //this.minValidationDate = yyyyNew + '-' + mmVal + '-' + ddVal;
  }


  loadData(activeTabType: any) {
    var currObj = this;
    this.activeTab = activeTabType;
    if (activeTabType == 'preferences') {
      setTimeout(() => {
        currObj.loadPreferncesData();
      }, 1000);

    }
    else if (activeTabType == 'interest') {
      this.loadInterestData();
    }
    else {
      this.loadCalenderData();
    }
  }

  sendFriendRequest() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });

      loading.present();

      var param = {
        "fromUserId": this.fromUserId,
        "toUserId": this.friendUserId,
        "requestStatus": "1",
        "requestDate": this.currentDate,
        "fromUserName": this.fromUserName,
        "toUserName": this.data.name,
        "roomId": this.fromUserId + "_" + this.friendUserId
      }
      console.log(param);
      // this.appPreferences.store('', 'friendrequestparam_info', param).then(() => {
      // })

      this.service.fetchCommonData("makeMeetupRequest", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        console.log('meetup data');
        console.log(response.data)
        if (response.data.status == 200) {
          // this.flag = false;
          this.sendVal = 1;
          this.appPreferences.store('', 'meetup_info', response.data.output.meetupRequestId).then(() => {
          })

          this.CommonServiceData.presentAlert("Friend request sent successfully.");
        }
        else if (response.data.status == 201) {
          this.sendVal = 1;
          this.CommonServiceData.presentAlert("Friend request has been sent already.");
        }
        else if (response.data.status == 402) {
          this.sendVal = 0;
          this.CommonServiceData.presentToast("Unable to send friend request.Please try after sometime.")
        }
        else {
          this.sendVal = 0;
          this.CommonServiceData.presentToast("Unable to send friend request.Please try after sometime.")
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

  meetUpRequest() {

    this.appPreferences.fetch('', "meetup_info").then((res) => {
      // alert(res);
      this.meetupid = res;

      if (this.network.type != 'none' && this.network.type != 'unknown') {

        var loading = this.loadingCtrl.create({
          content: 'Please wait..',
          spinner: 'crescent',
        });

        loading.present();

        var param = {
          "fromUserId": this.fromUserId,
          "toUserId": this.friendUserId,
          "meetingDateAndTime": this.dateTosend,
          "resturantId": this.restaurantId,
          "resturantName": this.restaurantName,
          "meetUpRequestId": this.meetupid,
          "roomId": this.fromUserId + "_" + this.friendUserId,
          "fromUserName": this.fromUserName,
          "toUserName": this.data.name
        }
        // alert(JSON.stringify(param));
        console.log("meet up ree" + JSON.stringify(param))

        this.service.fetchCommonData("scheduleMeeting", param).then(response => {
          loading.dismiss();
          response.data = JSON.parse(response.data)
          console.log(response.data)
          if (response.data.status == 200) {
            this.openModal = false;
            this.CommonServiceData.presentAlert("Meet up request sent successfully.")
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
    })
  }

  close() {
    this.openModal = false;
  }

  onLocationClick() {
    this.flag1 = 1;
    this.flag = 1;
  }
  onRestaurantClick(item) {
    this.flag1 = 0;
    this.flag = 1;
    this.flag2 = 1;
    this.restaurantName = item.ResturantName;
    this.restautantAddress = item.StreetAddress;
    this.restaurantId = item.ResturantId
  }

  loadPreferncesData() {
    let count1 = 0
    for (let i = 0; i < this.foodPreferences.length; i++) {
      var index = this.tempArr.indexOf(this.foodPreferences[i])
      var obj = { "preferenceName": this.tempArr[index], "ImageUrl": this.preference[index].ImageUrl }
      this.foodPreference.push(obj);
    }
    this.cuisine = this.foodPreference.length;

    if (count1 == this.foodPreferences.length) {
      console.log(this.foodPreference)
      this.cuisine = this.foodPreference.length;
    }
  }

  checkStatus() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });

      loading.present();

      var param = {
        "fromUserId": this.fromUserId,
        "toUserId": this.friendUserId
      }

      console.log(param);

      this.service.fetchCommonData("checkBeforeSchedule", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        console.log(response.data)
        if (response.data.value == '1') {
          this.CommonServiceData.presentAlert("Your friend request has not been accepted yet.")
        }
        else if (response.data.value == '2') {
          this.openModal = false;
          this.meetUpRequest();
          
        }
        else if (response.data.value == '3') {
          this.openModal = false;
          this.sendVal = 0;
          // this.CommonServiceData.presentToast(response.data.msg)
        }
        else {
          this.CommonServiceData.presentToast("Something went wrong.Please try again later.")
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

  loadCalenderData() {
    this.freeTimming = this.data.freeTime;
  }

  loadInterestData() {
    this.interest = this.data.interest;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsProfilePage');
  }
  friendscalender() {
    this.navCtrl.push("FriendsCalenderPage");
  }

  getFoodImage(val) {
    var data = 'http://192.168.103.85:3002/public/FoodPrefImages/' + val
    return data;
  }

}
