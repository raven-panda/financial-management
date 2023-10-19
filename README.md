# Finance Management (WIP)

![made-by-me](https://github.com/raven-panda/ressources/blob/main/badges/made-by-me.svg)

The goal of this Angular project is to create an application where the user can manage their investments.

## Features

- **Investment Overview**: The main objective of this project is to allow users to manage their investments efficiently. You can visualize both your financial and real estate investments in one place.

- **Dashboard**: The homepage serves as a comprehensive dashboard that provides a summary of your investments. It includes two cards, one for real estate and one for financial investments. Each card displays the respective total investment amount and a graphical representation.

- **Investment Charts**: There are two types of graphical representations for your investments. For real estate investments, a bar chart is used to showcase the distribution of investments, and for financial investments, a donut chart demonstrates the allocation of funds (e.g., 70% in the current account, 20% in a savings account, and 10% in other investments).

- **Financial and Real Estate Pages**: The project includes separate pages for managing financial and real estate investments. These pages provide users with the ability to add new investment products and view detailed information about existing investments.

## API Rest & MySQL Database

Datas are retrieved from a MySQL database through a small REST API. Both of these services run using a Docker Compose setup.

- The API is built in PHP and runs on a [php:apache-bullseye](https://hub.docker.com/_/php) service.

- The database is hosted on a [MySQL](https://hub.docker.com/_/mysql) service.

### Endpoints

- `GET:/api` : get a list of all endpoints.

- `GET:/api/financials` : get a list of all Financials investment stored.

- `POST:/api/financials` : insert a new Financial investment in the database.

- `GET:/api/estates` : get a list of all Real Estates investment stored.

- `POST:/api/estates` : insert a new Real Estate investment in the database.

- `DELETE:/api/*` endpoints are useless for now.

## Getting Started

- First, you may need to install Angular CLI globaly ([Angular Docs](https://angular.io/guide/setup-local)) :

```
npm install -g @angular/cli
```

- And I recommand you to install docker Docker if you want to use the backend server. You can do this on their [official website](https://www.docker.com/get-started/).

### To get started with this project, follow these steps:

1. Clone the repository to your local machine :

```
git clone https://github.com/raven-panda/financial-management.git ./
```

2. Install the required dependencies :

```bash
npm install
```

3. Start the Angular application :

```bash
npm run start

# or if you use Angular CLI

ng serve
```

4. Now you need to start the backend server. You can use docker for that. Type these commands in your terminal :

- Make sure that your **80** and **3307** ports are not busy ! Or change them in the `docker-compose.yml` file

```bash
docker compose --project-directory ./back up --build -d

# or

cd ./back
docker compose up --build
```

5. If it was successful, you're good to go ! Open your web browser and navigate to http://localhost:4200/ to access the application.

## Technologies Used

This project uses :

- **Angular** to run the frontend

- **Highcharts library for Angular** to create interactive and informative investment charts

- **Docker** to run the backend server

- **MySQL** for the database

- And the API is written in **PHP** language, and runs in a *php:apache* container.