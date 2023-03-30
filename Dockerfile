# Use the official Node.js 16-alpine image as the base image
FROM node:16-alpine

# Set the working directory to the root directory of the application
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Set the command to start the application
CMD ["npm", "run", "serve"]
