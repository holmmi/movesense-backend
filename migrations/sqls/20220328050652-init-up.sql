CREATE TABLE organization(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL,
    organization_id INT,
    CONSTRAINT fk_customer
        FOREIGN KEY (organization_id) 
        REFERENCES organization(id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
);