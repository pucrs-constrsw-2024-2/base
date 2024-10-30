FROM maven:3.9.4-amazoncorretto-21 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /oauth

# Copia o arquivo pom.xml para o diretório de trabalho
COPY pom.xml .

# Baixa as dependências do Maven (isto é separado para aproveitar o cache de dependências)
RUN mvn dependency:go-offline

# Copia todo o código-fonte para o diretório de trabalho
COPY src ./src

# Compila o projeto usando Maven
RUN mvn package -DskipTests

# Segunda etapa para criar a imagem final do Docker
FROM amazoncorretto:21-alpine-jdk

# Define o diretório de trabalho como /app
WORKDIR /oauth

# Copia o arquivo JAR construído na primeira etapa
COPY --from=build /oauth/target/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8080

# Specify the command to run your service
CMD ["java", "-jar", "app.jar"]
