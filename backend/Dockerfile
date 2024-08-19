# # Use an official Node.js runtime as a parent image
# FROM node:20

# # The WORKDIR command ensures that the /usr/src/app directory is created and set as the working directory before any COPY or RUN commands are executed.
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port the app runs on
# EXPOSE 3000

# # Define the command to run the app
# CMD ["node", "app.js"]


# Use a minimal base image
FROM debian:bullseye-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies for Node.js and other utilities
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD [ "node", "app.js" ]
