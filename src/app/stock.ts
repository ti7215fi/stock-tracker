export type Price = number
export type Percent = number

export type Trend = "UP" | "DOWN" | "UNKNOWN"
export class Quote {

    constructor(
        public change: Percent = 0,
        public openingPrice: Price = 0,
        public currentPrice: Price = 0,
        public highPrice: Price = 0
    ) {}
}
export class Stock {

    constructor(
        public symbol: string = '',
        public companyName?: string,
        public quote?: Quote
    ) {}
}

export function getTrend(quote: Quote): Trend {
    return quote.change >= 0 ? "UP" : "DOWN"
}