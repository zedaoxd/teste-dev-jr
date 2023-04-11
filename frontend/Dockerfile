FROM node:18

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["yarn", "dev", "--host", ""]
