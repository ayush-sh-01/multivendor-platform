# Multi-Stage Dockerfile for Cloud Deployment
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven Wrapper and POM first
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x ./mvnw

# STEP 1: Download ALL dependencies into a separate cached layer
# This ensures PostgreSQL driver JAR is downloaded before building
RUN ./mvnw dependency:resolve -q --no-transfer-progress

# STEP 2: Copy source code and build the fat JAR
COPY src src
RUN ./mvnw clean package -DskipTests --no-transfer-progress

# Verify PostgreSQL driver IS inside the fat JAR (will print if found)
RUN jar tf target/*.jar | grep postgresql || echo "WARNING: postgresql driver not found in JAR!"

# Stage 2: Minimalist, Secure Runtime Container
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]
