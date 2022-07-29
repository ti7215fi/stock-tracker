import { Component, Input, OnInit } from '@angular/core';
import { Sentiment } from '../stock';

@Component({
  selector: 'app-sentiment-month',
  templateUrl: './sentiment-month.component.html',
  styleUrls: ['./sentiment-month.component.scss']
})
export class SentimentMonthComponent implements OnInit {

  @Input() sentiment: Sentiment = new Sentiment();

  constructor() { }

  ngOnInit(): void {
  }

}
