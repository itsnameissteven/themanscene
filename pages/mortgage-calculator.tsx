import type { NextPage } from 'next';
import styles from '../styles/MotgageCalculator.module.scss';
import { FormBuilder, Input } from 'neat-form-builder';
import React, { useState } from 'react';

const inputs: FormInputDef = [
  {
    type: 'input',
    id: 'loan',
    value: '',
    placeholder: 'Loan',
    required: true,
  },
  {
    type: 'input',
    id: 'interest',
    value: '',
    placeholder: 'Interest',
    required: true,
  },
  {
    type: 'input',
    id: 'extraMonthly',
    value: '',
    placeholder: 'Extra Monthly Payments',
    required: false,
  },
];

const Mortgage: NextPage = () => {
  const [state, setState] = useState({
    loan: 0,
    monthlyPayment: 0,
    interest: 0,
    interestAmount: 0,
    extraMonthlyPayments: 0,
  });
  const [extraValues, setExtraValues] = useState<Record<number, string>>({});
  const getInterest = (interest: number, loan: number) => {
    const monthlyIntRate = interest / 100 / 12;
    const interestOwed = loan * monthlyIntRate;
    return interestOwed;
  };

  const handleSubmit = (v: any[]) => {
    const loan = Number(v.find((el) => el.id === 'loan').value!);
    const interest = Number(v.find((el) => el.id === 'interest').value!);
    const extraMonthlyPayments = v.find((el) => el.id === 'extraMonthly')
      .value!;
    const monthlyIntRate = interest / 100 / 12;
    const interestRate = getInterest(interest, loan);
    const bottom = 1 - (1 + monthlyIntRate) ** -360;
    const monthlyPayment = Math.ceil(interestRate / bottom);
    setExtraValues(() => {
      const d: Record<number, string> = {};
      for (let i = 360; i > 0; i--) {
        d[i] = extraMonthlyPayments || 0;
      }
      return d;
    });
    setState({
      monthlyPayment,
      interest,
      interestAmount: interestRate,
      loan,
      extraMonthlyPayments,
    });
  };

  type Payments = {
    remainingLoan: number;
    principalPayment: number;
    interestPayment: number;
    remainingMonths: number;
    paymentData: {
      remainingLoan: number;
      interest: number;
      principal: number;
      remainingMonths: number;
    }[];
    withExtraPayments?: boolean;
  };

  const payments = ({
    remainingLoan,
    principalPayment,
    interestPayment,
    remainingMonths,
    paymentData,
    withExtraPayments = true,
  }: Payments): any => {
    const extraPayement = withExtraPayments
      ? Number(extraValues[remainingMonths])
      : 0;
    const newData = {
      principalPayment:
        state.monthlyPayment - getInterest(state.interest, remainingLoan),
      interestPayment: getInterest(state.interest, remainingLoan),
      remainingLoan:
        remainingLoan -
        (state.monthlyPayment -
          getInterest(state.interest, remainingLoan) +
          (extraPayement || 0)),
      remainingMonths: remainingMonths - 1,
    };
    const newPayments: typeof paymentData = [
      ...paymentData,
      {
        remainingLoan,
        principal: principalPayment,
        interest: interestPayment,
        remainingMonths,
      },
    ];
    if (remainingMonths === 0 || remainingLoan <= 0) {
      return newPayments;
    }
    return payments({
      ...newData,
      paymentData: newPayments,
      withExtraPayments,
    });
  };

  const data = payments({
    principalPayment:
      state.monthlyPayment - getInterest(state.interest, state.loan),
    interestPayment: getInterest(state.interest, state.loan),
    remainingLoan:
      state.loan -
      (state.monthlyPayment - getInterest(state.interest, state.loan)),
    remainingMonths: 360,
    paymentData: [],
  });

  const noExtraPaymentData = payments({
    principalPayment:
      state.monthlyPayment - getInterest(state.interest, state.loan),
    interestPayment: getInterest(state.interest, state.loan),
    remainingLoan:
      state.loan -
      (state.monthlyPayment - getInterest(state.interest, state.loan)),
    remainingMonths: 360,
    paymentData: [],
    withExtraPayments: false,
  });

  const interestPaid = data.reduce(
    (acc: number, el: any) => el.interest + acc,
    0
  );

  const originalInterest = noExtraPaymentData.reduce(
    (acc: number, el: any) => el.interest + acc,
    0
  );
  const formatNumber = (n: number) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Mortgage Calculator</h1>
        <div className={`${styles.form}`}>
          <FormBuilder onSubmit={handleSubmit} data={inputs} />
        </div>
      </div>
      {state.monthlyPayment > 0 && (
        <>
          <div className={styles.headerContainer}>
            <h2 className={styles.monthHeader}>
              Monthly Payment <span>${state.monthlyPayment}</span>
            </h2>
            <h2 className={styles.monthHeader}>
              Interest paid <span>${formatNumber(interestPaid)}</span>
            </h2>
            <h2 className={styles.monthHeader}>
              Savings{' '}
              <span>${formatNumber(originalInterest - interestPaid)}</span>
            </h2>
          </div>
          <div className={styles.table}>
            <p className={styles.tableHeader}>Months</p>
            <p className={styles.tableHeader}>Principal</p>
            <p className={styles.tableHeader}>Interest</p>
            <p className={styles.tableHeader}>Extra Payment</p>
            <p className={styles.tableHeader}>Principal</p>
            {data.map((el: any, i: number) => {
              return (
                <React.Fragment key={i}>
                  <p>{el.remainingMonths}</p>
                  <p>{formatNumber(el.principal)}</p>
                  <p>{formatNumber(el.interest)}</p>
                  <Input
                    className={styles.input}
                    value={extraValues[el.remainingMonths] || ''}
                    onChange={(v) =>
                      setExtraValues({
                        ...extraValues,
                        [el.remainingMonths]: v.target.value,
                      })
                    }
                  />
                  <p>{formatNumber(el.remainingLoan)}</p>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default Mortgage;
