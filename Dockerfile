FROM node
COPY . .
RUN npm ci
CMD ["npm", "start"]