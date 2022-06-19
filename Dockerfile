FROM node
WORKDIR /APP
COPY . .
RUN npm ci
RUN echo 'hi'
CMD ["npm", "start"]