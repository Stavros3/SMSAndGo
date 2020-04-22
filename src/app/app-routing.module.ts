import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'showimage', loadChildren: () => import('./images/show-image/show-image.module').then( m => m.ShowImagePageModule)},
  { path: 'editimage', loadChildren: () => import('./images/images.module').then( m => m.ImagesPageModule)},
  { path: 'editpersonalsettings', loadChildren: () => import('./personal-info/personal-info.module').then( m => m.PersonalInfoPageModule)},
  { path: 'stats', loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
