import Excel from 'exceljs';
import { join } from 'path';
import { toLower } from 'ramda';
import { BillersAndPayeesExcelValidator } from '../../validators';
import getBillers from './parse-billers-sheet';
import getPayees from './parse-payees-sheet';
import getPastPayments from './parse-past-payments';
import getFuturePayments from './parse-future-payments';

export default async (fileName: string): Promise<any> => {
  const dir = join(__dirname, '../../../billers-and-payees');
  const fileFullPath: string = `${dir}/${fileName}.xlsx`;

  // read from a file
  const workbook = new Excel.Workbook();

  // @ts-ignore
  await workbook.xlsx.readFile(fileFullPath);

  let billers: any = [];
  let payees: any = [];
  let paymentsSheet: any = {};
  let billPaymentsSheet: any = {};
  workbook.eachSheet(sheet => {
    if (sheet.state === 'hidden') {
      return;
    }

    switch(toLower(sheet.name)) {
      case('billers'): {
        billers = getBillers(sheet);
        break;
      }
      case('payees'): {
        payees = getPayees(sheet);
        break;
      }
      case('payments'): {
        paymentsSheet = sheet;
        break;
      }
      case('bill payments'): {
        billPaymentsSheet = sheet;
        break;
      }
    }
  });

  const pastPayments = getPastPayments(paymentsSheet, billPaymentsSheet);
  const futurePayments = getFuturePayments(paymentsSheet, billPaymentsSheet);

  const data = {
    billers: billers,
    payees: payees,
    pastPayments: pastPayments,
    futurePayments: futurePayments
  }

  const {value, error} = BillersAndPayeesExcelValidator(data);

  if (error) {
    throw new Error(
      `Error in workbook: ${fileFullPath}. ${JSON.stringify(
        error.details,
        null,
        2
      )}`
    );
  }

  return value;
};
