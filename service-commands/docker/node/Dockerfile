# Étape 1 : Utiliser une image de base Node.js
FROM node:14

# Met à jour le système et installe netcat
RUN apt-get update && apt-get install -y netcat

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY ../api/package*.json ./
COPY ../api .

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers de l'application
COPY . .

# Étape 6 : Exposer le port sur lequel l'application sera disponible
EXPOSE 3000

# Étape 7 : Démarrer l'application
CMD ["npm", "start"]
