export const fields = [
  {
    name: 'address',
    label: 'Street',
    type: 'input',
  },
  {
    name: 'address2',
    label: 'Complement',
    type: 'input'
  },
  {
    name: 'state',
    label: 'Department',
    type: 'select',
    options: [
      '',
      'Beni', 'Chuquisaca', 'Cochabamba', 'La Paz',
      'Oruro', 'Pando', 'Potosí', 'Santa Cruz', 'Tarija'
    ],
    isHalf: true,
  },
  {
    name: 'city',
    label: 'Province',
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