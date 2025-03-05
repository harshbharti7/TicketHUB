package com.tickethub.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter  
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class TheaterOwner extends BaseEntity {
	@Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Enumerated(EnumType.STRING)
	private Role role=Role.THEATER_OWNER;
    
    @Column(name = "password", nullable = false)
	private String password;  

    @OneToMany(mappedBy = "theaterOwner", cascade = CascadeType.ALL)
    private List<Theater> theaters;
}
