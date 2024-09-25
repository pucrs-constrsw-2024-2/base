# Build Stage
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Run swagger-autogen to generate the swagger_output.json file
RUN npm run swagger-autogen

# Build the TypeScript application
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the generated swagger_output.json file
COPY --from=builder /app/swagger_output.json ./

# Expose the port your app runs on (adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/index.js"]