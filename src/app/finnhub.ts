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