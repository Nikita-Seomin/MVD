FROM node
WORKDIR /mvd
COPY . .
RUN npm ci
RUN npm test
