-- TABLE 1: member_login
CREATE TABLE member_login (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- TABLE 2: member_info
CREATE TABLE member_info (
    user_id INT PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    sex CHAR(1),
    t_shirt_size VARCHAR(10),
    address VARCHAR(255),
    city VARCHAR(50),
    zip_code VARCHAR(10),
    mobile_phone VARCHAR(15),
    home_phone VARCHAR(15),
    dob DATE,
    email VARCHAR(100) NOT NULL,
    how_did_you_hear VARCHAR(255),
    emergency_contact_first_name VARCHAR(50),
    emergency_contact_last_name VARCHAR(50),
    emergency_phone VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES member_login(user_id)
);

-- TABLE 3: member
CREATE TABLE member
(
    member_id INT PRIMARY KEY,
    first_name VARCHAR2(30) NOT NULL,
    last_name VARCHAR2(3) NOT NULL,
    date_of_birth DATE NOT NULL,
    sex CHAR NOT NULL,
    email VARCHAR2(30) NOT NULL
)
