package com.secretescapes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.secretescapes.model.User;


@Repository
@RepositoryRestResource
public interface UserRepo extends CrudRepository<User,String> {

}
