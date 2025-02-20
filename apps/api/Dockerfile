# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

RUN npm install -g @prisma/cli
# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 7000

# Command to run the application
CMD ["node", "dist/main.js"]