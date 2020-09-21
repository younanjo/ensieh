import Excel, { Row } from 'exceljs';
import camelCase from 'camelcase';
import { toLower } from 'ramda';

const currencyMap: any = {
  '£': 'GBP',
  '€': 'EURO',
  $: 'AUD',
};

const getNarrativeRow = (sheet: Excel.Worksheet) => {
  let narrativeIndex: any;
  sheet.eachRow((row: Row, index: any) => {
    // @ts-ignore
    const values = row.values.splice(1);

    try {
      if (
        toLower(values[0]) === 'date' &&
        toLower(values[1]) === 'narrative' &&
        toLower(values[3]) === 'credit amount' &&
        toLower(values[2]) === 'debit amount'
      ) {
        narrativeIndex = index;
        return;
      }
    } catch (e) {}
  });

  return narrativeIndex;
};

export default (sheet: Excel.Worksheet, account: any) => {
  // get txs
  const txRow = getNarrativeRow(sheet);
  if (!txRow) {
    console.log('no tx rows exists. done');
    return [];
  }

  const startingIndex = txRow;
  // @ts-ignore
  let headers = sheet.getRow(startingIndex).values.splice(1);

  // get the values
  const rows = [];
  for (let i = startingIndex + 1; i <= sheet.actualRowCount; i++) {
    // @ts-ignore
    const values = sheet.getRow(i).values.splice(1);
    rows.push(values);
  }

  let runningBalance = account.balance;

  return rows.map((r: Row) => {
    const o = headers.reduce(
      (
        result: { [x: string]: any },
        current: string,
        index: string | number
      ) => {
        // @ts-ignore
        result[camelCase(toLower(current))] = r[index] || '';
        return result;
      },
      {}
    );

    let formattedAmount = (o.debitAmount || o.creditAmount)
      .toString()
      .replace(',', '');

    let symbol = formattedAmount[0];
    let currency = currencyMap[symbol];

    if (!currency) {
      symbol = '$';
      currency = 'AUD';
    } else {
      formattedAmount = formattedAmount.substr(1);
    }

    o.currency = currency;
    o.symbol = symbol;

    if (o.debitAmount) {
      runningBalance = Math.round((runningBalance - o.debitAmount) * 100)/100;
      o.debitAmount = formattedAmount;
    } else if (o.creditAmount) {
      runningBalance = Math.round((runningBalance + o.creditAmount) * 100)/100;
      o.creditAmount = formattedAmount;
    }

    o.balance = runningBalance;
    account.balance = runningBalance;

    return o;
  });
};
