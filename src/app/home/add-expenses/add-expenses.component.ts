import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, Time } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseModel } from '../../models/Expense.model';
import { response } from 'express';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTableModule,
    FormsModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {

  currentDate!: Date;
  currentTime!: string;
  amount : number = 0;
  note : string= "";
  username : string="";

  expenses:ExpenseModel[]=[];


  constructor(private expenseService:ExpenseService, private dialog:MatDialog){

  }

  ngOnInit(): void {
    this.setCurrentDateTime();
    this.fetchExpenses();

    const user = localStorage.getItem("LoggedInUser") || "No-User";
    this.username = user;
  }

  setCurrentDateTime() {
    const now = new Date();
    this.currentDate = now;
    this.currentTime = now.toTimeString().split(' ')[0]; // Format to HH:mm:ss
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const username = localStorage.getItem('LoggedInUser') || 'defaultUser';

      console.log('Form values:', {
        date: this.currentDate,
        time: this.currentTime,
        amount: this.amount,
        note: this.note,
        username: this.username || 'default',
        transactionId: ''
      });

      const newExpense: ExpenseModel = {
        date: this.currentDate,
        time: this.currentTime,
        amount: this.amount,
        note: this.note,
        username: this.username || 'default',
        transactionId: ''
      };

      this.expenseService.addExpense(newExpense).subscribe(response => {
        console.log("Expense Added Successfully");
        console.log('Response:', response); // Handle the text response
        this.fetchExpenses();
        form.resetForm();
        this.dialog.open(DialogComponent);
        this.setCurrentDateTime();
      }, error => {
        console.error('Error adding expense:', error);
      });
    }
  }


  fetchExpenses() {
    const username = localStorage.getItem('LoggedInUser') || 'defaultUser';
    this.expenseService.getExpenses(username).subscribe(data => {
      this.expenses = data
        .map(expense => ({
          ...expense,
          dateTime: new Date(`${expense.date}T${expense.time}`)
        }))
        .sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime())
        .slice(0, 8); // Sort by date and time in descending order and get the latest 8
    });
  }





}
