package com.letruongthinh.request;

import lombok.Data;

@Data
public class ResetPassword {


    private String token;

    private String password;
    private String confirmPassword;
}
