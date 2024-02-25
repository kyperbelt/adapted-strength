FROM mysql

# Set the root password
ENV MYSQL_ROOT_PASSWORD your_password

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

