import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sentiment } from 'src/app/core/stock.model';


@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment-overview.component.html',
  styleUrls: ['./sentiment-overview.component.scss']
})
export class SentimentOverviewComponent implements OnInit, OnDestroy {

  symbol: string = '';
  sentimentData: Sentiment[] = [];

  readonly trackByMonth: TrackByFunction<Sentiment> = (idx, data) => data.month;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.setupSentimentData();
    this.setupCompanyName();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  private setupCompanyName() {
    const routeParamsSub = this.activatedRoute.params.subscribe(params => {
      this.symbol = params['symbol'];
    });
    this.subscriptions.push(routeParamsSub);
  }

  private setupSentimentData() {
    const routeDataSub = this.activatedRoute.data.subscribe(({ sentimentData }) => {
      this.sentimentData = sentimentData;
    });
    this.subscriptions.push(routeDataSub);
  }
}
