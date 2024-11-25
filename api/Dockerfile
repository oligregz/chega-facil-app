FROM node:18

WORKDIR /app/api

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y wait-for-it

COPY start.sh /start.sh
COPY build-container-first.sh /app/api/build-container-first.sh
COPY build-container.sh /app/api/build-container.sh


RUN chmod +x /start.sh && \
  chmod +x /app/api/build-container-first.sh && \
  chmod +x /app/api/build-container.sh

EXPOSE 5000

CMD ["/start.sh"]