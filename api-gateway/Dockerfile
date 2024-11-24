# Étape 1 : Utiliser une image Node.js officielle comme base
FROM node:20.17-slim AS builder

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires
COPY ./api/package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers du projet
COPY ./api ./

# Étape 6 : Exposer le port sur lequel l'API Gateway fonctionne
EXPOSE 3000

ENV TZ=Europe/Paris
USER node

# Étape 7 : Démarrer l'application
CMD ["npm", "start"] 
