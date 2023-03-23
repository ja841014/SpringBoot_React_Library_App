package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.entity.History;
import com.selflearn.springbootlibrary.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/histories")
public class HistoryController {

    private HistoryService historyService;

    @Autowired
    public HistoryController(HistoryService historyService) {
        this.historyService =  historyService;
    }

    @GetMapping("/secure")
    public Page<History> findBookByUserEmail(@RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                             @RequestParam(value = "size", defaultValue = "10", required = false) int size,
                                             JwtAuthenticationToken jwtAuthenticationToken) {
        System.out.println("Get /api/histories/secure");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        return historyService.findBookByUserEmail(userEmail, page, size);
    }


}
