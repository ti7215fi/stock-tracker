import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SentimentResolver } from "./sentiment.resolver";
import { SentimentOverviewComponent } from "./sentiment-overview/sentiment-overview.component";

const routes: Routes = [
    {
        path: ':symbol',
        component: SentimentOverviewComponent,
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