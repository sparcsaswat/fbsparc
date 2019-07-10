import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuOptionsPage } from './menu-options';

@NgModule({
  declarations: [
    MenuOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuOptionsPage),
  ],
})
export class MenuOptionsPageModule {}
