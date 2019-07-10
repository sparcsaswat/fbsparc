import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsProfilePage } from './friends-profile';

@NgModule({
  declarations: [
    FriendsProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsProfilePage),
  ],
})
export class FriendsProfilePageModule {}
