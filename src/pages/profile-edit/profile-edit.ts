import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Network } from '@ionic-native/network';
import { Services } from '../../utils/services';
import { CommonService } from '../../utils/commonService';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
  providers: [AppPreferences, Network, Services, DatePipe]
})
export class ProfileEditPage {
  interest: any[] = [];
  foodPreference: any[] = [];
  userId: any;
  userName: any;
  countryName: any;
  bio: any='';
  countryFlag: any;
  editName:any="";

  fromDate: any;
  toDate: any;
  toDate1: any;
  minValidationDate: any;
  noOfDateSelected: any[] = []
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
  activeStatus: any = 0;
  selectedDay: any;
  selectedDate: any;
  selectedTime: string;
  freeTimming: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private appPreferences: AppPreferences,
    public CommonServiceData: CommonService, public network: Network, public service: Services, public loadingCtrl: LoadingController, 
    public datePipe: DatePipe) {

      this.appPreferences.fetch('', "user_countrydata").then((res) => {
        this.countryFlag = res.flagUrl
        this.countryName = res.belongTo
      })

    this.appPreferences.fetch('', "user_info").then((res) => {
      this.editName = res.name
      this.userId = res.userId
      this.interest = res.interest
      this.bio=res.bio
    })

     /**
    * For 7 days duration calculation
    */
   this.toDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
   this.fromDate = this.datePipe.transform(Date.now() + (6 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");
   this.currentDate()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  clearInterest(item, index) {
    var currObj = this;
    currObj.interest.splice(index, 1)
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

todateValue() {
  let count = 0;
  this.noOfDateSelected = this.getDateArray(this.minValidationDate, this.toDate1)
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
      "ts1": '0', "ts2": '0', "ts3": '0', "ts4": '0', "ts5": '0', "ts6": '0', "ts7": '0', "ts8": '0', "ts9": '0', "ts10": '0', "ts11": '0', "ts12": '0', "ts13": '0'
    }
    this.freeTimming.push(obj)
    count++
  }
  if (count == this.noOfDateSelected.length) {
    // alert(JSON.stringify(this.freeTimming))
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
    console.log("data save");
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });
      loading.present();
      var param = {
        "userId":this.userId,
        "name": this.editName,
        "interest": this.interest,
        "foodPreference": this.foodPreference,
        "bio": this.bio,
        "regdType": "U",
        "freeTime":this.freeTimming
      }

      console.log(JSON.stringify(param));
      // this.appPreferences.store('', 'userRegisterData', param).then(() => { })

      this.service.fetchCommonData("registerUser", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        console.log(response.data);
        this.appPreferences.store('','user_info',param).then(()=>{
        })
        this.navCtrl.pop();
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
