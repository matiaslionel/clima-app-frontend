# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias y serve globalmente
RUN npm install && npm install -g serve

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto 3001
EXPOSE 3001

# Servimos la aplicación usando la ruta completa a serve
CMD ["npx", "serve", "-s", "build", "-l", "3001"]