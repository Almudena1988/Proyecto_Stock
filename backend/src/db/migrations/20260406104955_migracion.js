/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) { // Migración que se ejecuta con knex migrate:latest

    await knex.schema.createTable('suppliers', table => {
        table.increments('id').primary(); // Autoincremental y clave primaria
        table.string('name').notNullable();
        table.string('email').unique();
        table.string('address');
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Fecha y hora actual
    });

    await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.smallint('stock_current').notNullable();
        table.smallint('stock_minimum').notNullable();
        // No puede tener ID negativo, no es valor nulo, referencia al campo id en la tabla supplier. 
        // Si se borra un provedor se borran sus productos
        table.smallint('supplier_id').unsigned().notNullable().references('id').inTable('suppliers').onDelete('CASCADE');

    });

    await knex.schema.createTable('orders', table => {        
        table.increments('id').primary();            
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('order_products', table => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().notNullable().references('id').inTable('orders');
        table.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        table.smallint('quantity');
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('orders');
    await knex.schema.dropTable('products');
    await knex.schema.dropTable('suppliers');
};
