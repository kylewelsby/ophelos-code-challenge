# Ophelos Code Challenge

Code Challenge completed by [Kyle Welsby](https://github.com/kylewelsby).

## ⚡️ System Dependencies

This project requires Deno to build and run, follow the
([getting started guide](https://deno.com/manual@v1.33.4/getting_started/installation)).

_At the time of writing the latest stable version of Deno is 1.33.4_

## 🎲 Usage

Within the working directory of this project after checking it out to your local
computer.

Run the following commands.

```
deno task start
```

This will download the dependencies and start the webserver on port 8000

Visit [http://localhost:8000](http://localhost:8000)

## 🧪 Testing

Before running tests, you need to provision a PostgreSQL server and update
`.env` with the postgres URI.

```
# .env
DATABASE_URL=postgres://{user}:{password}@rogue.db.elephantsql.com/{database}
```

Run the unit tests with the following commands.

```
deno test -A
```

_Tests will create and destroy the truncate the database on every test run_

## 🚨 Linting

Deno comes with linting and formatters built in, you can run them with the
following commands

```
deno fmt
deno lint
```

## 🎓 License

MIT: https://kylewelsby.mit-license.org
