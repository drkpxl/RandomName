# Use an official Nginx image
FROM nginx:latest

# Copy your files to the Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80
