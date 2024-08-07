import React, { useEffect, useState } from 'react';
import Transaction from '../components/Transaction';
import '../styles/Transactions.css';
import useTransactions from '../hooks/useTransactions';
import EditTransactionForm from '../components/EditTransactionForm';

function TransactionsPage() {
  const {
    transactions,
    handleGetTransactions,
    handleDeleteTransaction,
    handleUpdateTransaction,
  } = useTransactions();

  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    handleGetTransactions();
  }, []);

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveClick = async (updatedTransaction) => {
    await handleUpdateTransaction(updatedTransaction.id, updatedTransaction);
    setEditingTransaction(null);
  };

  return (
    <div id="all-transactions">
      <div className="all-transactions-container">
        <h2>All Transactions</h2>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction}>
            <div className="button-container">
              <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>Del</button>
              <button className="edit-btn" onClick={() => handleEditClick(transaction)}>Edit</button>
            </div>
          </Transaction>
        ))}
      </div>
      {editingTransaction && (
        <EditTransactionForm
          transaction={editingTransaction}
          onSave={handleSaveClick}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}

export default TransactionsPage;
