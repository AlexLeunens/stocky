export interface DividendInformation {
    results: DividendResult[]
    status: string
    request_id: string
    next_url: string
  }
  
  export interface DividendResult {
    cash_amount: number
    currency: string
    declaration_date: number[]
    dividend_type: string
    ex_dividend_date: number[]
    frequency: number
    pay_date: number[]
    record_date: number[]
    ticker: string
  }