package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.ProgramService;
import com.terabite.authorization.service.ProgramWeek;
import com.terabite.authorization.service.SignupService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordHelper forgotPasswordHelper;
    private final ProgramService programService;

    public AuthorizationController(ForgotPasswordHelper forgotPasswordHelper, LoginService loginService, SignupService signupService, ProgramService programService) {
        this.forgotPasswordHelper = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
        this.programService = programService;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody UserInformation userInformation) {
        return signupService.signup(userInformation);
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {
        return loginService.login(login);
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }

    @PutMapping("/forgot_password")
    public ResponseEntity<String> forgotPassword(@RequestBody String jsonEmail) {
        return forgotPasswordHelper.processForgotPassword(jsonEmail);
    }

    @PutMapping("/reset_password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String jsonPassword) throws LoginNotFoundException {
        return forgotPasswordHelper.processResetPassword(token, jsonPassword);

    }

    @PutMapping("/program_week")
    public ResponseEntity<?> programWeekPost(@RequestBody ProgramWeek programWeek) {
        return programService.createNewProgramWeek(programWeek);
    }

    @PostMapping("/program_week")
    public ResponseEntity<?> programWeekPut(@RequestBody ProgramWeek programWeek) {
        return programService.updateProgramWeek(programWeek);
    }

    @GetMapping("/program_week")
    public ResponseEntity<?> getProgramWeekByName(@RequestBody String jsonWeekName) {
        return programService.getProgramWeek(jsonWeekName);
    }

    @DeleteMapping("/program_week")
    public ResponseEntity<?> deleteProgramWeekByName(@RequestBody String jsonWeekName){
        return programService.deleteProgramWeek(jsonWeekName);
    }
    
    
}
