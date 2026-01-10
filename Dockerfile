FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the application using shell form to expand PORT variable
CMD npm run start
