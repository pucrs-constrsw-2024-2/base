# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /oauth

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Package the application using Maven
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Set the JAR file location (make sure the path matches your final artifact)
ARG JAR_FILE=target/OAuth-0.0.1-SNAPSHOT.jar

# Add the JAR to the container
ADD ${JAR_FILE} app.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
