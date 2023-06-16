package com.secretescapes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.secretescapes.model.Favourites;

@Repository
@RepositoryRestResource
public interface FavouritesRepo extends CrudRepository<Favourites, Long> {

    @Query("select u.saleId from Favourites u where u.userId = :userId and u.saleId is not null")
    List<String> findAllByUserId(@Param("userId") String userId);

    @Query("select u.id from Favourites u where u.userId = :userId and u.saleId = :saleId")
    Long findByUserIdAndSaleId(@Param("userId") String userId, @Param("saleId") String saleId);
}
