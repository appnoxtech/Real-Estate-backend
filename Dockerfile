FROM node:18

WORKDIR /realEstate

# Install Packages
COPY package*.json ./

# Running The Command
RUN npm install

# Bundle app source
COPY . .

# Expose The PORT NUMBER
EXPOSE 8000

# Command To Run
CMD [ "npm", "run" ,"dev-server"]
