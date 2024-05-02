import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResipeDetailPageRoutingModule } from './resipe-detail-routing.module';

import { ResipeDetailPage } from './resipe-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResipeDetailPageRoutingModule
  ],
  declarations: [ResipeDetailPage]
})
export class ResipeDetailPageModule {}
