FROM node
WORKDIR /server
EXPOSE 4000
COPY ./package*.json ./

RUN npm i

ENV NODE_ENV=production

COPY . .

RUN npm run build

RUN mkdir ./build/uploads

CMD npm run start


