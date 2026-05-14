CREATE TABLE suppliers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    supplier_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT fk_orders_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),  
    CONSTRAINT fk_orders_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
);


CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,   
    stock_current INTEGER NOT NULL DEFAULT 0 CHECK (stock_current >= 0),
    stock_minimum INTEGER NOT NULL DEFAULT 0 CHECK (stock_minimum >= 0),
    supplier_id BIGINT,
    CONSTRAINT fk_products_supplier
       FOREIGN KEY (supplier_id)
       REFERENCES suppliers(id)
       ON DELETE SET NULL  
);



  
