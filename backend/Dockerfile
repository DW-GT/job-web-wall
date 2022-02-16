FROM node:16.13.1
WORKDIR /server
EXPOSE 4000
COPY ./package*.json ./

RUN apt update 
RUN apt install -y graphicsmagick 
RUN npm install gm
RUN npm i


ENV NODE_ENV=production

COPY . .

RUN npm run build

RUN mkdir ./build/uploads

CMD npm run start


