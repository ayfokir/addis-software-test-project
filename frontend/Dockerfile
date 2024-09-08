# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port the frontend runs on
EXPOSE 3000

# Command to start the frontend server
CMD ["npm", "start"]
