import pandas as pd
from categorization import categorize_and_predict

# Load new transactions for categorization and import the rule-based categorization function
new_transactions = pd.read_csv('./data/new_transactions.csv')
new_transactions[['Predicted_Kategori', 'Predicted_Subkategori']] = new_transactions['Text'].apply(lambda x: pd.Series(categorize_and_predict(x)))

# Save the transactions
new_transactions.to_csv('./data/categorized_transactions.csv', index=False)

print(new_transactions[['Text', 'Predicted_Kategori', 'Predicted_Subkategori']])