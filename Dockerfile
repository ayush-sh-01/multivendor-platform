# Stage 1: Build the application using Maven
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the JAR file (this bundles the backend and static frontend)
RUN mvn clean package -DskipTests

# Stage 2: Create the lightweight runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the executable JAR from the build stage
COPY --from=build /app/target/multivendor-platform-0.0.1-SNAPSHOT.jar app.jar

# Cloud Run injects the PORT environment variable. We expose 8080 as a default.
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
