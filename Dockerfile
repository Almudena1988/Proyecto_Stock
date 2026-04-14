FROM node:24-alpine3.23

#Directorio del trabajo dentro del contenedor. Todo lo que se haga después (COPY, RUN, CMD... ocurre dentro de /home/app)
WORKDIR /home/app

# Copiar package.json primero para caché de npm install
COPY package*.json ./

RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer puerto
EXPOSE 4000

CMD ["npm", "start"]


