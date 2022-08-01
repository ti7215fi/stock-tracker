export interface QuoteResponse {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
}

export interface SearchItem {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

export interface SearchResponse {
    count: number;
    result: SearchItem[];
}
export interface SentimentData {
    symbol: string;
    year: number;
    month: number;
    change: number;
    mspr: number;
}

export interface SentimentResponse {
    symbol: string;
    data: SentimentData[]
}