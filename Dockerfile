# Stage 1: Build Angular
FROM node:22-alpine AS angular-builder

WORKDIR /app

COPY my-website-angular/package*.json .

RUN npm ci

COPY my-website-angular/ .

RUN npm run build


# stage 2: Build Spring Boot app and copy Angular
FROM maven:eclipse-temurin AS builder

WORKDIR /app

COPY website-backend/ website-backend/

COPY --from=angular-builder /app/dist/my-website-angular/browser /app/website-backend/src/main/resources/static/

WORKDIR /app/website-backend

RUN mvn clean package -DskipTests


# Stage 3: Runtime container
FROM eclipse-temurin:21

WORKDIR /app

COPY --from=builder /app/website-backend/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]