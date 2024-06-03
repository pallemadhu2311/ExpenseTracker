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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



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

  addExpense(dateTime: Date, amount: number, note: string) {
    this.expenses.push({ dateTime, amount, note });
    console.log("Expense Data", this.expenses);
  }

  onSubmit(form: any) {
    const { date, time, amount, note } = form.value;
    const dateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    this.addExpense(dateTime, parseFloat(amount), note);
    alert("Submitted Successfully");
    form.resetForm({
      date: this.currentDate,
      time: this.currentTime,
    });
  }
}
