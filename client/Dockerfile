FROM node:14.17.0-alpine

# Create app directory
WORKDIR /var/www/frontend

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package.json package-lock.json ./ 
# For NPM use: `RUN npm ci`
RUN npm install

# Copy env
COPY .env.docker /var/www/frontend/.env

# Add storage folder to the container (If you want to add other folder contents to the container)
# ADD storage /var/www/backend/storage

# Entrypoint command - Replace `"yarn"` with `"npm", "run"` if you are using NPM as your package manager.
# You can update this to run other NodeJS apps
CMD ["npm","run","start"]