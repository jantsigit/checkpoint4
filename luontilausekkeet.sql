CREATE TABLE tableware (
    id INT GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    qty INT NOT NULL,
    PRIMARY KEY(id)
);