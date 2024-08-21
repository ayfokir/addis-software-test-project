
# Use a minimal base image
#debian: Indicates the base image is from the Debian Linux distribution.
#bullseye: Specifies the Debian release version (Debian 11).
#-slim: Denotes a minimal version of the Debian image, with fewer packages and a smaller, needed to run a basic Debian environment 
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

# Optional Health Check
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1

# Optional: Non-root user
#it’s highly recommended for production environments,
# especially if your application is exposed to the internet or interacts with external systems.
# RUN useradd -m myuser
# USER myuser
