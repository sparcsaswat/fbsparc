import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferencesPage } from './preferences';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    PreferencesPage
  ],
  imports: [
    IonicPageModule.forChild(PreferencesPage),
    IonicSelectableModule
  ],
})
export class PreferencesPageModule {}
