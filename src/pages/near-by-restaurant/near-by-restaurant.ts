import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Network } from '@ionic-native/network';
import { Services } from '../../utils/services';
import { CommonService } from '../../utils/commonService';
import { ServiceUrl } from '../../utils/apiConfig';

/**
 * Generated class for the NearByRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-near-by-restaurant',
  templateUrl: 'near-by-restaurant.html',
  providers: [AppPreferences, CommonService, Network, Services]
})
export class NearByRestaurantPage {
  restaurantList: any = [];
  restaurantData: any = [];
  foodPreferences: any = [];
  restaurantDetails: any = [];
  foodTypeArray: any = [];
  foodCuisine: any = [];
  appUrl: ServiceUrl;
  imgUrl: any = '';
  restaurantId: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    public network: Network,
    public CommonServiceData: CommonService,
    public service: Services
  ) {

    this.appUrl = new ServiceUrl();
    this.imgUrl = this.appUrl.imgURL;

    this.appPreferences.fetch('', "masterData").then((res) => {
      this.restaurantList = res.resturants;
      this.foodPreferences = res.foodPreference;
      console.log("restaurant list");
      console.log(this.restaurantList);

      for (let i = 0; i < this.restaurantList.length; i++) {

        if (i == 0) {
          this.getFoodType(this.restaurantList[i].ResturantId);
        }

        if (this.restaurantList[i].Coordinates != '' || this.restaurantList[i].Coordinates != undefined || this.restaurantList[i].Coordinates != null) {
          var d = this.getDistanceFromLatLonInKm(this.restaurantList[i].Coordinates);
          console.log("distance" + d);
          if (d <= 1) {
            this.restaurantData.push(this.restaurantList[i]);
          }
        }
      }
      console.log("restaurant data");
      console.log(this.restaurantData);
    })

  }

  onFoodTypeChange(id) {
    this.restaurantId = id;
    this.getFoodType(this.restaurantId)
  }

  getFoodType(restaurantId) {
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      this.CommonServiceData.presentLoading("Please wait...", 4000);

      var param = { "resturantId": restaurantId };
      console.log(param);

      this.service.fetchCommonData("getResurantRelatedCuisine", param).then(response => {
        this.CommonServiceData.dismissLoading();
        response.data = JSON.parse(response.data)

        if (response.data.status == 200) {
          this.restaurantDetails = response.data.output;
          console.log("cuisine")
          console.log(this.restaurantDetails);

          for (let i = 0; i < this.restaurantDetails.length; i++) {
            if (restaurantId == this.restaurantDetails[i].ResturantId) {
              this.foodCuisine = this.restaurantDetails[i].foodPref;
            }
          }
        }
        else {
          this.CommonServiceData.presentToast(response.error)
        }
      })
        .catch(error => {
          console.log(error)
          this.CommonServiceData.dismissLoading();
          this.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
        });
    }

    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }

  getDistanceFromLatLonInKm(coordinate) {
    var R = 6371; // Radius of the earth in km
    console.log('........................')
    console.log(coordinate)
    var latitudeLongitude = coordinate.split(',');
    var lat = latitudeLongitude[0];
    var lon = latitudeLongitude[1];
    console.log(lat + "," + lon);
    var dLat = this.deg2rad(lat - 49.261251); // deg2rad below
    var dLon = this.deg2rad(lon - -123.250745);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat)) *
      Math.cos(this.deg2rad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;

  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NearByRestaurantPage');
  }

}
