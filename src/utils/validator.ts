import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { CommonService } from './commonService';
@Injectable()
export class Validator {
    constructor(public toastCtrl: ToastController, private alertCtrl: AlertController, private CommonServiceData: CommonService) { //,private nav1:NavController

        //this.nav=nav1
    }
    blankfieldValidation(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    blankfieldValidationMsg(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }
    
    dropDownValidation(val, msg) {
        var isvalid: boolean = false;
        if (val == '' || val == undefined) {
            isvalid = false;
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    dropDownValidationMsg(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == ''|| val == undefined || val == '0') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    dropDownValidationMsg2(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    dropDownValidationMsg3(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    dropDownValidationMsg4(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    dropDownValidationMsg5(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }

    dropDownValidationMsg6(val, msg, mandatoryStatus) {
        var isvalid: boolean = false;
        if (mandatoryStatus == 0) {
            if (val == '') {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            isvalid = true;
        }
        return isvalid
    }
    inputIdentityOnly(val, msg, type, optional) {
        var isvalid: boolean = false;
        var actualminLength
        var actualmmaxLength
        if (type == '1') {
            actualminLength = 12
            actualmmaxLength = 12
        }
        else if (type == '2') {
            actualminLength = 10
            actualmmaxLength = 10
        }
        else if ( type == '3') {
            actualminLength = 10
            actualmmaxLength = 10
        }

        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                // this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
            return isvalid
        }
        else {
            if (type == '1' && val.length!=12) {
                isvalid = false;
                // this.presentToast(name + ' should be atleast ' + actualminLength + ' character')
            }
            else  if ((type == '2' && val.length!=10) || (type == '3' && val.length!=10)) {
                isvalid = false;
                // this.presentToast(name + ' should be atleast ' + actualminLength + ' character')
            }
            
            else {
                isvalid = true;
            }
         
        }

        return isvalid
    }
    inputIdentityOnlyMsg(val, msg, type, optional) {
        var isvalid: boolean = false;
        var actualminLength
        var actualmmaxLength
        // alert(val+'==========================='+val.length)
        var name
        if (type == '1') {
            actualminLength = 12
            actualmmaxLength = 12
            name="Adhar card number"
        }
        else if (type == '2') {
            actualminLength = 10
            actualmmaxLength = 10
            name="Pan card Number"
        }
        else if ( type == '3') {
            actualminLength = 10
            actualmmaxLength = 10
            name="VoterId card Number"
        }
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                this.presentToast(name+' '+msg)
            }
            else {
                isvalid = true;
            }
            return isvalid

        }
        else {
            if (type == '1' && val.length!=12) {
                isvalid = false;
                this.presentToast(name + ' should be atleast ' + actualminLength + ' character')
            }
            else  if ((type == '2' && val.length!=10) || (type == '3' && val.length!=10)) {
                isvalid = false;
                this.presentToast(name + ' should be atleast ' + actualminLength + ' character')
            }
            
            else {
                isvalid = true;
            }
         
        }

        return isvalid
    }

    inputNameOnly(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_name = /^[a-zA-Z ]+$/;
        if (val == '' || val == undefined) {
            //  this.CommonServiceData.presentToast(msg)
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                // this.presentToast('Length should greater than '+minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                // this.presentToast('Length should less than '+maxLength)
            }
            else {
                var chkStatus = ck_name.test(val)
                if (chkStatus == true) {
                    if (this.checkBeginningWhiteSpace(val) == true) {
                        isvalid = false;
                    }
                    else {
                        isvalid = true;
                    }

                }
                else {
                    isvalid = false;
                    // this.presentToast(msg)
                }

            }
        }

        return isvalid
    }
    inputNameOnlyMsg(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_name = /^[a-zA-Z ]+$/;
        if (val == '' || val == undefined) {
            this.presentToast(msg)
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                this.presentToast(name + ' should be atleast ' + minLength + ' character')
            }
            else if (maxLength < val.length) {
                isvalid = false;
                this.presentToast(name + ' should not be greater than ' + maxLength + ' character')
            }
            else {
                var chkStatus = ck_name.test(val)
                if (chkStatus == true) {
                    if (this.checkBeginningWhiteSpace(val) == true) {
                        isvalid = false;
                        this.presentToast('Please enter a valid ' + name)
                    }
                    else {
                        isvalid = true;
                    }

                }
                else {
                    isvalid = false;
                    this.presentToast('Please enter a valid ' + name)
                }

            }
        }

        return isvalid
    }
    checkBeginningWhiteSpace(str) {
        return /^\s/.test(str);
    }
    inputNumberOnly(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /^\d+$/;
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                // this.CommonServiceData.showAlert(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                // this.CommonServiceData.showAlert(name + ' should be atleast ' + minLength + ' digit')
            }
            else if (maxLength < val.length) {
                isvalid = false;
                // this.CommonServiceData.showAlert(name + ' should not be greater than ' + maxLength + ' digit')
            }
            else {
                var chkStatus = ck_number.test(val)
                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    isvalid = false;
                }

            }
        }

