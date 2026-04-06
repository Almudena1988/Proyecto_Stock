/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
    return knex.schema.createTable('suppliers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique();
        table.string('address');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
    return knex.schema.dropTable('suppliers');
  
};
