import React, { useState } from 'react';
import "./App.css";

const ExpenseTracker = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleAddExpense = () => {                                    
    if (expenseName !== '' && expenseAmount !== '') {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };

      setExpenses([...expenses, newExpense]);
      setTotalExpense(totalExpense + parseFloat(expenseAmount));

      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const emptyit = (index) => {
    let updatedExpenses = [...expenses];
    let initialexpenses = updatedExpenses.slice(0, index);
    let lastexpenses = updatedExpenses.slice(index + 1);
    let modifiedexpenses = initialexpenses.concat(lastexpenses);
    setExpenses(modifiedexpenses);
  };

  React.useEffect(() => {
    const newBalance = income - totalExpense;
    setBalance(newBalance);
  }, [income, totalExpense]);

  return (
    <div>
      <h2 className='expense-tracker'>Expense Tracker</h2>

      <div className='balance'>
        <h3>Balance</h3>
        <input value = {balance}/>
      </div>

      <div className='income'>
        <h3>Income</h3>
        <input
          type="number"
          placeholder="Enter income"
          value={income}
          onChange={(e) => 
            setIncome(parseFloat(e.target.value))}
        />
      </div>

      <div className='expense'>
      <h3>Expense</h3>
        <input
          type="number"
          value={totalExpense}
        />
      </div>

      <div className='expenses'>
        <h3>Expenses</h3>
        <input
          type="text"
          placeholder="Enter expense name"
          value={expenseName}
          onChange={(e) => 
            setExpenseName(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => 
            setExpenseAmount(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {expenses.length > 0 && (
        <div>
          <h3>Expense List</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <button onClick = {(e) => emptyit(index)}> x </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ExpenseTracker;



