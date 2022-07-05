import moment from 'moment';

export const asPrice = (priceNumber) => {
  if (priceNumber==null) return ''
  if (isNaN(priceNumber)) return priceNumber
  priceNumber = ((priceNumber*1).toFixed(2))*1
  return '$'+priceNumber.toFixed(2)
}

export const asNumber = (number) => {
  if (number==null) return ''
  if (isNaN(number)) return number
  return (number*1).toLocaleString()
}

export const asKNumber = (number) => {
  if (number==null) return ''
  if (isNaN(number)) return number
  if (number < 100) {
    return number
  } else {
    return (Math.floor(number/10)/100)+'K'
  }
}

export const asPercent = (number) => {
  if (number==null) return ''
  if (isNaN(number)) return number 
  return (number*100).toFixed(2)+'%'
}

export const asDate = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;
  return moment.utc(x).format('MM/DD/YY');
};
export const asDateTime = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;
  return moment(x).format('MM/DD/YY hh:mm:ss');
};
