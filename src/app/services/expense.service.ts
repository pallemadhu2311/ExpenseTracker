import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ExpenseModel } from '../models/Expense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://localhost:8080/api/expenses';

  constructor(private http:HttpClient) {

  }

  addExpense(expense : ExpenseModel):Observable<ExpenseModel>{
    return this.http.post<ExpenseModel>(this.baseUrl, expense);
  }

  getExpenses(): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(this.baseUrl);
  }






}
