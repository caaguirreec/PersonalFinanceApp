import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" align="center">
          No transactions found
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.SK}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell
                sx={{
                  color: transaction.type === 'expense' ? 'error.main' : 'success.main'
                }}
              >
                {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.payment_method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList; 