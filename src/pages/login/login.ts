import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CommonService } from '../../utils/commonService';
import { Network } from '@ionic-native/network';
import { Md5 } from 'ts-md5/dist/md5';
import { Services } from '../../utils/services';
import { AppPreferences } from '@ionic-native/app-preferences';
import { HomePage } from '../home/home';
import { Validator } from '../../utils/validator';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Validator, Network, AppPreferences, Services]
})
export class LoginPage {
  emailId: any = '';
  password: any = '';
  password_type: string = 'password';

  constructor(public navCtrl: NavController, public navParams: NavParams, public validator: Validator, public CommonServiceData: CommonService,
    public network: Network, public loadingCtrl: LoadingController, public service: Services, private appPreferences: AppPreferences) {
    this.getMasterData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // Fetching master data here

  getMasterData() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {
      var loading = this.loadingCtrl.create({
        content: 'Please wait..',
        spinner: 'crescent',
      });
      loading.present();
      this.service.fetchCommonGetData("getAllMasterData").then(response => {
        loading.dismiss();
        response.data = JSON.parse(response.data)
        if (response.data.status == 200) {
          this.appPreferences.store('', 'masterData', response.data.output).then(() => {
          })

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

  // login function 

  login() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {
      if (this.validate() == true) {
        var finalPassword = Md5.hashStr(this.password);
        var loading = this.loadingCtrl.create({
          content: 'Please wait..',
          spinner: 'crescent',
        });
        loading.present();
        var param = {
          "email": this.emailId,
          "password": finalPassword.toString().toUpperCase()
        }

        console.log(param);

        this.service.fetchCommonData("loginUser", param).then(response => {
          loading.dismiss();
          response.data = JSON.parse(response.data)

          console.log(response.data)
          if (response.data.status == 200) {
            this.appPreferences.store('', 'user_info', response.data.output[0]).then(() => {
            })
            this.appPreferences.store('', 'user_countrydata', response.data.output[0]).then(() => {
            })
            this.navCtrl.push("MenuTabPage");
          }
          else {
            this.CommonServiceData.presentToast(response.data.msg);
          }
        })
          .catch(error => {
            console.log(error)
            loading.dismiss();
            this.CommonServiceData.presentToast('Something went wrong . Please try after sometime.')
          });
      }
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }

  register() {
    this.navCtrl.push("RegisterPage");
  }

  togglePasswordMode() {
    if (this.password_type == 'text') {
      this.password_type = "password";
    }
    else {
      this.password_type = "text";
    }
  }

  validate() {
    if (this.validator.validEmail(this.emailId, 0) == true
      && this.validator.inputNumberTxt(this.password, '', 4, 15, '', 0) == true
    ) {
      return true;
    }
    else {
      if (this.validator.validEmailMsg(this.emailId, "Email Id cann't be left blank", 'Please enter a valid email Id', 0) == false) {
        return false;
      }
      else if (this.validator.inputNumberTxtMsg(this.password, 'Password field cannot be left blank', 5, 15, 'Password', 0) == false) {
        return false;
      }
    }
  }
}
