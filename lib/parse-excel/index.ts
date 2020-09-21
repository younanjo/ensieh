import Excel from 'exceljs';
import { join } from 'path';
import { sortBy, prop } from 'ramda';
import { ExcelValidator } from '../../validators';
import getAccountSection from './parse-account-section';
import getRecurringSection from './parse-recurring-section';
import getTxSection from './parse-tx-section';

export default async (fileName: string): Promise<any> => {
  const dir = join(__dirname, '../../../trans');
  const fileFullPath: string = `${dir}/${fileName}.xlsx`;

  // read from a file
  const workbook = new Excel.Workbook();

  // @ts-ignore
  await workbook.xlsx.readFile(fileFullPath);

  const accounts: any = [];
  workbook.eachSheet(sheet => {
    if (sheet.state === 'hidden') {
      return;
    }

    const account = getAccountSection(sheet);
    const recurring = getRecurringSection(sheet);
    const txs = getTxSection(sheet, account);

    const final = { account: account, recurring: recurring, transactions: sortBy(prop('date'))(txs) };
    const { value, error } = ExcelValidator(final);

    if (error) {
      throw new Error(
        `Error in Sheet: ${sheet.name}. ${JSON.stringify(
          error.details,
          null,
          2
        )}`
      );
    }

    accounts.push(value);
  });

  return accounts;
};
