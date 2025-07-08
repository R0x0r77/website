package com.kosiorek.website;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebsiteApplication.class, args);
	}

	@PostConstruct
	public void printEnvVars() {
		System.out.println("PORT: " + System.getenv("PORT"));
		System.out.println("DB URL: " + System.getenv("SPRING_DATASOURCE_URL"));
		System.out.println("DB USER: " + System.getenv("SPRING_DATASOURCE_USERNAME"));
	}

}
