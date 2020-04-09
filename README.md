This is my basic project using `NodeJS`, `MongoDB` and `Material-css`

To run you can use your local mongodb with defaults, and it will start or you
can setup online instance many pass available for free.

Please copy env-sample to .env and modify your configuration.

Run follwoing commands to setup
`> yarn install`

## To populate data

Essential database required table has be put in populatedb script, which adds
all city, states and currency information. Please replace mongodb_url with your
db urls.

```
> node populateDB mongodb_url
```

## To start

`yarn start`

You can browser localhost:3000 to see.
