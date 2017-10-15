FROM node:argon

MAINTAINER Homer Quan <contact@homerquan.me>

RUN mkdir /app
COPY . /app
VOLUME ["/app"]
WORKDIR /app
EXPOSE 3000
ENV TWILIO_ACCOUNT_SID SK5a3688b7a15771c2323cd3530273b3ac
ENV TWILIO_AUTH_TOKEN N2xoDjbwbrfN01poBlWmPTUOAk0MG7lw
CMD [ "npm", "start" ]
