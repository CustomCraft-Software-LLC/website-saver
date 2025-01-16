# LinkSaver

Saves website links online database

## Structure

.
├── client-link-saver
│   ├── dist
│   │   ├── assets
│   │   │   └── index-C9KQqcdL.js
│   │   └── index.html
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── theme.js
│   │   ├── components
│   │   │   ├── HomeLoggedIn.jsx
│   │   │   ├── HomeLoggedOut.jsx
│   │   │   ├── LinksList.jsx
│   │   │   ├── LoginButton.jsx
│   │   │   ├── LogoutButton.jsx
│   │   │   └── Navbar.jsx
│   │   ├── contexts
│   │   │   └── Auth0.jsx
│   │   ├── hooks
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── DashboardPage.jsx
│   │   │   └── HomePage.jsx
│   │   └── services
│   │       └── linksService.js
│   ├── structure.txt
│   └── vite.config.js
├── README.md
├── server-link-saver
│   ├── config
│   │   └── config.json
│   ├── controllers
│   │   ├── linkController.js
│   │   └── linkControllerList.js
│   ├── index.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── migrations
│   │   └── 20250104215046-create-links.js
│   ├── models
│   │   ├── index.js
│   │   └── Link.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── routes
│   │   └── index.js
│   ├── seeders
│   ├── structure.txt
│   ├── tests
│   │   └── LinkTest.js
│   └── utils
│       └── validateData.js
└── structure.txt

21 directories, 40 files


## Configuration

1. Overview
This is a full-stack link saver application that allows users to store, manage, and retrieve links. The app utilizes:

React for the front-end.
Node.js/Express for the back-end API.
PostgreSQL as the database (hosted on Render).
Auth0 for user authentication.
2. Setup Instructions
2.1 Prerequisites
Ensure the following are installed on your system:

Node.js (LTS version recommended)
npm or yarn
Git
A Render account for hosting the PostgreSQL database
An Auth0 account for authentication
2.2 Download the Project
Download the ZIP file from the provided link or repository.
Extract the ZIP file to your desired directory.
2.3 Setting Up Auth0
Log in to your Auth0 account.
Create a new Application:
Application Type: Single Page Application.
Add the callback URL: http://localhost:5173 (or your deployed client URL).
Add the logout URL: http://localhost:5173.
Create a new API:
Name: Link Saver API.
Identifier: https://link-saver-api (or your custom API URL).
Select the signing algorithm: RS256.
Update permissions:
Add a scope: read:links, write:links, or others as needed.
Retrieve the following details from the Auth0 dashboard:
Domain
Client ID
Client Secret
API Identifier
2.4 Setting Up the PostgreSQL Database on Render
Log in to your Render account.
Navigate to Databases and click Create a New Database.
Configure the database:
Database type: PostgreSQL.
Name: link-saver-db.
Region: Select a region near your server deployment.
Save the connection string provided (e.g., postgres://<username>:<password>@<host>:<port>/<database>).
2.5 Configure Environment Variables
Server-Side: server-link-saver/.env
Create a .env file in the server-link-saver directory:

env
Copy
Edit
PORT=5000
DATABASE_URL=<render-postgresql-connection-string>
AUTH0_DOMAIN=<auth0-domain>
AUTH0_AUDIENCE=<auth0-api-identifier>
AUTH0_CLIENT_ID=<auth0-client-id>
AUTH0_CLIENT_SECRET=<auth0-client-secret>
Client-Side: client-link-saver/.env
Create a .env file in the client-link-saver directory:

env
Copy
Edit
VITE_AUTH0_DOMAIN=<auth0-domain>
VITE_AUTH0_CLIENT_ID=<auth0-client-id>
VITE_AUTH0_AUDIENCE=<auth0-api-identifier>
VITE_BACKEND_URL=http://localhost:5000/api
2.6 Install Dependencies
Client
bash
Copy
Edit
cd client-link-saver
npm install
Server
bash
Copy
Edit
cd server-link-saver
npm install
2.7 Migrate and Seed the Database
Run the following commands in the server-link-saver directory:

bash
Copy
Edit
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
2.8 Start the Application
Server
bash
Copy
Edit
cd server-link-saver
npm start
Client
bash
Copy
Edit
cd client-link-saver
npm run dev
3. Testing
Run the tests for the back-end:

bash
Copy
Edit
cd server-link-saver
npm test
4. Tech Stack
Client:
React
Vite
Server:
Node.js
Express
Sequelize (ORM)
Database:
PostgreSQL (hosted on Render)
Authentication:
Auth0