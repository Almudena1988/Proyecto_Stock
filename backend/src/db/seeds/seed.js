/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed (knex) {
  // Borra todas las entradas
  await knex('suppliers').del()
  // Inserta los datos
  await knex('suppliers').insert([
    {
      name: 'Medline',
      email: 'medline@gmail.com',
      address: 'Calle Sol 23, Barcelona',
      created_at: '2026-01-05'
    }
  ]);
};