        return isvalid
    }
    inputNumberOnlyMsg(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /^\d+$/;
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                this.presentToast(msg);
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                this.presentToast(name + ' should be atleast ' + minLength + ' digit')
            }
            else if (maxLength < val.length) {
                isvalid = false;
                this.presentToast(name + ' should not be greater than ' + maxLength + ' digit')
            }
            else {
                var chkStatus = ck_number.test(val)
                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    this.presentToast('Please enter a valid ' + name)
                    isvalid = false;
                }

            }
        }

        return isvalid
    }
    inputNumberTxt(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /[A-Za-z0-9]$/;
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                // this.CommonServiceData.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                // this.CommonServiceData.presentToast('Length should not less than ' + minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                // this.CommonServiceData.presentToast('Length should less than ' + maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)
                if (chkStatus == true) {
                    isvalid = true;
                    //this.presentToast('correct')
                }
                else {
                    isvalid = false;
                    // this.CommonServiceData.presentToast(msg)
                }
            }
        }

        return isvalid
    }

    inputNumberTxt1(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /[a-zA-Z0-9_ ]+.*\$.*$/;
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                // this.CommonServiceData.presentToast('Remark can not be left blank')
            }
            else if (maxLength < val.length) {
                isvalid = false;
                // this.CommonServiceData.presentToast('Length should less than '+maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)
                if (chkStatus == true) {
                    isvalid = true;
                    //this.presentToast('correct')
                }
                else {
                    isvalid = false;
                    // this.CommonServiceData.presentToast('Please enter a valid input')
                }
            }
        }

        return isvalid
    }

    inputNumberTxtMsg(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /[A-Za-z0-9]$/;
        if (val == '') {
            this.presentToast(msg)
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                this.presentToast(name + ' length should be atleast ' + minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                this.presentToast(name + ' length should not be greater than ' + maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)
                //console.log(chkStatus)
                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    isvalid = false;
                    this.presentToast('Please enter a valid ' + name)
                }

            }
        }

        return isvalid
    }
    inputDecimalOnly(val, msg, minLength, maxLength, name, optional) {
        //var regexp = /^\d+(\.\d{1,2})?$/i;
        var isvalid: boolean = false;
        var ck_number = /^\d+(\.\d{1,2})?$/i;
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                //this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                //this.presentToast('Length should greater than '+minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                //this.presentToast('Length should less than '+maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)
                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    //this.presentToast('Please enter a valid number')
                    isvalid = false;
                }

            }
        }

        return isvalid
    }
    inputDecimalOnlyMsg(val, msg, minLength, maxLength, name, optional) {
        //var regexp = /^\d+(\.\d{1,2})?$/i;
        var isvalid: boolean = false;
        var ck_number = /^\d+(\.\d{1,2})?$/i;
        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                this.presentToast(name + ' value should be greater than or equals to ' + minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                this.presentToast(name + ' value should be less than or equals to ' + maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)

                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    this.presentToast('Please enter a valid ' + name)
                    isvalid = false;
                }

            }
        }

        return isvalid
    }
    inputPlusMinus(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /[+-]$/;
        if (val == '') {
            if (optional == 0) {
                isvalid = false;
                //this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                //this.presentToast(name+' length should atleast '+minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                //this.presentToast(name+' length should not greater than '+maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)
                //console.log(chkStatus)
                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    isvalid = false;
                    //this.presentToast('Please enter a valid '+name)
                }

            }
        }

        return isvalid
    }
    inputPlusMinusMsg(val, msg, minLength, maxLength, name, optional) {
        var isvalid: boolean = false;
        var ck_number = /[+-]$/;
        if (val == '') {
            if (optional == 0) {
                isvalid = false;
                this.presentToast(msg)
            }
            else {
                isvalid = true;
            }
        }
        else {
            if (minLength > val.length) {
                isvalid = false;
                this.presentToast(name + ' length should atleast ' + minLength)
            }
            else if (maxLength < val.length) {
                isvalid = false;
                this.presentToast(name + ' length should not greater than ' + maxLength)
            }
            else {
                var chkStatus = ck_number.test(val)
                //console.log(chkStatus)
                if (chkStatus == true) {
                    isvalid = true;
                }
                else {
                    isvalid = false;
                    this.presentToast('Please enter a valid ' + name)
                }

            }
        }

        return isvalid
    }
    // validEmail(val) {
    //     var isvalid: boolean = false;
    //     var patternText = /^[A-Za-z0-9\-_\.]+@+[A-Za-z0-9\-\.]+\.+[A-Za-z]{2,10}$/;
    //     if (patternText.test(val)) {
    //         isvalid = true;
    //     }
    //     else {
    //         isvalid = false;
    //     }
    //     return isvalid
    // }

    validEmail(val,optional) {
        var isvalid: boolean = false;
        var patternText = /^[A-Za-z0-9\-_\.]+@+[A-Za-z0-9\-\.]+\.+[A-Za-z]{2,10}$/;

        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else
        {
            if (patternText.test(val)) {
                isvalid = true;
            }
            else {
                isvalid = false;
            }
        }
        return isvalid
    }

    validEmailUbc(val,optional) {
        var isvalid: boolean = false;
        var patternText = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ubc|ubc)\.(com|ca)$/;

        if (val == '' || val == undefined) {
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else
        {
            if (patternText.test(val)) {
                isvalid = true;
            }
            else {
                isvalid = false;
            }
        }
        return isvalid
    }

    // validEmailMsg(val, msg) {
    //     var isvalid: boolean = false;
    //     var patternText = /^[A-Za-z0-9\-_\.]+@+[A-Za-z0-9\-\.]+\.+[A-Za-z]{2,10}$/;
    //     if (patternText.test(val)) {
    //         isvalid = true;
    //     }
    //     else {

    //         isvalid = false;
    //     }
    //     return isvalid
    // }

    validEmailMsg(val,msg, msg1, optional) {
        var isvalid: boolean = false;
        var patternText = /^[A-Za-z0-9\-_\.]+@+[A-Za-z0-9\-\.]+\.+[A-Za-z]{2,10}$/;
        if (val == '') {
            this.presentToast(msg)
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else
        {
            if (patternText.test(val)) {
                isvalid = true;
            }
            else {
                isvalid = false;
                this.presentToast(msg1)
            }
        }
        return isvalid
    }

    validEmailUbcMsg(val,msg, msg1, optional) {
        var isvalid: boolean = false;
        var patternText = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ubc|ubc)\.(com|ca)$/;
        if (val == '') {
            this.presentToast(msg)
            if (optional == 0) {
                isvalid = false;
            }
            else {
                isvalid = true;
            }
        }
        else
        {
            if (patternText.test(val)) {
                isvalid = true;
            }
            else {
                isvalid = false;
                this.presentToast(msg1)
            }
        }
        return isvalid
    }



    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }
    // presentToast(msg) {
    //     let alert = this.alertCtrl.create({
    //         title: '',
    //         subTitle: msg,
    //         buttons: ['Close']
    //     });
    //     alert.present();
    // }

}
