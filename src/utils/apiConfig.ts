export class ServiceUrl {
    [x: string]: string;
    baseURL: string;
    imgURL: string;
    imgURL1: string;
    socketURL: string;

    constructor() {
        // this.baseURL = "http://192.168.10.15/Jeevika_SCMS_Service/JeevikaSCMSMobileService.svc/";   //local

        // this.baseURL = "http://203.129.207.124/SCMS_service/JeevikaSCMSMobileService.svc/";  //staging server

        // this.baseURL = "http://192.168.103.85:3002/api/";  //local server 
        // this.imgURL = "http://192.168.103.85:3002/public/FoodPrefImages/" //img server
        // this.imgURL1 = "http://192.168.103.85:3002/public/userPic/"//profilepic url

        this.baseURL = "http://localhost:3002/api/";  //local server 
        this.imgURL = "http://localhost:3002/public/FoodPrefImages/" //img server
        this.imgURL1 = "http://localhost:3002/public/userPic/"//profilepic url

        //  this.baseURL = "http://10.1.1.79:3003/api/"; //staging server

    }
}
