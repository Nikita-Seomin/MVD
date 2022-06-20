FROM node
WORKDIR /mvd
COPY . .
RUN npm ci