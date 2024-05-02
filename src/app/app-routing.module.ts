import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  // {
  //   path: 'recipes',

  //   children:[
  //     {
  //       path:'',
  //       loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule),
  //     },
  //     {
  //       path: ':recipeId',
  //       loadChildren: () => import('./recipes/resipe-detail/resipe-detail.module').then( m => m.ResipeDetailPageModule),
  //     }
  //   ]
  // },

  { path: '', redirectTo: 'places', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule),
    // canLoad: [AuthGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule),
    canLoad: [AuthGuard] 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
