# projet7

clone repo:

where you want to clone repo run: git clone https://github.com/TheoOC/projet7.git

install backend and frontend npm packages:

enter backend folder and run: npm install
|
enter frontend folder and run: npm install

before starting backend check that mysql is started 
and create a database with name database_development.

edit config.json in config folder in backend if needed.

go to the .env file in the backend folder and change the following if needed:
PORT server port
SV_HOST server host
SECRETKEY bcrypt key to incrypt passwords

now to run server, enter backend folder and run: npm start

to start frontend, enter frontend folder and run: npm run serve

if you wanna access the app from another device change the VUE_APP_API_HOST from the .env file in the frontend folder to the ip of the device running the server
