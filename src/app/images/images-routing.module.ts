import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesPage } from './images.page';

const routes: Routes = [
  {
    path: '',
    component: ImagesPage
  },
  {
    path: 'show-image',
    loadChildren: () => import('./show-image/show-image.module').then( m => m.ShowImagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesPageRoutingModule {}
