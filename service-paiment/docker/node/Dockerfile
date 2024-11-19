# Utiliser l'image Node.js officielle
FROM node:20.17-slim

# Créer un dossier de travail
WORKDIR /home/node/app/api

# Copier le package.json et package-lock.json
COPY ./api/package.json ./

# Installer les dépendances
RUN npm install --ignore-scripts

# Copier le reste du code
COPY ./api/ ./

# Exposer le port (par exemple 3000)
EXPOSE 3010

# RUN npm start

ENV TZ=Europe/Paris

#pour que l utilisateur ne soit pas root => couche de securite : l utilisateur node n a pas les droits de faire des install
USER node

# Commande pour démarrer l'application
CMD ["npm", "start"]
