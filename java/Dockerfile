# Start with a base image containing Java runtime
FROM maven:3.8.1-openjdk-17-slim AS build

# Make the project's directory our current directory
WORKDIR /app

# Copy the pom.xml file to download dependencies
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy the rest of the project's files
COPY src ./src

# Package the application
RUN mvn package -DskipTests

# Start with a base image containing Java runtime
FROM openjdk:17-jre-slim

# Make the project's directory our current directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]