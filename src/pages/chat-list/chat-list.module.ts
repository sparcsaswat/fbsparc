import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatListPage } from './chat-list';
import { LottieAnimationViewModule } from 'ng-lottie';
@NgModule({
  declarations: [
    ChatListPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatListPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class ChatListPageModule {}
