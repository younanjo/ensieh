import camelCase from 'camelcase';
import Excel from 'exceljs';
import { isNil, toLower } from 'ramda';

export default (sheet: Excel.Worksheet) => {
  const startingIndex = 3;
  const endRowValue = 'date';
  const expectedCols = 5;

  let headers: any = sheet.getRow(startingIndex).values;

  if (!headers) {
    throw new Error(`Invalid recurring section`);
  }

  headers = headers.splice(1);

  if (
    headers.length !== expectedCols ||
    (toLower(headers[0]) !== 'recurring rate' ||
      toLower(headers[1]) !== 'narrative')
  ) {
    return;
  }

  // get the values
  const rows: any[] = [];
  for (let i = startingIndex + 1; i < sheet.actualRowCount; i++) {
    let values: any = sheet.getRow(i).values;

    if (isNil(values)) {
      throw new Error(`Invalid recurring section`);
    }

    values = values.splice(1);

    if (toLower(values[0]) === endRowValue) {
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
