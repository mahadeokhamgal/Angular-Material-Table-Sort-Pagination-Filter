import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteListService { 
  
  constructor(private http: HttpClient) {
  }
   getAllQuotes() {
    return this.http.get('http://localhost:8080/all.json');
   }
   getMyQuotes() {
    return this.http.get('http://localhost:8080/my.json');
   }
   getSpecificQuoteFromQuoId(quote_id:number) {
    console.log("hi");
    return this.http.get('http://localhost:8080/all.json?quoteId='+quote_id);
  }
  getSpecificQuoteFromOppId(opportunityid:string){
   return this.http.get('http://localhost:8080/all.json?opportunity_id='+opportunityid);
  }
}

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteListService {
  constructor(private http: HttpClient) { }


  getAllQuotes() {
    return this.http.get('http://localhost:3002/mule/quoteread/v1.0/api/quotes/all?startDate=2023-10-01T00:00:00&endDate=2023-10-30T23:59:59');
  }
  getMyQuotes() {
    return this.http.get('http://localhost:3002/mule/quoteread/v1.0/api/quotes/myquotes');
  }
  getSpecificQuote(quote_id) {
    return this.http.get('http://localhost:3002/mule/quoteread/v1.0/api/quotes/all?quoteId=' + String(quote_id));
  }
}

*/