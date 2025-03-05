package com.tickethub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TheaterDTO extends BaseDTO {
	private String name;
	private String location;
//	private TheaterOwnerDTO theaterOwnerDTO;
}
