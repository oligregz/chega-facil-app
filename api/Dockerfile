FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY create-env.sh /create-env.sh

RUN chmod +x /create-env.sh

RUN /create-env.sh

RUN apt-get update && apt-get install -y wait-for-it

# Copy o script start.sh for container
COPY start.sh /start.sh

# Add execution permission
RUN chmod +x /start.sh

EXPOSE 5000

# Exec init strater script
CMD ["/start.sh"]
