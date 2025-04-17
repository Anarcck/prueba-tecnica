# backend/Dockerfile.dev
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install
CMD ["npm", "run", "start:dev"]
