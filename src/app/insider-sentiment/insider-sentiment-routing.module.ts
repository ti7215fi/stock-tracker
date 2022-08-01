import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SentimentResolver } from "./sentiment.resolver";
import { SentimentComponent } from "./sentiment/sentiment.component";

const routes: Routes = [
    {
        path: ':symbol',
        component: SentimentComponent,
        resolve: {
          sentimentData: SentimentResolver
        }
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InsiderSentimentRoutingModule { }