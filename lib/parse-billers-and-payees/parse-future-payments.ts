import Excel, { Row } from 'exceljs';
import camelCase from 'camelcase';
import { toLower, isNil, sortBy, prop } from 'ramda';

export default (paymentsSheet: Excel.Worksheet, billPaymentsSheet: Excel.Worksheet) => {
  // @ts-ignore
  const futurePayments = sortBy(prop('date'))(getFuturePayments(paymentsSheet));
  // @ts-ignore
  const futureBillPayments = sortBy(prop('date'))(getFutureBillPayments(billPaymentsSheet));

  const future = {
    futurePayments: futurePayments,
    futureBillPayments: futureBillPayments
  }

  return future;
};

const getStartingIndex = (sheet: Excel.Worksheet) => {
  let startingIndex: any;
  let futurePaymentsFound = false;

  sheet.eachRow((row: Row, index: any) => {
    // @ts-ignore
    const values = row.values.splice(1);

    try {
      if (!futurePaymentsFound) {
        if (toLower(values[0]) === 'future payments') {
          futurePaymentsFound = true;
        }
      } else {
         if (
            toLower(values[0]) === 'date' &&
            toLower(values[1]) === 'name'
         ) {
            startingIndex = index;
            return;
         }
      }
    } catch (e) {}
  });

  return startingIndex;
};

const getFuturePayments = (sheet: Excel.Worksheet) => {
  const startingIndex = getStartingIndex(sheet);
  const expectedCols = 3;

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

const getFutureBillPayments = (sheet: Excel.Worksheet) => {
  const startingIndex = getStartingIndex(sheet);
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
      throw new Error(`Invalid bill payments sheet`);
    }

    values = values.splice(1);
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
