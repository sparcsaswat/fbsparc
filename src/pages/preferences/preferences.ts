import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CommonService } from '../../utils/commonService';
import { Network } from '@ionic-native/network';
import { Services } from '../../utils/services';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AppPreferences } from '@ionic-native/app-preferences';
// import * as _ from 'lodash';
import * as $ from "jquery";
import { ServiceUrl } from '../../utils/apiConfig';

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
  providers: [Network, Services, AppPreferences]
})
export class PreferencesPage {
  userDetails: any;
  interest: any[] = [];
  interestArr: any[] = [];
  countryName: any;
  userInfo: any = [];
  countryData: any[] = [];
  interestArray = [];
  // countryName: any[] = [];
  countryFlag: any;
  foodPreferenceArr: any = [];
  foodPreferenceData: any[] = [];
  courses: any[] = [];
  userCourses: any[] = [];
  userSubCourse: any[] = [];
  filterSubcourseData: any = [];
  courseDataArr: any = []
  subCourseData: any = []
  subCoursesData: any[] = [];
  checked: number = 0;
  appUrl: ServiceUrl;
  imgUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CommonServiceData: CommonService
    , public network: Network, public service: Services, private appPreferences: AppPreferences, public loadingCtrl: LoadingController) {

    this.appUrl = new ServiceUrl();
    this.imgUrl = this.appUrl.imgURL;

    this.appPreferences.fetch('', "masterData").then((res) => {
      this.courseDataArr = res.courses
      this.foodPreferenceArr = res.foodPreference
      this.interestArray = res.intrest
      console.log(this.foodPreferenceArr);
      
    })

    this.userInfo = this.navParams.data.userInfo
    // this.interestArray = this.navParams.data.userInfo.interestArray.data
    this.service.fetchCommonGetData("getCountries").then(response => {
      response.data = JSON.parse(response.data)
      if (response.data.status == 200) {
        this.countryData = response.data.output
      }
      else {
        this.CommonServiceData.showAlert(response.error)
      }
    })
      .catch(error => {
        console.log(error)
        this.CommonServiceData.showAlert('Something went wrong . Please try after sometime.')
      })
  }

  getSubcourses(val) {
    if (this.userCourses.length <= 5) {
      var currObj = this;
      var loading = this.loadingCtrl.create({
        content: 'Please wait fetching subcourse data..',
        spinner: 'crescent',
      });
      loading.present();
  
      var param = {
        "courseId": val
      }
  
      this.service.fetchCommonData("getSubCourseList", param).then(response => {
        response.data = JSON.parse(response.data)
        console.log("sub courses" + response.data);
  
        if (response.data.status == 200) {
          currObj.subCourseData = response.data.output
        }
        else {
          currObj.subCourseData = []
          currObj.CommonServiceData.presentToast(response.error)
        }
        loading.dismiss();
      })
        .catch(error => {
          currObj.subCourseData = []
          loading.dismiss();
          currObj.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
        })
    }
    else{
      this.CommonServiceData.presentToast("You cann't select more than 5 courses.")
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PreferencesPage');
    $(document).ready(function () {
      $('.header').on('click', '.img-wrapper', function () {
        $(this).toggleClass('active');
        $(this).find('button').toggle();
      });
    });
  }

  onChangeInterest() {
    var currObj = this;
    this.interestArr = [];
    if (this.interest.length != 0) {
      for (let i = 0; i < this.interest.length; i++) {
        currObj.interestArr.push(this.interest[i])
      }
    }
    else {
      this.interestArr = [];
    }
  }

  clearInterest(item, index) {
    var currObj = this;
    currObj.interest.splice(index, 1)
    if (currObj.interestArr.length == 0) {
      this.interest = [];
    }
  }
  portChange(event: { component: IonicSelectableComponent, value: any }) {
    // console.log('port:', event.value);
    this.countryName = event.value.name;
    this.countryFlag = event.value.Url;
  }
  getData(code) {
    var data = 'https://lipis.github.io/flag-icon-css/flags/4x3/' + code.toLowerCase() + '.svg'
    return data;
  }

  getFoodImage(val) {
    var data = this.imgUrl + val
    return data;
  }

  foodPref(foodData) {
    var currObj = this
    var index = currObj.foodPreferenceData.findIndex(x => x === foodData)
    console.log(index)
    if (index == -1) {
      this.foodPreferenceData.push(foodData)
    }
    console.log(this.foodPreferenceData)
  }
  // foodPrefCheck(foodId) {
  //   for (let j = 0; j < this.foodPreferenceArr.length; j++) {
  //     if (foodId == this.foodPreferenceArr[j].FoodPrefId) {
  //       this.checked = 1
  //     }
  //     else {
  //       this.checked = 0
  //     }
  //   }
  // }

  gotToCalender() {
    console.log(this.userCourses);

    if (this.network.type != 'none' && this.network.type != 'unknown') {
      if (this.foodPreferenceData.length >= 3) {
        if (this.userCourses.length <= 5) {
          if (this.userSubCourse.length != 0) {
            if (this.interest.length >= 3) {
              if (this.countryName != undefined) {
                var prefData = {
                  "userInfo": this.userInfo,
                  "interest": this.interestArr,
                  "belongTo": this.countryName,
                  "flagUrl": this.countryFlag,
                  "foodPreference": this.foodPreferenceData,
                  "userCourses": this.userCourses,
                  "userSubCourse": this.userSubCourse
                }
                console.log(prefData);

                this.navCtrl.push("CalenderPage", { "preferenceData": prefData })
              }
              else {
                this.CommonServiceData.presentToast('Please mention where you belong ?');
              }
            }
            else {
              this.CommonServiceData.presentToast('Please mention atleast 3 interest');
            }
          }
          else {
            this.CommonServiceData.presentToast('Please select a subcourse')
          }
        }
        else if(this.userCourses.length == 0){
          this.CommonServiceData.presentToast('Please select a courses')
        }
        else {
          this.CommonServiceData.presentToast('Please select maximum 5 courses')
        }
      }
      else {
        this.CommonServiceData.presentToast('You have to set atleast 3 food preferences')
      }
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }
}

