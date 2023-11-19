-- TABLE 1: login
CREATE TABLE login (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- TABLE 2: member
CREATE TABLE member(
    user_id INT PRIMARY KEY,
    -- Each number represents the tier level
    subscription_status INT,
    last_name VARCHAR2(50) NOT NULL,
    first_name VARCHAR2(50) NOT NULL,
    sex CHAR(1),
    t_shirt_size VARCHAR2(10),
    cell_phone CHAR(10),
    home_phone CHAR(15),
    date_of_birth DATE,
    email VARCHAR2(100) NOT NULL,
    how_did_you_hear VARCHAR2(255),
    FOREIGN KEY (user_id) REFERENCES login(user_id),
    CONSTRAINT at_least_one_phone CHECK (cell_phone IS NOT NULL OR home_phone IS NOT NULL)
);

-- TABLE 3: address
CREATE TABLE address (
    user_id INT PRIMARY KEY,
    street VARCHAR2(30) NOT NULL,
    city VARCHAR2(30) NOT NULL,
    zip_code CHAR(5) NOT NULL,
    state VARCHAR2(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES member(user_id)
);

-- TABLE 4: emergency_contact
CREATE TABLE emergency_contact (
    user_id INT PRIMARY KEY,
    emergency_first_name VARCHAR2(50),
    emergency_last_name VARCHAR2(50),
    emergency_phone CHAR(10),
    FOREGIN KEY (user_id) REFERENCES member(user_id)
);

