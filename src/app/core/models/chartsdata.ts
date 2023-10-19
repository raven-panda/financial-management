export interface InvestmentInterface {
    id: number,
    name: string,
    amount: number,
    category: string,
    date: Date,
    description: string,
    status: string,
    roi: number,
    location: string,
    duration: number
}

export interface InvestmentStringdateInterface {
    name: string,
    amount: number,
    category: string,
    date: string,
    description: string,
    status: string,
    roi: number,
    location: string,
    duration: number
}