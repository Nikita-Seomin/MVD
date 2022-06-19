FROM node
WORKDIR /APPS/mvd
COPY . .
RUN npm ci
CMD ["npm", "start"]