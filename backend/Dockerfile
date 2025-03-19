# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json .

# Install dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Expose the port that app runs on
EXPOSE 2100

# Define command to run the application
CMD ["node", "./src/server.js"]
