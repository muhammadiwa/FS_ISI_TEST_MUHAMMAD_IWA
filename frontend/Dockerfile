FROM node:18-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Add network retries and increase timeout for npm install
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --no-fund --loglevel verbose

# Copy the rest of the application
COPY . .

# Build for production
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
