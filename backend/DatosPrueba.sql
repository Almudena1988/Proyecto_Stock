INSERT INTO suppliers (name, email, address) VALUES
('Proveedor Uno', 'uno@example.com', 'Calle Mayor 1, Madrid'),
('Proveedor Dos', 'dos@example.com', 'Avenida Diagonal 123, Barcelona'),
('Proveedor Tres', 'tres@example.com', 'Gran Vía 45, Madrid'),
('Proveedor Cuatro', 'cuatro@example.com', 'Calle Larios 10, Málaga'),
('Proveedor Cinco', 'cinco@example.com', 'Calle Colón 8, Valencia');

INSERT INTO products (name, description, stock_current, stock_minimum, supplier_id) VALUES 
('Guantes de nitrilo desechables', 'Guantes sin polvo de nitrilo, alta resistencia química, talla M, aptos para laboratorio y manipulación de muestras.', 200, 50, 1), 
('Puntas de pipeta 200 µL', 'Puntas universales de polipropileno, estériles, compatibles con la mayoría de micropipetas de 200 µL.', 500, 100, 2), 
('Tubos Eppendorf 1.5 mL', 'Microtubos de polipropileno con tapa a presión, resistentes a centrifugación hasta 20.000 g.', 300, 80, 3), 
('Placas Petri estériles 90 mm', 'Placas de cultivo de poliestireno, estériles y desechables, diámetro 90 mm, aptas para microbiología.', 150, 40, 4), 
('Alcohol etílico 96%', 'Solución de etanol al 96% para desinfección de superficies y material de laboratorio.', 100, 20, 5),
('Mascarillas quirúrgicas desechables (caja 50 uds)', 
 'Mascarillas de tres capas con ajuste nasal, uso en laboratorio para evitar contaminación por aerosoles.', 
 180, 40, 41),
('Gradilla para tubos de ensayo 50 posiciones', 
 'Gradilla de polipropileno resistente para organización y soporte de tubos de ensayo estándar en laboratorio.', 
 60, 15, 42);

