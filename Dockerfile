FROM node:10.13

LABEL Description="An application which manages messages and provides details about those" \
  Name="Messenger" \
  Version="1.0"

EXPOSE 8080

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install --quiet --production
COPY . /usr/src/app/

CMD [ "npm", "start" ]
