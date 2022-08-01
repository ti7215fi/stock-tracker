import { Component, Input, OnInit } from '@angular/core';
import { Sentiment } from 'src/app/core/stock.model';

@Component({
  selector: 'app-sentiment-card',
  templateUrl: './sentiment-card.component.html',
  styleUrls: ['./sentiment-card.component.scss']
})
export class SentimentCardComponent implements OnInit {

  @Input() sentiment: Sentiment = new Sentiment();

  constructor() { }

  ngOnInit(): void {
  }

}
