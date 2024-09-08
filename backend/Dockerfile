
# Use a minimal base image
# When you write FROM node, you are specifying that you want to use the official Node.js image as your base image. This image typically includes:
# 1, A minimal Linux-based operating system (like Debian or Alpine). 2, A specific version of Node.js pre-installed.
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

#create a volume directory 
#RUN mkdir data

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container 
COPY . . 

# Expose the port the app runs on
#  when we run this application inside a docker container , we should map a port on the host machine to  port 3000 on inside the container. This is done with the EX
EXPOSE 3000 

# set environment variable
ENV PORT=8000
ENV MONGODB_URI=mongodb+srv://Ayfo:test@cluster0.e8c2i9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Command to run the application, belowe command is run in Exec form not Shell form
CMD [ "node", "app.js" ]

# Optional Health Check
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1
# Install user management utilities
RUN apk add --no-cache shadow
# Optional: Non-root user 
#it’s highly recommended for production environments, especially if your application is exposed to the internet or interacts with external systems.
# the above all instruction execute as root user here the user change to newUser
RUN useradd -m newUser
USER newUser