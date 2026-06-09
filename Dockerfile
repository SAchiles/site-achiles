FROM nginx:alpine

# Copia todos os arquivos do seu repositório para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do servidor web
EXPOSE 80
