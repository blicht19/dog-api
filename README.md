This project is based on the [NestJS TypeScript starter](https://github.com/nestjs/typescript-starter)

## Run the project

```bash
# Run in development mode and watch for changes
$ docker compose -f dev.yml up --watch

# Run in "production" mode
$ docker compose -f prod.yml up
```

You can test the endpoints with the autogenerated Swagger-UI page at localhost:3000/swagger-ui

The pgAdmin console is accessible at localhost:3001 and can be used to manage the database. To connect pgAdmin to the Postgres database:

- Log in to pgadmin using the PGADMIN_EMAIL and PGADMIN_PASSWORD values set in the .env file
- Right click on servers and click Register > Server
- Enter any name you want for the server
- Click the connection tab at the top of the popup window and set Host name/address to db, Port to 5432 (should be default), Username to the value of POSTGRES_USER in the .env file, and Password to the value of POSTGRES_PASSWORD in the .env file
- Click Save
