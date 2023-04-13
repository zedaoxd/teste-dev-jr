FROM maven:3.8.5-openjdk-17 as buildstage
RUN mkdir /opt/note
WORKDIR /opt/note
COPY . .
RUN mvn clean package

FROM openjdk:17
WORKDIR /app
COPY --from=buildstage /opt/note/target/backend-1.0.0.jar .
ENTRYPOINT ["java", "-jar", "backend-1.0.0.jar"]
