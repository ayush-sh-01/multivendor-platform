# Multi-Stage Dockerfile for Cloud Deployment (Render, Railway, Fly.io)
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven Wrapper and POM first to leverage Docker layer caching
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x ./mvnw

# Copy source code and build production JAR
COPY src src
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimalist, Secure Runtime Container
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Cloud Port Configuration
EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]
