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
    label: 'Province',
    type: 'select',
    isHalf: true,
    options: [
      '',
      'Ciudad Autónoma de Buenos Aires', 'Buenos Aires', 'Catamarca',
      'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
      'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza',
      'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
      'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
      'Tierra del Fuego', 'Tucumán'
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
    label: 'Postal Code',
    type: 'input',
    isHalf: true
  }
]