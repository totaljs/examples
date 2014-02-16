# Deploy total.js app on Heroku

- __release.js__ is an initial script
- __Procfile__ is for Heroku (their internal service)

## Important

- __config-release__ can't contain parameter: ~~default-ip~~ and ~~default-port~~

## Deploy (first)

> Heroku documentation: https://devcenter.heroku.com/articles/getting-started-with-nodejs

```
$ git init
$ git add .
$ git commit -m "first commit"
$ git push heroku master
```

## Deploy (update)

```
$ git add .
$ git commit -m "next update"
$ git push heroku master
```

## Watch Heroku live logs

```
$ heroku logs
```