import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../models/Expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://localhost:8080/expenses';

  constructor(private http: HttpClient) { }

  addExpense(expense: ExpenseModel): Observable<any> {  // Change to Observable<any> to handle text response
    return this.http.post<any>(`${this.baseUrl}`, expense, { responseType: 'text' as 'json' });
  }

  getExpenses(username: string): Observable<ExpenseModel[]> {
    let params = new HttpParams().set('username', username);
    return this.http.get<ExpenseModel[]>(`${this.baseUrl}`, { params });
  }
}
