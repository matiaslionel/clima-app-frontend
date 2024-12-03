# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto 3000
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
