-- Select the database to use for all the subsequent operations
USE e_commerce_store;

-- Create the customers table to store customer information
CREATE TABLE customers (
    -- customer_id is an auto-incremented integer that serves as the primary key
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- first_name and last_name store the customer's first and last names
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    
    -- email must be unique across customers
    email VARCHAR(50) UNIQUE,
    
    -- phone_number is stored as a VARCHAR to allow flexibility in formatting
    phone_number VARCHAR(15),
    
    -- address stores the customer's street address
    address VARCHAR(50),
    
    -- city and state store the geographical information for the customer
    city VARCHAR(30) NOT NULL,
    state VARCHAR(30) NOT NULL,
    
    -- zip stores the postal code
    zip INT(5),
    
    -- registration_date automatically captures the timestamp when the customer is added
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample customer into the customers table
INSERT INTO customers (first_name, last_name, email, phone_number, address, city, state, zip)
VALUES ('sammy', 'lakesteady', 'samsam233@gmail.com', '2673234021', '1738 North desk street', 'Philadelphia', 'PA', 29133);

-- Create the products table to store product information
CREATE TABLE products (
    -- product_id is an auto-incremented integer that serves as the primary key
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- product_name stores the name of the product
    product_name VARCHAR(30),
    
    -- product_description stores a detailed description of the product
    product_description TEXT,
    
    -- price stores the product price in decimal format (two decimal places)
    price DECIMAL(10, 2),
    
    -- stock_quantity stores the available quantity of the product
    stock_quantity INT,
    
    -- inventory_addition_date automatically records the timestamp when the product is added to inventory
    inventory_addition_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products into the products table
INSERT INTO products (product_name, product_description, price, stock_quantity)
VALUES
    ('energy drink', 'A refreshing energy drink', 2.99, 100),
    ('candy bar', 'A delicious chocolate bar', 1.49, 200),
    ('Pure ribs', 'Tender ribs for grilling', 5.99, 50);

-- Create the orders table to store orders placed by customers
CREATE TABLE orders (
    -- order_id is an auto-incremented integer that serves as the primary key
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- customer_id links this order to the customer who placed it (foreign key to customers table)
    customer_id INT,
    
    -- date_of_order automatically records the timestamp when the order is placed
    date_of_order TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- order_status is an ENUM field that can have values: pending, shipped, completed, or canceled
    order_status ENUM('pending', 'shipped', 'completed', 'canceled') NOT NULL DEFAULT 'pending',
    
    -- total_order_amount stores the total amount of the order in decimal format (two decimal places)
    total_order_amount DECIMAL(10, 2),
    
    -- FOREIGN KEY constraint ensures that the customer_id must reference an existing customer in the customers table
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Insert a sample order into the orders table
INSERT INTO orders (customer_id, order_status, total_order_amount)
VALUES (1, 'pending', 5.99);

-- Create the order_details table to store information about which products are in each order
CREATE TABLE order_details (
    -- order_detail_id is an auto-incremented integer that serves as the primary key for this table
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- order_id links this order detail to the corresponding order (foreign key to orders table)
    order_id INT,
    
    -- product_id links this order detail to the corresponding product (foreign key to products table)
    product_id INT,
    
    -- quantity stores how many of the product are ordered
    quantity INT,
    
    -- product_price stores the price of the product when the order was placed
    product_price DECIMAL(10, 2),
    
    -- time_of_order automatically records the timestamp when the order detail is added
    time_of_order TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- FOREIGN KEY constraint ensures that order_id must reference an existing order in the orders table
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    
    -- FOREIGN KEY constraint ensures that product_id must reference an existing product in the products table
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Query to fetch orders along with customer information (name, email, phone)
SELECT 
    orders.order_id,
    orders.date_of_order,
    orders.total_order_amount,
    customers.first_name,
    customers.last_name,
    customers.email,
    customers.phone_number
FROM 
    orders
-- INNER JOIN orders and customers on customer_id to link orders with the respective customer
INNER JOIN customers ON orders.customer_id = customers.customer_id;

-- Query to fetch order details along with product information (product name, quantity, total price)
SELECT 
    orders.order_id,
    orders.customer_id,
    orders.date_of_order,
    products.product_name,
    order_details.quantity,
    (order_details.quantity * products.price) AS total_price
FROM 
    order_details
-- INNER JOIN order_details with orders on order_id to fetch the respective order details
INNER JOIN orders ON order_details.order_id = orders.order_id
-- INNER JOIN order_details with products on product_id to fetch the respective product details
INNER JOIN products ON order_details.product_id = products.product_id;






