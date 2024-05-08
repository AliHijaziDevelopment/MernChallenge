# Use official Node.js image as the base image
FROM node:latest

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vite production build
RUN npm run build

# Expose port 3000 for the Vite server
EXPOSE 3000

# Command to start the Vite server
CMD ["npm", "run", "serve"]
