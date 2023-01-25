import { useContextSelector } from 'use-context-selector';

import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/logo.svg';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { NewTransactionModal } from '../NewTransactionModal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export function Header() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    ({ fetchTransactions }) => fetchTransactions,
  )

  async function handleLoadStartTransactions() {
    await fetchTransactions()
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" onClick={handleLoadStartTransactions} />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
