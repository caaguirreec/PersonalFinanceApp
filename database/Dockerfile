FROM alpine:latest

WORKDIR /app

# Install SQLite and Python for initialization script
RUN apk add --no-cache sqlite python3 py3-pip

# Create directory for the database
RUN mkdir -p /data

# Copy initialization script
COPY init_db.py /app/

# Set permissions
RUN chmod 777 /data

# Initialize database
RUN python3 /app/init_db.py

# Expose the directory for mounting
VOLUME /data

CMD ["sh", "-c", "while true; do sleep 3600; done"] 