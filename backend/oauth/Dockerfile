FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Gradle wrapper and pom.xml
COPY .gradle/ .gradle/
COPY gradle/ gradle/
COPY gradlew ./
COPY settings.gradle ./
COPY build.gradle ./

# Run the Spring Boot application with DevTools enabled
RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix ./gradlew

# Make the Gradle wrapper executable
RUN chmod +x gradlew

# Build the project
# RUN ./gradlew build

COPY src ./src

EXPOSE 8080

CMD ["./gradlew", "bootRun"]