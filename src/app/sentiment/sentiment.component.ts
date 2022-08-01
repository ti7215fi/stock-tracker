import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Sentiment } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit, OnDestroy {

  companyName: string = '';
  sentimentData: Sentiment[] = [];

  readonly trackByMonth: TrackByFunction<Sentiment> = (idx, data) => data.month;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockService: StockService
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
      const stock = this.stockService.getStockBySymbol(params['symbol']);
      this.companyName = stock?.companyName ?? 'UNKNOWN';
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
