FROM node:7.5.0

RUN apt-get update && apt-get install -y build-essential

ENV APP_HOME /usr/src/app

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD package.json $APP_HOME
RUN npm install -g node-gyp pm2
RUN npm install

ADD . $APP_HOME

EXPOSE 3000
EXPOSE 9615
CMD ["pm2-docker", "process.json", "--web"]

