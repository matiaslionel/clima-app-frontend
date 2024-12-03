# Proyecto práctico para HotelGest: Clima

Este proyecto utiliza Docker para facilitar la instalación y ejecución de la aplicación React y NestJS.

## Requisitos previos

Asegúrate de tener Docker instalado en tu sistema. Puedes descargarlo desde [aquí](https://www.docker.com/products/docker-desktop).

## Instrucciones de instalación

Sigue estos pasos para construir y ejecutar la aplicación utilizando Docker:

1. **Clonar el repositorio**

   Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/matiaslionel/clima-app-frontend.git
   cd clima-app-frontend
   ```

2. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3001
   REACT_APP_BACKEND_URL=http://localhost:3000
   ```

3. **Construir la imagen de Docker**

   ```bash
   docker build -t clima-app-backend .
   ```

4. **Ejecutar el contenedor**

   ```bash
   docker run -p 3001:3001 --env-file .env clima-app-backend
   ```

## Acceso a la aplicación

La aplicación estará disponible en:

```
http://localhost:3001
```

## Endpoints disponibles

- `GET /clima`: Obtiene información del clima

## Notas adicionales

- Asegúrate de que el puerto 3001 no esté siendo utilizado por otra aplicación
- Para desarrollo local, puedes usar `npm start` y para producción `npm run build` y luego servir la carpeta build con el comando `serve -s build`
- El backend debe estar ejecutándose en el puerto 3000 para que la aplicación funcione correctamente
