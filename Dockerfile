FROM node:22

# Create a working directory
WORKDIR /app

# copy directly in docker image using regex i.e. both files package.json and package-lock.json
COPY package*.json ./

# install the dependency
RUN npm install

# Bundle app source (all files from source i.e. local device and paste in docker image)
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]