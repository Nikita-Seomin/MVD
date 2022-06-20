FROM node
WORKDIR /mvd
COPY . .
RUN npm ci
CMD ["npm", "start"]