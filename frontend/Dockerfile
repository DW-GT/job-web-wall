FROM node:16.13.1
WORKDIR /server
EXPOSE 4000
COPY ./package*.json ./



RUN npm i



ENV NODE_ENV=production



COPY . .



RUN npm run build



CMD npm run start