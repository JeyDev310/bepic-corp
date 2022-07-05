import { paymentMethodList } from './payment';

const varList = (varname) => {
  let vars = [];

  if (varname === 'payment.method') {
    vars = paymentMethodList;
  }
  return vars;
};
export const varLabel = (varname, value) => {
  const vars = varList(varname);
  let label = '';
  vars.forEach((el) => {
    if (el.value === value * 1) {
      label = el.label;
    }
  });
  return label;
};
export const varKey = (varname, value) => {
  const vars = varList(varname);
  let key = '';
  vars.forEach((el) => {
    if (el.value === value * 1) {
      key = el.key;
    }
  });
  return key;
};
export const varValue = (varname, key) => {
  const vars = varList(varname);
  let value = '';
  vars.forEach((el) => {
    if (el.key === key) {
      value = el.value;
    }
  });
  return value;
};
export const varOptions = (varname) => {
  const vars = varList(varname);
  const options = [];
  vars.forEach((el) => {
    options.push({
      label: el.label,
      value: el.value,
    });
  });
  return options;
};
export const varOptionsWithDefault = (varname, defaultLabel = '') => {
  const vars = varList(varname);
  const options = [
    {
      label: defaultLabel,
      value: '',
    },
  ];
  vars.forEach((el) => {
    options.push({
      label: el.label,
      value: el.value,
    });
  });
  return options;
};
