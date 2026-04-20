CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    supplier_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'received', 'cancelled')),

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
    supplier_id BIGINT

    CONSTRAINT fk_products_supplier
       FOREIGN KEY (supplier_id)
       REFERENCES suppliers(id)
       ON DELETE SET NULL  
);



CREATE TABLE order_items (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),

    PRIMARY KEY (order_id, product_id),

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id),
        

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        
);


CREATE TABLE alerts (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('low_stock', 'expiry', 'out_of_stock')),
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alerts_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
       
);

CREATE TYPE user_role AS ENUM ('admin', 'employee');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,    
    role user_role NOT NULL    
);

CREATE TABLE user_alerts (
    user_id BIGINT NOT NULL,
    alert_id BIGINT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, alert_id),

    CONSTRAINT fk_user_alerts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_user_alerts_alert
        FOREIGN KEY (alert_id)
        REFERENCES alerts(id)
       
);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE product_categories (
    product_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,

    PRIMARY KEY (product_id, category_id),

    CONSTRAINT fk_product_categories_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product_categories_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);


  
