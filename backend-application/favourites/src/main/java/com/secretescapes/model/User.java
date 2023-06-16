package com.secretescapes.model;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="User")
@Data
public class User {
     
    @Id
    @Column(name="userId")
    String userId;

  @OneToMany(cascade = CascadeType.REMOVE)
  private List<Favourites> favourites;
}
