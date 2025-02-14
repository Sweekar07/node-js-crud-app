# Running the App Locally

## Prerequisites
Ensure you have installed the following dependencies:
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)

## Clone the Repository
Open a terminal in the directory where you want to clone the project and run:

```sh
git clone https://github.com/Sweekar07/node-js-crud-app.git
```

## Create a `.env` File
Navigate inside the cloned project directory and create a new `.env` file. Add the following lines:

```ini
POSTGRES_DB=any-db-name-value
POSTGRES_USER=any-user-name-value
POSTGRES_PASSWORD=any-password-value
POSTGRES_HOST=node_db
POSTGRES_PORT=5432
NODE_ENV=DEV
JWT_SECRET=your-jwt-secret-key
RANDOM_PIN=xxxx
```

## Start the Local Server
Navigate to the project directory where the `docker-compose.yml` file is located and run:

```sh
docker-compose up --build
```

Once you see a success message indicating that the server and database are running, the setup is complete.

## Stopping the Server
To stop the local server, press `Ctrl + C` in the terminal. Then run the following command to shut down the containers:

```sh
docker-compose down
```

Now your application is properly set up to run locally using Docker! 🚀

