export const fields = [
  {
    name: 'address',
    label: 'Address',
    type: 'input',
  },
  {
    name: 'address2',
    label: 'Address Line2',
    type: 'input'
  },
  {
    name: 'state',
    label: 'Province',
    type: 'select',
    options: [
      '',
      'Alberta', 'British Columbia', 'Manitoba',
      'New Brunswick', 'Newfoundland and Labrador', 
      'Northwest Territories', 'Nova Scotia',
      'Nunavut', 'Ontario', 'Prince Edward Island',
      'Quebec', 'Saskatchewan', 'Yukon'
    ],
    isHalf: true,
  },
  {
    name: 'city',
    label: 'City',
    type: 'input',
    isHalf: true,
  },  
  {
    name: 'postCode',
    label: 'Postal Code',
    type: 'input',
    isHalf: true
  }
]