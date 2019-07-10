import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { ServiceUrl } from './apiConfig';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class Services {
    appUrl: ServiceUrl;
    constructor(public http: HTTP) {
        this.appUrl = new ServiceUrl();
    }
    fetchCommonData(apiUrl,data) {
        this.http.setDataSerializer("json");
        this.http.useBasicAuth("FoodBuddy","FoodBuddy@123");
        return this.http.post(this.appUrl.baseURL + apiUrl, data, {})
    }

    // fetchCommonGetData(apiUrl,data) {
    //     this.http.setDataSerializer("json");
    //     this.http.useBasicAuth("FoodBuddy","FoodBuddy@123");
    //     return this.http.post(this.appUrl.baseURL + apiUrl, data, {})
    // }
    fetchCommonGetData(apiUrl) {
        this.http.setDataSerializer("json");
        this.http.useBasicAuth("FoodBuddy","FoodBuddy@123");
        return this.http.get(this.appUrl.baseURL + apiUrl, '', {})
    }
    // fetchCommonData1(apiUrl, data) {
    //     let postUrl: string = this.appUrl.baseURL1 + apiUrl
    //     console.log(postUrl)
    //     return this.http.post(postUrl, data).map(res => res.json());
    // }
    // fetchImagePath(apiUrl, data) {
    //     let postUrl: string = this.appUrl.imgURL + apiUrl
    //     console.log(postUrl)
    //     return this.http.post(postUrl, data).map(res => res.json());
    // }

    // conPdfToImg(data) {
    //     let postUrl: string = 'https://v2.convertapi.com/pdf/to/jpg?Secret=ABVkpVjLwZLaQo9I';
    //     console.log(postUrl)
    //     return this.http.post(postUrl, data).map(res => res.json());
    // }

    
}
