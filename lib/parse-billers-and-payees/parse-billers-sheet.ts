import Excel, { Row } from 'exceljs';
import camelCase from 'camelcase';
import { toLower } from 'ramda';

export default (sheet: Excel.Worksheet) => {
  const expectedCols = 4;
  // @ts-ignore
  const headers = sheet.getRow(1).values.splice(1);

  if (
    headers.length !== expectedCols ||
    (toLower(headers[0]) !== 'name' ||
      toLower(headers[1]) !== 'description')
  ) {
    return;
  }

  // get the values
  const rows = [];
  for (let i = 2; i <= sheet.actualRowCount; i++) {
    // @ts-ignore
    const values = sheet.getRow(i).values.splice(1);
    rows.push(values);
  }

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

    return o;
  });
};
