FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_API_URL="http://localhost:4001/api"
ENV NODE_ENV="production"

RUN npm run build
