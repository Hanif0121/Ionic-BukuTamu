import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerimakasihPageRoutingModule } from './terimakasih-routing.module';

import { TerimakasihPage } from './terimakasih.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerimakasihPageRoutingModule
  ],
  declarations: [TerimakasihPage]
})
export class TerimakasihPageModule {}
