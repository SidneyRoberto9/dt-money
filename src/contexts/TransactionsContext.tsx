import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

import { api } from '../lib/axios';

export interface Transaction {
  id: number
  price: number
  category: string
  createdAt: string
  description: string
  type: 'income' | 'outcome'
}

interface CreateTransactionData {
  price: number
  category: string
  description: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(
    async ({ type, price, category, description }: CreateTransactionData) => {
      const { data } = await api.post('transactions', {
        type,
        price,
        category,
        description,
        createdAt: new Date(),
      })

      setTransactions((state) => [data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
