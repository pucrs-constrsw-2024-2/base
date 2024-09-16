FROM gradle:jdk21-alpine

# Set the working directory
WORKDIR /app

# Copy the Gradle wrapper and pom.xml
COPY settings.gradle ./
COPY build.gradle ./
COPY src ./src

EXPOSE 8080

CMD ["gradle", "bootRun"]