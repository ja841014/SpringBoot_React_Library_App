package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.requestmodels.AddBookRequest;
import com.selflearn.springbootlibrary.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    @PostMapping("/secure/book")
    public void addNewBook(@RequestBody AddBookRequest addBookRequest, JwtAuthenticationToken jwtAuthenticationToken) throws Exception{
        System.out.println("Post /api/admin/secure/book" );
        String userType = jwtAuthenticationToken.getToken().getClaims().get("userType").toString();
        if(userType == null || !userType.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.postNewBook(addBookRequest);
    }
}
