package com.secretescapes.favourites;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.secretescapes.model.Favourites;
import com.secretescapes.repositories.FavouritesRepo;

@SpringBootApplication(scanBasePackages="com.secretescapes")
@ComponentScan(basePackages = {"com.secretescapes.controller", "com.secretescapes.favourites"})
@EntityScan(basePackageClasses = {Favourites.class})
@EnableJpaRepositories(basePackageClasses = {FavouritesRepo.class})
public class FavouritesApplication {

	public static void main(String[] args) {
		SpringApplication.run(FavouritesApplication.class, args);
	}

}
