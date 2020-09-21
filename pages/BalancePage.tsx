import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import client from '../components/client';

interface IState {
  data?: any | null;
  error?: string;
  loading?: boolean;
}

const TransactionPage = () => {
  const [localState, setLocalState] = useState<IState>({
    data: null,
    loading: false,
    error: '',
  });

  const hasData: boolean =
    localState.data && localState.data.data ? true : false;

  const getTransactions = async () => {
    try {
      const rsp = await client({
        method: 'get',
        url: '/transactions',
      });

      setLocalState({ ...localState, loading: false, data: rsp.data });
    } catch (error) {
      const msg =
        error.response && error.response.data
          ? JSON.stringify(error.response.data, null, 2)
          : error.message;

      setLocalState({ ...localState, error: msg, loading: false });
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const renderHeader = () => {
    return (
      <>
        <div className="welcome">
          Welcome Jones Smith, your last login was 07 December 2013.
        </div>
        <div>
          <div style={{ marginTop: '20px' }}>
            Address:
            <div>221 Miller Street</div>
            <div>North Sydney</div>
            <div>NSW</div>
            <div>2060</div>
          </div>
        </div>
      </>
    );
  };

  const renderAccounts = (data: any) => {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>
                <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">
                  Download PDF Statement
                </a>
              </td>
            </tr>
            <tr>
              <td>Statement Number:</td>
              <td>110</td>
            </tr>
            <tr style={{ marginTop: '10px' }}>
              <td>Account Name</td>
              <td>BSB</td>
              <td>Account Number</td>
              <td>Account Balance</td>
              <td>Available Balance</td>
              <td>Open Date</td>
              <td>Credit Limit</td>
            </tr>

            {data.map((r: any, index: number) => (
              <tr key={index}>
                <td>{r.account.accountName}</td>
                <td>{r.account.bsb}</td>
                <td>{r.account.account}</td>
                <td>
                  <span>AUD</span>
                  <span>{r.account.balance}</span>
                </td>
                <td>
                  <span>AUD</span>
                  <span>{r.account.balance}</span>
                </td>
                <td>27/06/2011</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const renderTx = (data: any) => {
    return data.map((r: any) => (
      <>
        <div
          style={{
            margin: '20px 0 20px 0',
            fontWeight: 'bold',
            fontSize: '25px',
          }}
        >
          {r.account.accountName} Transactions
        </div>
        <table>
          <tbody>
            <tr>
              <td>Description</td>
              <td>Date</td>
              <td>In</td>
              <td>Out</td>
              <td>Amount</td>
            </tr>

            {r.transactions.map((t: any) => (
              <>
                <tr>
                  <td>{t.narrative}</td>
                  <td>{t.date}</td>
                  <td>{t.creditAmount || ''}</td>
                  <td>{t.debitAmount || ''}</td>
                  <td>{t.balance}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </>
    ));
  };

  return (
    <div>
      <Head>
        <title>Second</title>
      </Head>

      <div style={{ margin: '10px' }}>{renderHeader()}</div>
      {hasData && (
        <div style={{ margin: '10px' }}>
          {renderAccounts(localState.data.data)}
        </div>
      )}

      {hasData && (
        <div style={{ margin: '10px' }}>{renderTx(localState.data.data)}</div>
      )}
    </div>
  );
};

export default TransactionPage;
