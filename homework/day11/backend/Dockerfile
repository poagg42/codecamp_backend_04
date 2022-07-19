FROM node:14

WORKDIR /mini_backend/
COPY ./package.json /mini_backend/
COPY ./yarn.lock /mini_backend/
RUN yarn install

COPY . /mini_backend/
CMD yarn dev 

