FROM node:20.17-slim AS builder

# Définir le répertoire de travail
WORKDIR /home/node/app

# Copier le package.json et package-lock.json
COPY ./api/package*.json ./

# Installer les dépendances (inclut devDependencies)
RUN npm install

# Copier le reste des fichiers de l'application
COPY ./api ./

# Construire l'application si nécessaire (décommente si tu as un script build)
# RUN npm run build

# Exposer le port
EXPOSE 3003
ENV TZ=Europe/Paris
USER node

# Démarrer l'application
CMD ["npx", "nodemon", "app.js"]
