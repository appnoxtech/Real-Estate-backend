# Stage: dependencies
FROM node:16-alpine AS dependencies
WORKDIR /user
# Install Packages
COPY package*.json ./
# Running The Command
RUN npm install
# Stage: builder
FROM node:16-alpine AS builder
WORKDIR /user
# Copy dependencies from the dependencies stage
COPY --from=dependencies /user/node_modules ./node_modules
# Bundle app source
COPY . .
# Expose The PORT NUMBER
EXPOSE 5000
# Command To Run
CMD [ "npm", "run", "dev-server" ]