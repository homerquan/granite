# convospot-api

## Installation

Clone the repository and run the following commands under your project root:

```shell
npm install
npm start
```


## Dev mode 

### Using Docker

```
docker run -d --hostname rmq --name rabbitmq -e RABBITMQ_DEFAULT_VHOST=seneca -p 15672:15672 -p 5672:5672 rabbitmq:3-management

docker run --name mongo -p 27017:27017 -d mongo

docker run --name redis -e ALLOW_EMPTY_PASSWORD=yes -p 6379:6379 -d bitnami/redis:latest
```

## Docker

```shell
docker build . -t "convospot-api"
docker run -d -p 3000:3000 -t convospot-api
```

## Reference

* https://github.com/ghaiklor/generator-sails-rest-api