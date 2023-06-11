package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.requestmodels.AddBookRequest;
import com.selflearn.springbootlibrary.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
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

        System.out.println("Post /api/admin/secure/book");
        String userType = jwtAuthenticationToken.getToken().getClaims().get("userType").toString();
        if(userType == null || !userType.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.postNewBook(addBookRequest);
    }

    @PutMapping("/secure/book")
    public void changeBookQuantity(@RequestParam Long bookId, @RequestParam int scale, JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        System.out.println("Put /api/admin/secure/book " + bookId + ", " + scale);
        String userType = jwtAuthenticationToken.getToken().getClaims().get("userType").toString();
        if(userType == null || !userType.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.changeBookQuantity(bookId, scale);
    }

    @DeleteMapping("/secure/book")
    public void deleteBook(@RequestParam Long bookId, JwtAuthenticationToken jwtAuthenticationToken) throws Exception{
        System.out.println("Delete /api/admin/secure/book " + bookId );
        String userType = jwtAuthenticationToken.getToken().getClaims().get("userType").toString();
        if(userType == null || !userType.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.deleteBook(bookId);
    }
}
