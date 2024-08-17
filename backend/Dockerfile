# Use an official Node.js runtime as a parent image
FROM node:20

# The WORKDIR command ensures that the /usr/src/app directory is created and set as the working directory before any COPY or RUN commands are executed.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]
