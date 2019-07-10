import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Network } from '@ionic-native/network';
import { Services } from '../../utils/services';
import { CommonService } from '../../utils/commonService';
import { Geolocation } from '@ionic-native/geolocation';
import { ServiceUrl } from '../../utils/apiConfig';
declare var google: any;


@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
 providers: [AppPreferences, Network, Services, Geolocation]
})
export class ExplorePage {
  loading: Loading;
  latitudelongitude: any = "";
  lat: any = '';
  long: any = '';
  activeTab: any = '';
  interest: any[] = [];
  interestData: any[] = []
  currentAddress: string;
  map: any = null;
  loginData: any = '';
  totalInterestData: any = '';
  restaurantList: any = [];
  restaurantData: any = [];
  foodPreferences: any = [];
  restaurantDetails: any = [];
  foodTypeArray: any = [];
  foodCuisine: any = [];
  appUrl: ServiceUrl;
  imgUrl: any = '';
  restaurantId: any = '';
  fromPage:any='';

  constructor(private geolocation: Geolocation,
    public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    public network: Network,
    public loadingCtrl: LoadingController,
    public service: Services,
    public CommonServiceData: CommonService
  ) {

    this.appUrl=new ServiceUrl();
    this.imgUrl=this.appUrl.imgURL;
    this.fromPage=this.navParams.data.fromPage;
    if(this.fromPage=="homePage")
    {
      this.activeTab="places";
    }
    else{
      this.activeTab="people";
    }
    
    this.loadPeopleData();
    this.getCurrentLocation();
    /*****
            **** This function is called for user_info  Preferences Data   ****
    ****/
    this.appPreferences.fetch('', "user_info").then((res) => {
      this.loginData = res;
      this.interest = res.interest
      if (res.interest.length == 0) {
        this.appPreferences.fetch('', "user_countrydata").then((res1) => {
          this.interest = res1.interest
          this.friendList()
        })
      }
      else {
        this.interest = res.interest
        this.friendList()
      }
    })

    this.appPreferences.fetch('', "masterData").then((res) => {
      this.restaurantList = res.resturants;
      this.foodPreferences = res.foodPreference;
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

      console.log(this.restaurantData);
    })
  } // constructor Funnction End here.


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

          for (let i = 0; i < this.restaurantDetails.length; i++) {
            if (restaurantId == this.restaurantDetails[i].ResturantId) {
              this.foodCuisine = this.restaurantDetails[i].foodPref;
            }
          }

          console.log('foodcuisine');
          console.log(this.foodCuisine);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
  }

  loadData(activeTabType: any) {
    this.activeTab = activeTabType
    if (activeTabType == 'people') {
      this.loadPeopleData();
      this.getCurrentLocation();
    }
    else {
      this.loadPlacesData();
    }
  }
  /*****
          **** This function is called for LoadPeople  Data   ****
  ****/
  loadPeopleData() {

  }


  goToProfileInfo(id) {
    if (this.network.type != 'none' && this.network.type != 'unknown') {

      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });

      loading.present();
      var param = {
        "friendUid": id,
        "userId":this.loginData.userId
      }
      console.log(param);

      this.service.fetchCommonData("getFriendsProfileDetails", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        if (response.data.status == 200) {
         // alert(response.data.status)
          this.navCtrl.push('FriendsProfilePage', { "detail": response.data.output, "friendUserId": id, "restaurantData": this.restaurantData })
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

  /*****
          **** This function is called for LoadPlace  Data   ****
  ****/
  loadPlacesData() {

  }
  /*****
          **** This function is called for Quick Connect Page   ****
  ****/

  connect() {
    this.navCtrl.push("QuickConnectPage", { "friendlistData": this.interestData });
  }

  /*****
          **** This function is called for get  Friends List Data   ****
  ****/
  friendList() {
    // alert('1')
    if (this.network.type != 'none' && this.network.type != 'unknown') {
      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });
      loading.present();
      var param = {
        "interest": this.interest,
        "userId": this.loginData.userId
      }
      console.log(JSON.stringify(param));

      this.service.fetchCommonData("getFriendsList", param).then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        if (response.data.status == 200) {

          console.log("200  " + this.interestData);

          this.interestData = response.data.output
          this.totalInterestData = this.interestData.length;
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



  /*****
          **** This function is called for get Current Location Data   ****
  ****/
  getCurrentLocation() {
    //await this.platform.ready();
    this.latitudelongitude = "";
    this.lat = "";
    this.long = "";
    var currObj = this;
    // this.loading = this.loadingCtrl.create({
    //   content: "Fetching location..."
    // });
    // this.loading.present();
    this.geolocation
      .getCurrentPosition({
        timeout: 40000,
        enableHighAccuracy: true,
        maximumAge: 0
      })
      .then(resp => {
        currObj.lat = resp.coords.latitude;
        currObj.long = resp.coords.longitude;
        var myLatLng = { lat: currObj.lat, lng: currObj.long };
        // alert(this.lat+"---"+this.long)
        setTimeout(function () {
          //  alert("111")
          var map = new google.maps.Map(document.getElementById("googleMap"), {
            zoom: 14,
            center: myLatLng,
            disableDefaultUI: true
          });


          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "Click to zoom"
          });

          currObj.GetAddress(currObj.lat, currObj.long, marker);


        });

        //this.loading.dismiss();
      })
      .catch(error => {
        // this.loading.dismiss();
        currObj.lat = "";
        currObj.long = "";
        this.latitudelongitude = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // alert("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            // alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            // alert("Unable to start geolocation. Check application settings.");
            break;
        }
      });
  }

  /*****
          **** This function is called for get Address Location Data   ****
  ****/
  GetAddress(lattitude, longitude, marker) {
    var currObj = this;
    var lat = parseFloat(lattitude);
    var lng = parseFloat(longitude);
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      // console.log(JSON.stringify(results))
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          currObj.currentAddress = results[0].address_components[0].long_name;
          var content = "<div style='min-width: 160px;max-width: 250px;'><p>" + currObj.currentAddress + "\n </p></div>"
          let infoWindow = new google.maps.InfoWindow({
            content: content
          });

          google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(currObj.map, marker);
          });
        }
      }
    });
  }
}