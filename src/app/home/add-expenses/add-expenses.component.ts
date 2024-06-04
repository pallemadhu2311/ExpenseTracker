import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseModel } from '../../models/Expense.model';



interface Expense {
  dateTime: Date;
  amount: number;
  note: string;
}
@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [MatCardModule,

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
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent {

  expenses: Expense[] = [];
  displayedColumns: string[] = ['dateTime', 'amount', 'note'];
  currentDate: Date = new Date();
  currentTime: string = this.currentDate.toTimeString().slice(0, 5); // Format as HH:MM
  username: string = '';
  AllExpenses: ExpenseModel[] = [];


  constructor(private expenseService : ExpenseService){

  }

  ngOnInit():void{
    this.loadUsername();

  }

  loadUsername() {
    if (typeof localStorage !== 'undefined') {
      const userProfile = localStorage.getItem('_UserData_');
      if (userProfile) {
        try {
          const user = JSON.parse(userProfile);
          this.username = user.username;
        } catch (error) {
          console.error('Error parsing user profile from localStorage', error);
        }
      } else {
        //console.error('No user profile found in localStorage');
      }
    } else {
     // console.error('localStorage is not defined');
    }
  }

  addExpense(expense: ExpenseModel) {
    this.expenseService.addExpense(expense).subscribe((newExpense:any) => {
        this.expenses.push(newExpense);
        console.log('Expense added successfully', newExpense);
      },
      (error) => {
        console.error('Error adding expense', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    const { date, time, amount, note } = form.value;
    const dateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    const transactionId = this.generateTransactionId();
    const expense: ExpenseModel = {
      transactionId,
      date: dateTime,
      time,
      amount: parseFloat(amount),
      note,
      username: this.username
    };

    this.addExpense(expense);
    alert('Submitted Successfully');
    form.resetForm({
      date: this.currentDate,
      time: this.currentTime,
    });
  }

  generateTransactionId(): string {
    return '#' + Math.floor(Math.random() * 1000000).toString().padStart(7, '0');
  }


  loadExpenses() {
    this.expenseService.getExpenses().subscribe(
      (expenses: ExpenseModel[]) => {
        this.AllExpenses = expenses;
      },
      (error) => {
        console.error('Error loading expenses', error);
      }
    );
  }




}
