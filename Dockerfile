FROM node:10-jessie
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm audit fix --force
#COPY . /app
#CMD ["npm", "run", "start:dev"]