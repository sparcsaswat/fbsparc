import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearByRestaurantPage } from './near-by-restaurant';

@NgModule({
  declarations: [
    NearByRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(NearByRestaurantPage),
  ],
})
export class NearByRestaurantPageModule {}
