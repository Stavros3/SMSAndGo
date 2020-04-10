import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowImagePage } from './show-image.page';

const routes: Routes = [
  {
    path: '',
    component: ShowImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowImagePageRoutingModule {}
