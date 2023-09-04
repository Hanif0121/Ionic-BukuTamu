import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerimakasihPage } from './terimakasih.page';

const routes: Routes = [
  {
    path: '',
    component: TerimakasihPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerimakasihPageRoutingModule {}
