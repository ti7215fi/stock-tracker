import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./quote/quote.module').then(m => m.QuoteModule)
  },
  {
    path: 'sentiment',
    loadChildren: () => import('./insider-sentiment/insider-sentiment.module').then(m => m.InsiderSentimentModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
