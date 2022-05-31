FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install db-migrate-pg

COPY . /app/

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "run", "start:prod"]