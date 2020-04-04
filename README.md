# DocOnTap - Disease Diagnostic and Appointment System

DocOnTap is a full-stack web application that helps patients and doctors to efficiently execute healthcare operations.

### Prerequisites

Following are prerequisites to be installed:

1. Node
2. NPM
3. PostgreSQL (An instance up and running on the default port)

## Quick Start

1. Install server dependencies by running the following in the root directory

```bash
npm install
```

2. Install Sequelize CLI to run migrations:

```bash
npm install --save-dev sequelize-cli
```

3. Set-up database configs in /server/config/config.json (Development):

```js
  "development": {
    "username": "<db_user_name>",
    "password": "<db_user_name_password>",
    "database": "<database_name>",
    "host": "<hosturl>",
    "dialect": "<db>",
    "logging": false
  }
```

Defaults are as follows:

```js
  "development": {
    "username": "root",
    "password": "root",
    "database": "doc_on_tap",
    "host": "127.0.0.1",
    "dialect": "postgresql",
    "logging": false
  }
```

To give a port other than the default, just add a "port" key in the above object, for example:

```js
  "development": {
    "username": "root",
    "password": "root",
    "database": "doc_on_tap",
    "host": "127.0.0.1",
    "dialect": "postgresql",
    "port": "1234",
    "logging": false
  }
```

4. Run the migrations by:

```bash
cd server
sequelize db:migrate
```

5. Install client dependencies by:

```bash
cd ..
cd client
npm install
```

6. Go back to root directory and run the following:

```bash
cd ..
npm run dev
```

This will run both server and client from root. Enjoy!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

- **Sadiq Shah** - [sadiq-shah](https://github.com/sadiq-shah)
- **Fatima Rahman** - [fatimaafridi](https://github.com/fatimaafridi)
- **Adil Waqar** - [adil-waqar](https://github.com/adil-waqar)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
