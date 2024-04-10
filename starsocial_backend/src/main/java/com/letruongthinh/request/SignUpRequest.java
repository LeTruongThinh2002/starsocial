package com.letruongthinh.request;

import lombok.Data;

@Data
public class SignUpRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String avatar;
    private String gender;
    private String background;
}
