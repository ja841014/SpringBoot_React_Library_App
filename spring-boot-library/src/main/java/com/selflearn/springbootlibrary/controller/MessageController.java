package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.entity.Message;
import com.selflearn.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.selflearn.springbootlibrary.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure")
    public void postMessage(@RequestBody Message messageRequest, JwtAuthenticationToken jwtAuthenticationToken) {

        System.out.println("Post /api/messages/secure");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();

        messageService.postMessage(messageRequest, userEmail);

    }

    @GetMapping("/secure")
    public Page<Message> getAllMessageByUserEmail(@RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                   @RequestParam(value = "size", defaultValue = "10", required = false) int size,
                                                   JwtAuthenticationToken jwtAuthenticationToken) {
        System.out.println("Get /api/messages/secure");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        return messageService.getAllMessageByUserEmail(userEmail, page, size);
    }

    @GetMapping("/secure/admin")
    public Page<Message> findMessageByClosed(@RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                             @RequestParam(value = "size", defaultValue = "10", required = false) int size) {
        System.out.println("Get /api/messages/secure/admin");
        return messageService.findMessageByClosed(page, size);
    }

    @PutMapping("/secure/admin")
    public void submitQuestionResponse(@RequestBody AdminQuestionRequest adminQuestionRequest, JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        System.out.println("Put /api/messages/secure/admin" );
        String adminEmail = jwtAuthenticationToken.getToken().getSubject();
        String userType = jwtAuthenticationToken.getToken().getClaims().get("userType").toString();
        System.out.println(adminQuestionRequest.toString());
        if(userType == null || !userType.equals("admin")) {
            throw new Exception("Administration page only");
        }
        messageService.submitQuestionResponse(adminQuestionRequest.getResponse(), adminQuestionRequest.getId(), adminEmail);

    }

}
