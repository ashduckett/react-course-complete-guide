import './Expenses.css';
import { useState } from 'react';
// import ExpenseItem from './ExpenseItem';
import ExpensesList from './ExpensesList';
import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2020');
    
    const filterChangeHandler = (year) => {
        setFilteredYear(year);
    };
    
    const filteredExpenses = props.items.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;
    });


    // let expensesContent = <p>No expenses found.</p>;

    // if (filteredExpenses.length > 0) {
    //     expensesContent = filteredExpenses.map((expense) => (<ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id} />));
    // }

    return (
        <div>
            <Card className="expenses">
                
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesList items={filteredExpenses} />
                {/* {expensesContent} */}
                
                {/* Example One: */}
                {/* {filteredExpenses.length === 0 ? (
                    <p>No expenses found.</p>
                ) : (
                    filteredExpenses.map((expense) => (
                        <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id} />
                    ))
                )} */}

                {/* Example Two */}
                {/* {filteredExpenses.length === 0 && <p>No expenses found.</p>}
                {filteredExpenses.length > 0 && 
                    filteredExpenses.map((expense) => (
                        <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id} />
                ))} */}
                
                {/* <ExpenseItem title={props.items[0].title} amount={props.items[0].amount} date={props.items[0].date} />
                <ExpenseItem title={props.items[1].title} amount={props.items[1].amount} date={props.items[1].date} />
                <ExpenseItem title={props.items[2].title} amount={props.items[2].amount} date={props.items[2].date} />
                <ExpenseItem title={props.items[3].title} amount={props.items[3].amount} date={props.items[3].date} /> */}
            </Card>
        </div>
    );
}

export default Expenses;