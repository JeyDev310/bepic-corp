export const fields = [
  {
    name: 'address',
    label: 'Address',
    type: 'input'    
  },
  {
    name: 'address2',
    label: 'Address Line2',
    type: 'input'
  },
  {
    name: 'state',
    label: 'State',
    type: 'select',
    isHalf: true,
    options: [
      '',
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'Army Post Office', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'District Of Columbia',
      'Federated States of Micronesia', 'Fleet Post Office',
      'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
      'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
      'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina',
      'North Dakota', 'Northern Mariana Islands', 'Ohio',
      'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
      'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'U.S. Minor Outlying Islands',
      'U.S. Virgin Islands', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ]
  },
  {
    name: 'city',
    label: 'City',
    type: 'input',
    isHalf: true,
  },   
  {
    name: 'postCode',
    label: 'ZIP',
    type: 'input',
    isHalf: true,
  }
]