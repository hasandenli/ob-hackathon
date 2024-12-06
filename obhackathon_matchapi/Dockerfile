FROM node:18-alpine

RUN apk add --no-cache bash


WORKDIR /usr/src/app

COPY ./app/package*.json ./


COPY ./app/* .

RUN npm install


EXPOSE 3000

CMD ["npm", "run", "dev"] 
# entrypoint tail -f /dev/null
