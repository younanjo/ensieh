import Excel from 'exceljs';
import camelCase from 'camelcase';
import { toLower, isNil, sortBy, prop } from 'ramda';

export default (paymentsSheet: Excel.Worksheet, billPaymentsSheet: Excel.Worksheet) => {
  // @ts-ignore
  const pastPayments = sortBy(prop('date'))(getPastPayments(paymentsSheet));
  // @ts-ignore
  const pastBillPayments = sortBy(prop('date'))(getPastBillPayments(billPaymentsSheet));

  const past = {
    pastPayments: pastPayments,
    pastBillPayments: pastBillPayments
  }

  return past;
};

const getPastPayments = (sheet: Excel.Worksheet) => {
  const startingIndex = 2;
  const endRowValue = 'Future Payments';
  const expectedCols = 3;

  console.log(endRowValue)

  let headers: any = sheet.getRow(startingIndex).values;

  if (!headers) {
    throw new Error(`Invalid payments sheet`);
  }

  headers = headers.splice(1);

  if (
    headers.length !== expectedCols ||
    (toLower(headers[0]) !== 'date' ||
      toLower(headers[1]) !== 'name')
  ) {
    return;
  }

  // get the values
  const rows: any[] = [];
  for (let i = startingIndex + 1; i <= sheet.actualRowCount; i++) {
    let values: any = sheet.getRow(i).values;

    if (isNil(values)) {
      throw new Error(`Invalid payments sheet`);
    }

    values = values.splice(1);

    if (values[0] === endRowValue) {
      break;
    }

    rows.push(values);
  }

  return rows.map(r => {
    const o = headers.reduce(
      (
        result: { [x: string]: any },
        current: string,
        index: string | number
      ) => {
        result[camelCase(toLower(current))] = r[index] || '';
        return result;
      },
      {}
    );

    return o;
  });
};

const getPastBillPayments = (sheet: Excel.Worksheet) => {
  const startingIndex = 2;
  const endRowValue = 'Future Payments';
  const expectedCols = 4;

  let headers: any = sheet.getRow(startingIndex).values;

  if (!headers) {
    throw new Error(`Invalid bill payments sheet`);
  }

  headers = headers.splice(1);

  if (
    headers.length !== expectedCols ||
    (toLower(headers[0]) !== 'date' ||
      toLower(headers[1]) !== 'name')
  ) {
    return;
  }

// get the values
  const rows: any[] = [];
  for (let i = startingIndex + 1; i <= sheet.actualRowCount; i++) {
    let values: any = sheet.getRow(i).values;

    if (isNil(values)) {
      throw new Error(`Invalid payments sheet`);
    }

    values = values.splice(1);

    if (values[0] === endRowValue) {
      break;
    }

    rows.push(values);
  }

  return rows.map(r => {
    const o = headers.reduce(
      (
        result: { [x: string]: any },
        current: string,
        index: string | number
      ) => {
        result[camelCase(toLower(current))] = r[index] || '';
        return result;
      },
      {}
    );

    return o;
  });
};
