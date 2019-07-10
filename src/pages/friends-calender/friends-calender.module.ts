import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsCalenderPage } from './friends-calender';

@NgModule({
  declarations: [
    FriendsCalenderPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsCalenderPage),
  ],
})
export class FriendsCalenderPageModule {}
