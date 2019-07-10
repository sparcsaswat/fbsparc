import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.lottieConfig = {
    //             path: 'assets/comingsoon.json',
    //             renderer: 'canvas',
    //             autoplay: true,
    //             loop: true
    //         };
  }
      // stop() {
      //     this.anim.stop();
      // }
    
      // play() {
      //     this.anim.play();
      // }
    
      // pause() {
      //     this.anim.pause();
      // }
    
      // setSpeed(speed: number) {
      //     this.animationSpeed = speed;
      //     this.anim.setSpeed(speed);
      // }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
  }

}
