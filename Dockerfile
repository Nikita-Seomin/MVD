FROM node
WORKDIR /mvd
RUN cd /mvd
COPY . .
RUN npm ci
CMD ["npm", "start"]