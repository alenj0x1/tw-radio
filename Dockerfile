FROM node:alpine3.20

WORKDIR /app
RUN mkdir music

COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
