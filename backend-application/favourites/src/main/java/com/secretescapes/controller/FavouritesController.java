package com.secretescapes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.secretescapes.model.Favourites;
import com.secretescapes.model.User;
import com.secretescapes.repositories.FavouritesRepo;
import com.secretescapes.repositories.UserRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
class FavouritesController {

    @Autowired
    private FavouritesRepo favouritesRepo;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/getFavourites/{userId}")
    public ResponseEntity<?> getFavourites(@PathVariable("userId") String userId) {
        List<String> list = favouritesRepo.findAllByUserId(userId);
        if (list == null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(path = "/addFavourite", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> addFavourite(@RequestBody Favourites favourite) {
        User user = new User();
        user.setUserId(favourite.getUserId());
        if (userRepo.findById(favourite.getUserId()) == null) {
            userRepo.save(user);
        }
        if (favouritesRepo.findByUserIdAndSaleId(favourite.getUserId(), favourite.getSaleId()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(favouritesRepo.save(favourite), HttpStatus.CREATED);
    }

    @PostMapping(path = "/removeFavourite", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> removeFavourite(@RequestBody Favourites favourite) {
        Long id = favouritesRepo.findByUserIdAndSaleId(favourite.getUserId(), favourite.getSaleId());
        favouritesRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

}