FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma compatibility
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Copy static files for standalone mode
RUN cp -r public .next/standalone/ || true
RUN cp -r .next/static .next/standalone/.next/ || true

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

EXPOSE 8080

WORKDIR /app/.next/standalone

# Start the standalone server
CMD ["node", "server.js"]
