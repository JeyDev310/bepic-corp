export const fields = [
  {
    name: 'address',
    label: 'Street',
    type: 'input'    
  },
  {
    name: 'address2',
    label: 'Complement',
    type: 'input'
  },
  {
    name: 'state',
    label: 'State',
    type: 'select',
    isHalf: true, 
    options: [
      '',
      'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 
      'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 
      'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
      'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 
      'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
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
    label: 'CEP',
    type: 'input',
    mask: '99999-999',
    regex: '^([\\d]{5})\\-?([\\d]{3})$',
    isHalf: true,
  }
]