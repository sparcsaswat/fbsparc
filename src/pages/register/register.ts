import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Md5 } from 'ts-md5/dist/md5';
import { Services } from '../../utils/services';
import { CommonService } from '../../utils/commonService';
import { Validator } from '../../utils/validator';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [Validator, Network, Services]
})
export class RegisterPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  userName: any='';
  emailId: any='';
  password: any='';
  confPassword: any='';
  password_type: string = 'password';
  password_type1: string = 'password';
  // interestArray: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public validator: Validator,
    public CommonServiceData: CommonService, public network: Network, public service: Services, public loadingCtrl: LoadingController) {
      this.lottieConfig = {
        path: 'assets/icon/loader.json',
        autoplay: true,
        loop: false
    };
  }
  stop() {
    this.anim.stop();
}

play() {
    this.anim.play();
}

pause() {
    this.anim.pause();
}

setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  getText(e) {
    this.userName = this.userName.replace(/[^a-zA-Z\s]/g, "")
    if (this.userName == '^' || this.userName == '_') {
      this.userName = this.userName.substring(0, this.userName.length - 1)
    }
  }
  back() {
    this.navCtrl.pop();
  }

  validateUser() {
    if (this.network.type != 'none' && this.network.type != 'unknown') {
      if (this.validate() == true) {
        if (this.password == this.confPassword) {
          var finalPassword = Md5.hashStr(this.password);
          var finalConfPassword = Md5.hashStr(this.confPassword);
          var loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent',
          });
          loading.present();

          var param = {
            "email": this.emailId,
          }

          this.service.fetchCommonData("validateEmail", param).then(response => {
            loading.dismiss();
            response.data = JSON.parse(response.data)
            // this.interestArray = response.data.output

            if (response.data.status == 200) {

              var userInfo = {
                "userName": this.userName,
                "emailId": this.emailId,
                "password": finalPassword.toString().toUpperCase(),
                "confPassword": finalConfPassword.toString().toUpperCase(),
                // "interestArray": this.interestArray
              }
              this.navCtrl.push("PreferencesPage", { "userInfo": userInfo })
            }
            else if (response.data.status == 201) {
              this.CommonServiceData.presentToast('This email id is already exist')
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
          this.CommonServiceData.presentToast('Password and Confirm Password should be same');
        }
      }
    }
    else {
      this.CommonServiceData.presentToast('Please check your network connection')
    }
  }
  togglePasswordMode() {
    if (this.password_type == 'text') {
      this.password_type = "password";
    }
    else {
      this.password_type = "text";
    }
  }
  togglePasswordMode1() {
    if (this.password_type1 == 'text') {
      this.password_type1 = "password";
    }
    else {
      this.password_type1 = "text";
    }
  }

  validate() {
    if (this.validator.inputNameOnly(this.userName, '', 4, 20, '', 0) == true
      && this.validator.validEmailUbc(this.emailId,0) == true
      && this.validator.inputNumberTxt(this.password, '', 3, 15, '', 0) == true
      && this.validator.inputNumberTxt(this.confPassword, '', 3, 15, '', 0) == true) {
      return true;
    }
    else {
      if (this.validator.inputNameOnlyMsg(this.userName, 'Please enter Name', 4, 20, 'User Name', 0) == false) {
        return false;
      }
      else if (this.validator.validEmailUbcMsg(this.emailId, "Email Id cann't be left blank",'Please enter a valid email Id',0) == false) {
        return false;
      }
      else if (this.validator.inputNumberTxtMsg(this.password, 'Password field cannot be left blank', 3, 15, 'Password', 0) == false) {
        return false;
      }
      else if (this.validator.inputNumberTxtMsg(this.confPassword, 'Confirm password field cannot be left blank', 3, 15, 'Confirm Password', 0) == false) {
        return false;
      }
    }
  }
}
