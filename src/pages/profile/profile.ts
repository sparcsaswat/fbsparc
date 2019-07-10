import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController, ToastController, Events } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { CommonService } from '../../utils/commonService';
import { Network } from '@ionic-native/network';
import { Services } from '../../utils/services';
import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Camera } from '@ionic-native/camera';
import { ServiceUrl } from '../../utils/apiConfig';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AppPreferences, Network, Services, DatePipe, Camera, Events]

})
export class ProfilePage {
  activeTab: any = "preferences";
  interest: any[] = [];
  interestArr: any[] = [];
  interestArrData: any[] = [];
  intCount: any = 0;
  userName: any;
  noOfInterest: number = 1;
  countryName: any;
  countryFlag: any;
  bio: any;
  foodPreferenceArr: any[] = [];
  foodPreferenceArray: any[] = [];
  userFreeTimming: any[] = [];
  editedFreeTimming: any[] = [];
  freeTimming: any[] = [];
  imgArr: any[] = [];
  time: number = 1;
  foodImage: any;
  editName: any = "";
  userId: any;
  dateClick: any = 0;
  intFoodCount: any = 0;
  fromDate: any;
  toDate: any;
  toDate1: any;
  minValidationDate: any;
  noOfDateSelected: any[] = [];
  foodPreferenceArrEdit: any[] = [];
  foodPreferenceArrFinal: any[] = [];
  isActive: any[] = [];
  isActive10: any[] = [];
  isActive1: any[] = [];
  isActive2: any[] = [];
  isActive3: any[] = [];
  isActive4: any[] = [];
  isActive5: any[] = [];
  isActive6: any[] = [];
  isActive7: any[] = [];
  isActive8: any[] = [];
  isActive9: any[] = [];
  isActive11: any[] = [];
  isActive12: any[] = [];
  tempArr: any[] = [];
  activeStatus: any = 0;
  selectedDay: any;
  selectedDate: any;
  selectedTime: string;
  flag: number = 0;
  loading: any = '';
  base64Image: any = '';
  base64ImageString: any = '';
  profileImage: any = '';
  appUrl: ServiceUrl;
  imgUrl: any = '';
  imgurl1: any = '';
  buddiesCount: any = '0';
  foodprintCount: any = '0';
  picCaptured: any = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private appPreferences: AppPreferences,
    public alertCtrl: AlertController, public CommonServiceData: CommonService, public events: Events, public network: Network,
    public service: Services, public loadingCtrl: LoadingController, public datePipe: DatePipe, private toastCtrl: ToastController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController) {
    this.appUrl = new ServiceUrl();
    this.imgUrl = this.appUrl.imgURL1;
    this.imgurl1 = this.appUrl.imgURL;


  this.loadPreferncesData();
    this.appPreferences.fetch('', "user_info").then((res) => {
      console.log(JSON.stringify(res.freeTime));
      console.log(res);
      this.currentDate()
      this.userFreeTimming = res.freeTime;
      this.editName = res.name;
      this.userId = res.userId;
      this.interest = res.interest;
      this.bio = res.bio;
      if(res.BuddiesCount!=''&&res.BuddiesCount!=undefined&&res.BuddiesCount!=null)
      {
        this.buddiesCount = res.BuddiesCount;
      }
      else{
        this.buddiesCount='0';
      }
      if(res.FoodPrintCount!=''&&res.FoodPrintCount!=undefined&&res.FoodPrintCount!=null)
      {
        this.foodprintCount = res.FoodPrintCount;
      }
      else{
        this.foodprintCount='0';
      }
      
      // this.foodPreferenceArr = res[0].foodPreference;

      if (res.profilePic != '') {
        this.profileImage = this.imgUrl + res.profilePic;
      }
      else {
        this.profileImage = "";
      }

      if (this.userFreeTimming != null && this.userFreeTimming != undefined && this.userFreeTimming.length > 0) {
        this.fromDate = this.userFreeTimming[0].date;
        this.toDate = this.userFreeTimming[this.userFreeTimming.length - 1].date;
      }


      this.appPreferences.fetch('', "user_countrydata").then((res) => {
        this.countryFlag = res.flagUrl
        this.countryName = res.belongTo

        this.appPreferences.fetch('', "masterData").then((res) => {
          var count = 0
          this.foodPreferenceArray = res.foodPreference
          for (let k = 0; k < this.foodPreferenceArray.length; k++) {
            this.tempArr.push(this.foodPreferenceArray[k].FoodPreferences)
            count++
          }
          if (count == this.foodPreferenceArray.length) {
            this.getFoodImage()
          }
        })
      })
    })

    // this.events.subscribe('onEdit',
    //   () => {
    //     alert('2')
    //     this.editedData();
    //   });

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Import from galley',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  //takePicture is used to get the picture either from camera or from gallery in the form of base64.
  public takePicture(sourceType: any) {
    // Create options for the Camera Dialog
    var currObj = this;
    var options = {
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // outputType: 0

    };

    currObj.loading = currObj.loadingCtrl.create({
      content: 'Please wait...',
    });

    currObj.loading.present();
    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      currObj.enableLocation(imageData, this.loading);
    }, (err) => {
      this.presentToast('Error while selecting image.');
      currObj.loading.dismiss();
    });
  }

  enableLocation(imagePath, loading) {
    var currObj = this;
    this.flag = 1;
    currObj.base64Image = imagePath;
    currObj.base64ImageString = 'data:image/jpeg;base64,';
    currObj.profileImage = currObj.base64ImageString + currObj.base64Image;

    if (loading != null) {
      currObj.loading.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  loadData(activeTabType: any) {
    this.activeTab = activeTabType
    if (activeTabType == 'preferences') {
      this.loadPreferncesData();
    }
    else {
      this.loadInterestData();
    }
  }
  loadPreferncesData() {
    this.appPreferences.fetch('', "user_info").then((res) => {
      this.foodPreferenceArr = res.foodPreference
      console.log(this.foodPreferenceArr)
    })
  }
  loadInterestData() {

  }

  editProfile() {
    this.navCtrl.push("ProfileEditPage")
  }

  getFoodImage() {
    if(this.foodPreferenceArr.length > 0)
    {
      for (let i = 0; i < this.foodPreferenceArr.length; i++) {
        var index = this.tempArr.indexOf(this.foodPreferenceArr[i])
        this.imgArr.push({ "name": this.tempArr[index], "img": this.imgurl1 + this.foodPreferenceArray[index].ImageUrl })
      }
    }
  }

  clearInterest(item, index) {
    this.intCount = 1;
    var currObj = this;
    currObj.interest.splice(index, 1)
    this.interestArr = currObj.interest
  }

  addSevenDays(val) {
    var date = new Date(val);
    var newdate = new Date(date);
    var monthEnum = { "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09", "10": "10", "11": "11", "12": "12" }
    var DateEnum = {
      "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09", "10": "10", "11": "11", "12": "12", "13": "13",
      "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20", "21": "21", "22": "22", "23": "23", "24": "24", "25": "25",
      "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", "31": "31"
    }
    newdate.setDate(newdate.getDate() + 6);

    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();
    var someFormattedDate = y + '-' + monthEnum[mm] + '-' + DateEnum[dd];
    return someFormattedDate;
  }

  /**
* This function used for get current date
* Max and min date also calculated form this function
*/
  currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear() - 18;
    var yyyyNew = today.getFullYear();
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
    this.minValidationDate = yyyyNew + '-' + mmVal + '-' + ddVal;
  }

  todateValue(val) {

    /**
    * For 7 days duration calculation
    */
    // this.fromDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    // this.toDate = this.datePipe.transform(Date.now() + (7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");
    this.toDate = this.addSevenDays(this.fromDate)

    this.dateClick = 1;
    this.toDate = this.addSevenDays(val)
    let count = 0;
    this.noOfDateSelected = this.getDateArray(this.fromDate, this.toDate)
    for (let i = 0; i < this.noOfDateSelected.length; i++) {
      this.isActive10.push({ "activeValue": false, "index": i })
      this.isActive.push({ "activeValue": false, "index": i })
      this.isActive1.push({ "activeValue": false, "index": i })
      this.isActive2.push({ "activeValue": false, "index": i })
      this.isActive3.push({ "activeValue": false, "index": i })
      this.isActive4.push({ "activeValue": false, "index": i })
      this.isActive5.push({ "activeValue": false, "index": i })
      this.isActive6.push({ "activeValue": false, "index": i })
      this.isActive7.push({ "activeValue": false, "index": i })
      this.isActive8.push({ "activeValue": false, "index": i })
      this.isActive9.push({ "activeValue": false, "index": i })
      this.isActive11.push({ "activeValue": false, "index": i })
      this.isActive12.push({ "activeValue": false, "index": i })
      this.selectedDay = this.getDay(this.noOfDateSelected[i])
      this.selectedDate = this.getDate(this.noOfDateSelected[i])

      let obj = {
        "date": this.selectedDate,
        "day": this.selectedDay,
        "dateType": i,
        "ts1": '0', "ts2": '0', "ts3": '0', "ts4": '0', "ts5": '0', "ts6": '0', "ts7": '0', "ts8": '0', "ts9": '0', "ts10": '0', "ts11": '0', "ts12": '0', "ts13": '0'
      }
      this.freeTimming.push(obj)
      count++
    }
    console.log(this.freeTimming);

    if (count == this.noOfDateSelected.length) {
    }
  }

  getDateArray(start, end) {
    var
      arr = new Array(),
      dt = new Date(start);

    var endDt = new Date(end)

    while (dt <= endDt) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  getDay(date) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var dayName = days[date.getDay()];
    return dayName
  }

  getDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  // for 8 AM
  makeInActive10(index) {
    this.isActive10[index].activeValue = false;

    this.freeTimming[index].ts1 = 0
    // alert(JSON.stringify(this.freeTimming))
  }
  makeActive10(index) {
    this.isActive10[index].activeValue = true;
    this.freeTimming[index].ts1 = 1
  }
  getIndex10(index) {
    return index;
  }

  // for 9 AM
  makeInActive(index) {
    this.isActive[index].activeValue = false;

    this.freeTimming[index].ts2 = 0
    // alert(JSON.stringify(this.freeTimming))
  }
  makeActive(index) {
    this.isActive[index].activeValue = true;
    this.freeTimming[index].ts2 = 1
  }
  getIndex(index) {
    return index;
  }

  // for 10 AM
  makeInActive1(index) {
    this.isActive1[index].activeValue = false;
    this.freeTimming[index].ts3 = 0
  }
  makeActive1(index) {
    this.isActive1[index].activeValue = true;
    this.freeTimming[index].ts3 = 1
  }
  getIndex1(index) {
    return index;
  }

  // for 11 AM
  makeInActive2(index) {
    this.isActive2[index].activeValue = false;
    this.freeTimming[index].ts4 = 0
  }
  makeActive2(index) {
    this.isActive2[index].activeValue = true;
    this.freeTimming[index].ts4 = 1
  }
  getIndex2(index) {
    return index;
  }

  // for 12 PM
  makeInActive3(index) {
    this.isActive3[index].activeValue = false;
    this.freeTimming[index].ts5 = 0
  }
  makeActive3(index) {
    this.isActive3[index].activeValue = true;
    this.freeTimming[index].ts5 = 1
  }
  getIndex3(index) {
    return index;
  }

  // for 1 PM
  makeInActive4(index) {
    this.isActive4[index].activeValue = false;
    this.freeTimming[index].ts6 = 0
  }
  makeActive4(index) {
    this.isActive4[index].activeValue = true;
    this.freeTimming[index].ts6 = 1
  }
  getIndex4(index) {
    return index;
  }


  // for 2 PM
  makeInActive5(index) {
    this.isActive5[index].activeValue = false;
    this.freeTimming[index].ts7 = 0
  }
  makeActive5(index) {
    this.isActive5[index].activeValue = true;
    this.freeTimming[index].ts7 = 1
  }
  getIndex5(index) {
    return index;
  }

  // for 3 PM
  makeInActive6(index) {
    this.isActive6[index].activeValue = false;
    this.freeTimming[index].ts8 = 0
  }
  makeActive6(index) {
    this.isActive6[index].activeValue = true;
    this.freeTimming[index].ts8 = 1
  }
  getIndex6(index) {
    return index;
  }

  // for 4 PM
  makeInActive7(index) {
    this.isActive7[index].activeValue = false;
    this.freeTimming[index].ts9 = 0
  }
  makeActive7(index) {
    this.isActive7[index].activeValue = true;
    this.freeTimming[index].ts9 = 1
  }
  getIndex7(index) {
    return index;
  }

  // for 5 PM
  makeInActive8(index) {
    this.isActive8[index].activeValue = false;
    this.freeTimming[index].ts10 = 0
  }
  makeActive8(index) {
    this.isActive8[index].activeValue = true;
    this.freeTimming[index].ts10 = 1
  }
  getIndex8(index) {
    return index;
  }

  // for 6 PM
  makeInActive9(index) {
    this.isActive9[index].activeValue = false;
    this.freeTimming[index].ts11 = 0
  }
  makeActive9(index) {
    this.isActive9[index].activeValue = true;
    this.freeTimming[index].ts11 = 1
  }
  getIndex9(index) {
    return index;
  }

  // for 7 PM
  makeInActive11(index) {
    this.isActive11[index].activeValue = false;
    this.freeTimming[index].ts12 = 0
  }
  makeActive11(index) {
    this.isActive11[index].activeValue = true;
    this.freeTimming[index].ts12 = 1
  }
  getIndex11(index) {
    return index;
  }

  // for 8 PM
  makeInActive12(index) {
    this.isActive12[index].activeValue = false;
    this.freeTimming[index].ts13 = 0
  }
  makeActive12(index) {
    this.isActive12[index].activeValue = true;
    this.freeTimming[index].ts13 = 1
  }
  getIndex12(index) {
    return index;
  }

  editedData() {
    if (this.dateClick == 1) {
      console.log("trueee");

      this.editedFreeTimming = this.freeTimming
    }
    else {
      this.editedFreeTimming = []
    }
    if (this.flag == 1) {
      this.picCaptured = this.profileImage;
    }
    else {
      this.picCaptured = "";
    }

    if (this.intCount == 1) {
      this.interestArrData = this.interestArr
    }
    else {
      this.interestArrData = this.interest
    }

    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });
      loading.present();
      var param = {
        "userId": this.userId,
        "name": this.editName,
        "interest": this.interestArrData,
        "foodPreference": this.foodPreferenceArr,
        "regdType": "U",
        "freeTime": this.editedFreeTimming,
        "bio": this.bio,
        "profilePic": this.picCaptured
      }
      console.log(JSON.stringify(param));
      this.service.fetchCommonData("registerUser", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        console.log(response.data.output);

        if (response.data.status == 200) {
          var setData;
          if(response.data.output[0].freeTime.length>0)
          {
            setData = response.data.output[0]
          }
          else{
            response.data.output[0].freeTime = this.userFreeTimming;
            setData = response.data.output[0]
          }
          
          this.appPreferences.store('', "user_info", setData).then((data) => {
            this.flag = 0;
            this.foodPreferenceArr = response.data.output[0].foodPreference;
            this.userFreeTimming = this.userFreeTimming;
            this.editName = response.data.output[0].name
            this.userId = response.data.output[0].userId
            this.interest = response.data.output[0].interest;
            this.bio = response.data.output[0].bio;
            if(response.data.output[0].profilePic != "")
            {
              this.profileImage = this.imgUrl + response.data.output[0].profilePic;
            }
            this.getFoodImage();
          })
          this.CommonServiceData.presentAlert("Profile updated successfully.");

        }
        else if (response.data.status == 201) {
          this.CommonServiceData.presentToast(response.data.msg)
        }
        else {
          this.CommonServiceData.presentToast("Something went wrong.Please try again later!");
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

  clearFoodPref(item, index) {
    this.intFoodCount = 1;
    var currObj = this;
    if (this.imgArr.length > 3) {
      currObj.imgArr.splice(index, 1)
      currObj.foodPreferenceArrEdit = currObj.imgArr
      console.log(currObj.foodPreferenceArrEdit);
    }
    else {
      this.CommonServiceData.presentToast('You rechead the minimum food preference limit')
    }
  }

  ionViewDidEnter() {
    this.appUrl = new ServiceUrl();
    this.imgUrl = this.appUrl.imgURL1;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
