# Étape 1 : Utiliser une image de base Node.js
FROM node:14

# Étape 2 : Met à jour le système et installe netcat
RUN apt-get update && apt-get install -y netcat

# Étape 3 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 4 : Copier les fichiers package.json et package-lock.json
COPY ../api/package*.json ./

# Étape 5 : Installer les dépendances
RUN npm install

# Étape 6 : Copier le reste des fichiers de l'application
COPY ../api ./

# Étape 7 : Exposer le port sur lequel l'application sera disponible
EXPOSE 3004

# Étape 8 : Démarrer l'application
CMD ["npm", "start"]
