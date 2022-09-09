FROM node:slim
#ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install --global nodemon
RUN npm install && mv node_modules ../
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD npm run dev
