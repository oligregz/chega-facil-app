FROM node:18

WORKDIR /app/api

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y wait-for-it

COPY start.sh /start.sh

RUN chmod +x /start.sh

EXPOSE 5000

CMD ["/start.sh"]