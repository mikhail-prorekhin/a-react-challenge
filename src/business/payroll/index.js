export const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);

export const isValidAndPositiveValue = value => {
  if (!isNumber(value)) {
    return false;
  }
  const parsed = parseFloat(value);
  if (parsed < 0) {
    return false;
  }
  return true;
};

/**
 * calculation of the income tax per month
 * according 2017-2018
 * value - a positive numbeer
 */
export const getIncomeTax = value => {
  if (!isValidAndPositiveValue(value)) {
    throw new Error("the income must be a positive number");
  }
  const income = parseFloat(value);

  const decisionTable = [
    {
      threshold: 180000,
      constSum: 54232,
      percent: 0.45
    },
    {
      threshold: 87000,
      constSum: 19822,
      percent: 0.37
    },
    {
      threshold: 37000,
      constSum: 3572,
      percent: 0.325
    },
    {
      threshold: 18200,
      constSum: 0,
      percent: 0.19
    },
    {
      threshold: 0,
      constSum: 0,
      percent: 0
    }
  ];

  for (let item of decisionTable) {
    const { threshold, constSum, percent } = item;
    if (income > threshold) {
      return Math.round(((income - threshold) * percent + constSum) / 12);
    }
  }
};

export default (anulalIncomeInput, superannuationInput) => {
  if (!isValidAndPositiveValue(anulalIncomeInput)) {
    throw new Error("the income must be a positive number" );
  }
  const anulalIncome = parseFloat(anulalIncomeInput);

  if (!isValidAndPositiveValue(superannuationInput)) {
    throw new Error("the superannuation must be a positive number");
  }
  const superannuationRate = parseFloat(superannuationInput);

  if (superannuationRate > 50) {
    throw new Error("the superannuation can not be more than 50%");
  }
  const grossIncome = Math.round(anulalIncome / 12);
  const incomeTax = getIncomeTax(anulalIncome);
  const netIncome = grossIncome - incomeTax;
  const superannuation = Math.round(grossIncome / 100 * superannuationRate);
  const payment = netIncome - superannuation;
  return {
    grossIncome,
    incomeTax,
    netIncome,
    superannuation,
    payment
  };
};
