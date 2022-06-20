FROM node
WORKDIR /mvd
COPY . .
RUN ls
RUN npm ci
CMD ["npm", "start"]