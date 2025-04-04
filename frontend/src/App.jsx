import { useState, useEffect } from 'react'
import { Container, Typography, Box } from '@mui/material'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import axios from 'axios'

function App() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions')
      setTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction])
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Personal Finance App
        </Typography>
        <TransactionForm onTransactionAdded={handleTransactionAdded} />
        <TransactionList transactions={transactions} />
      </Box>
    </Container>
  )
}

export default App
