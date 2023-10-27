import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteListService {

  constructor(private http: HttpClient) {
  }
   getAllQuotes() {
    return this.http.get('http://localhost:8080/data.json');
   }
}
