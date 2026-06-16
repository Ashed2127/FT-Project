FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (including nodemon for dev)
RUN npm install

# Copy source code
COPY . .

EXPOSE 8081

# Use nodemon as in package.json
CMD ["npm", "start"]