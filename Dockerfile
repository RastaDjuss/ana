FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN pnpm install --production

# Copy app source
COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
