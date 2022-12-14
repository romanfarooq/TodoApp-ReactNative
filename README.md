# TODO APP -- React Native

## Description
This is a simple todo app built with React-Native implemented with Mern Stack.


## clone or download
```terminal
$ git clone https://github.com/romanfarooq/TodoApp-ReactNative.git
$ npm install
```

## project structure
```terminal
README.md
server/
   package.json
   .gitignore
client/
   package.json
   .env (create .env file, check [Configuration and Setup session])
   .gitignore
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

In the terminal
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
CLOUD_API_KEY =
CLOUD_API_SECRET =
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Technologies
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
