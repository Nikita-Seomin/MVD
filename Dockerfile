FROM node
WORKDIR /APP
COPY . .
RUN npm ci
CMD ["npm", "start"]