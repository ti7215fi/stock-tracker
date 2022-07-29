import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SentimentResolver } from './sentiment.resolver';
import { SentimentComponent } from './sentiment/sentiment.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent,
    resolve: {
      sentimentData: SentimentResolver
    }
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
