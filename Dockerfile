# Use a Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Start the app in watch mode with pnpm
CMD ["pnpm", "run", "start:dev"]
