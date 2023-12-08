# Utilisez une image Node.js en tant que base
FROM node:20.9.0-alpine

# Définissez le répertoire de travail
WORKDIR /app

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install -g pnpm
RUN pnpm install

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application Next.js
RUN pnpm run build

# Exposez le port sur lequel l'application sera en cours d'exécution
EXPOSE 7555

# Démarrez l'application
CMD ["pnpm", "start", "7555"]
