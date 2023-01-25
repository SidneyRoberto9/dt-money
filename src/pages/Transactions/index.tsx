import { useContextSelector } from 'use-context-selector';

import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/format';
import { SearchForm } from './components/SearchForm';
import { PriceHighlight, TransactionContainer, TransactionTable } from './styles';

export function Transactions() {
  const transactions = useContextSelector(
    TransactionsContext,
    ({ transactions }) => transactions,
  )

  return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <SearchForm />

        <TransactionTable>
          <tbody>
            {transactions.map(
              ({ id, description, price, category, createdAt, type }) => (
                <tr key={id}>
                  <td width="50%">{description}</td>
                  <td>
                    <PriceHighlight variant={type}>
                      {type === 'outcome' && '- '}
                      {priceFormatter.format(price)}
                    </PriceHighlight>
                  </td>
                  <td>{category}</td>
                  <td>{dateFormatter.format(new Date(createdAt))}</td>
                </tr>
              ),
            )}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  )
}
