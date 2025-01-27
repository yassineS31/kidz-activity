# Utilise une image officielle Node.js comme base
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install --production --legacy-peer-deps


# Copie le reste des fichiers du projet dans le conteneur
COPY . .

# Build Next.js app
RUN npm run build

# Expose le port 3000, sur lequel Next.js est habituellement servi
EXPOSE 3000

# Démarre l'application en mode production
CMD ["npm", "run", "start"]
