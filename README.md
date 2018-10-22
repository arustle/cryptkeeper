# Introduction
Coinigy incorporates a lot of crypto-currency exchanges into its platform, but it is very limited when trying to organize the different assets.  A user only has a favorite list that they can add assets to.  This project is trying to allow users with a Coinigy account to create their own portfolios and still use the Coinigy platform.

# Getting Started
1.	Installation process
```
yarn install
```

A mysql database is required.  There is a config template file that needs to be renamed to "config.json" and filled out.  It is located in:
```
./database/config/config.template.json // rename
```
Run database migrations:
```
npm run run-migrations
```

Rename the "webpack.config.template.js" file and update the environment variables
```
COIN_API_KEY: [get an API KEY from https://www.coinapi.io]
COINIGY_API_KEY: [requires a Coinigy account],
COINIGY_API_SECRET:[requires a Coinigy account]
```

# Build

```
This project is still in development and the electron app uses the assets served by the Webpack dev server.  Start the Webpack dev server by running:
```
npm run start-dev-server
```

Start the electron app:
```
npm run start
```


