# convospot-api

## Installation

Clone the repository and run the following commands under your project root:

```shell
npm install
npm start
```

## Test

In redis 

PUBLISH a234d4ce-84c8-4e74-9d3b-a0d3f5ce3d6c 

{"text":"hello homer","source":"user","conversation":"5b23830d-b168-4ae6-93e2-c0e1ffafdc80", "visitor":"a234d4ce-84c8-4e74-9d3b-a0d3f5ce3d6c","helper":"230c1b80-95d7-417f-a926-62c7e1d99929"}

## Dev mode 

### Using Docker

```
docker run -d --hostname rmq --name rabbitmq -e RABBITMQ_DEFAULT_VHOST=seneca -p 15672:15672 -p 5672:5672 rabbitmq:3-management

docker run --name mongo -p 27017:27017 -d mongo

docker run --name redis -e ALLOW_EMPTY_PASSWORD=yes -p 6379:6379 -d bitnami/redis:latest
```

* Rabbitmq management login: guest/guest

## Docker

```shell
docker build . -t "convospot-api"
docker run -d -p 3000:3000 -t convospot-api
```

## Reference

* https://github.com/ghaiklor/generator-sails-rest-api
