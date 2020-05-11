exports.seed = (knex) => {
  return knex('flats').insert([
    {
      title: 'flat1',
      price: 2000,
      floorArea: 50,
      country: 'Hungary',
      zip: 4030,
      city: 'Debrecen',
      street: 'Piac'
    },
    {
      title: 'flat2',
      price: 3000,
      floorArea: 70,
      country: 'Hungary',
      zip: 4030,
      city: 'Debrecen',
      street: 'Piac'
    },
    {
      title: 'flat3',
      price: 2000,
      floorArea: 50,
      country: 'Hungary',
      zip: 4030,
      city: 'Debrecen',
      street: 'Piac'
    }
  ]);
};
