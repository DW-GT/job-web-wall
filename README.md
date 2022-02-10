# Job Web Wall

## Installation
1. First download the project. Docker should be installed on the local machine.
1. Then configure some files for port settings, database connection, frontend and needed database entries
1. Afterwards you can start the application with docker-compose up (maybe you have to do this a second time after the database is ready to use.)

### Port Settings
In the file docker-compose.yml the local ports can be changed.

### Database Connection Settings
In the file docker-compose.yml you can set DB-User and DB-Password for phpmyadmin and mysql.
For the DB-Connection for the backend it is needed to cp the file ./backend/.env.example to ./backend/.env and change the settings within this file.

### Settings for frontend
The frontend has to be able to access the backend api. Therefor the file ./frontend/.env has to be modified.
Set the value for "NEXT_PUBLIC_API_ADRESS" to the needed value. Only for local testing it can left as it is!

### Preparation for admin-users
In the file ./database/jobwebwall.sql you can set the users for the administration of the application. These users can add job-offers afterwards to the application.

