# Use an official Python base image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy all files into the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (optional, for local Docker)
EXPOSE 5000

# Command to run your Flask app
CMD ["python", "app.py"]
