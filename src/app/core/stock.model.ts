export type Price = number
export type Percent = number
export type Month = 1|2|3|4|5|6|7|8|9|10|11|12
export class Quote {

    constructor(
        public change: Percent = 0,
        public openingPrice: Price = 0,
        public currentPrice: Price = 0,
        public highPrice: Price = 0
    ) {}
}

export class Sentiment {

    constructor(
        public month?: Month,
        public year?: number,
        public change: number = 0,
        public mspr: number = 0
    ) {}
}
export class Stock {

    constructor(
        public symbol: string = '',
        public companyName?: string,
        public quote?: Quote
    ) {}
}