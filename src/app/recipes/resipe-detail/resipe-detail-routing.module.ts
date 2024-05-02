import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResipeDetailPage } from './resipe-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ResipeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResipeDetailPageRoutingModule {}
