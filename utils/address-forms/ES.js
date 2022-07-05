export const fields = [
  {
    name: 'address',
    label: 'Street',
    type: 'input'    
  },
  {
    name: 'address2',
    label: 'Floor And Letter',
    type: 'input'
  },
  {
    name: 'state',
    label: 'Province',
    type: 'select',
    isHalf: true,
    options: [
      '',
      'Álava', 'Albacete', 'Alicante', 'Almería', 'Avila', 
      'Badajoz', 'Islas Baleares', 'Barcelona', 'Burgos', 
      'Cáceres', 'Cádiz', 'Castellón', 'Ciudad Real', 'Córdoba', 
      'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 
      'Guipúzcoa', 'Huelva', 'Huesca', 'Jaen', 'León', 'Lérida', 
      'La Rioja', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 
      'Orense', 'Asturias', 'Palencia', 'Las Palmas', 'Pontevedra', 
      'Salamanca', 'S.C.Tenerife', 'Cantabria', 'Segovia', 'Sevilla', 
      'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 
      'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 
      'Melilla'
    ]
  },
  {
    name: 'city',
    label: 'City',
    type: 'input',
    isHalf: true,
  },   
]