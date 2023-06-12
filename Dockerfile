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

ENV DB_NAME=my_db
ENV DB_HOST=database-1.c0sppty9yvmg.ap-south-1.rds.amazonaws.com
ENV DB_PORT=3306
ENV DB_USER=admin
ENV DB_PASS=appnox.ai

# Command To Run
CMD [ "npm", "run" ,"dev-server"]
