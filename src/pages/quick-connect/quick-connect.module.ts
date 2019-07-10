import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickConnectPage } from './quick-connect';

@NgModule({
  declarations: [
    QuickConnectPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickConnectPage),
  ],
})
export class QuickConnectPageModule {}
