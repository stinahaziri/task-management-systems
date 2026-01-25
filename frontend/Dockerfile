# 1. Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Kopjo skedarët e varësive
COPY package*.json ./
RUN npm install

# Kopjo kodin dhe bëj build
COPY . ./
RUN npm run build

# 2. Runtime stage (Nginx)
FROM nginx:alpine

# KUJDES: Kontrollo nëse pas 'npm run build' krijohet folderi 'dist' apo 'build'
# Nëse përdor Vite, është 'dist'. Nëse përdor Create-React-App, ndryshoje në 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Kjo pjesë rregullon problemin e "404 Not Found" kur përdor React Router
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]