# TODO APP -- Raect Native

## Description
This is a simple todo app built with React-Native implemented with Mern Stack.


## clone or download
```terminal
$ git clone https://github.com/romanfarooq/TodoApp-ReactNative.git
$ npm install
```

## project structure
```terminal
.gitignore
server/
   package.json
   .env (create .env file, check [Configuration and Setup session])
client/
   package.json
   .env (create .env file, check [Configuration and Setup session])
...
```

## Installation

### Client
```terminal
$ cd client          // go to client folder
$ npm install        // npm install packages
$ npm run start      // run it locally

// deployment for client app
$ npm run build      // this will compile the react code using webpack and generate a folder called docs in the root level
```

### Server
```terminal
$ cd server         // go to server folder
$ npm install       // npm install packages
$ npm run dev       // run it locally
```

## Configuration and Setup
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

```
REACT_APP_SERVER_URL = http://localhost:5000
```

In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
PORT = 5000
MONGO_URL =
JWT_SECRET =
JWT_COOKIE_EXPIRE =
OTP_EXPIRES =
SMPT_SERVICE = 
SMPT_USER = 
SMPT_PASS =
CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Acknowledgements
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [React Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Json Web Token](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Nodemailer](https://nodemailer.com/about/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Cloudinary](https://cloudinary.com/)
