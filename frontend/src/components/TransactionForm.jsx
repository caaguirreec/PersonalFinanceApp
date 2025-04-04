import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Paper } from '@mui/material';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    description: '',
    payment_method: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', formData);
      onTransactionAdded(response.data);
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        description: '',
        payment_method: ''
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </TextField>
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Payment Method"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
          >
            <MenuItem value="credit_card">Credit Card</MenuItem>
            <MenuItem value="debit_card">Debit Card</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Add Transaction
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TransactionForm; 