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
        table.smallint('id').primary();
        table.smallint('product_id').unsigned().notNullable().references('id').inTable('products');
        table.smallint('quantity').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
   


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('suppliers');
    await knex.schema.dropTable('products');
    await knex.schema.dropTable('orders');

};
