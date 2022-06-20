FROM node
WORKDIR /mvd
COPY . .
RUN cd /mvd
RUN npm ci
CMD ["npm", "start"]