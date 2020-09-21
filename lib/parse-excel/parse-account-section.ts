import Excel from 'exceljs';
import camelCase from 'camelcase';
import { toLower, isNil } from 'ramda';

export default (sheet: Excel.Worksheet) => {
  const headerRowIndex = 1;
  const maxRow = 2;
  const minAllowedCols = 5;
  const maxAllowedCols = 6;

  let headers: any = sheet.getRow(headerRowIndex).values;
  let values: any = sheet.getRow(maxRow).values;

  if (isNil(headers) || isNil(values)) {
    throw new Error(
      `Invalid account section. Unexpected number of columns for sheet: ${
        sheet.name
      }`
    );
  }

  headers = headers.splice(1);
  values = values.splice(1);

  if (
    headers.length < minAllowedCols ||
    headers.length > maxAllowedCols ||
    values.length < minAllowedCols ||
    values.length > maxAllowedCols
  ) {
    throw new Error(
      `Invalid account section. Unexpected number of columns for sheet: ${
        sheet.name
      }`
    );
  }

  return headers.reduce(
    (result: { [x: string]: any }, current: string, index: string | number) => {
      result[camelCase(toLower(current))] = values[index];
      return result;
    },
    {}
  );
};
