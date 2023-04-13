package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.MessageRepository;
import com.selflearn.springbootlibrary.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessageService {

    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void postMessage(Message messageRequest, String userEmail) {
        messageRequest.setUserEmail(userEmail);
        messageRepository.save(messageRequest);
    }

    public Page<Message> getAllMessageByUserEmail(String userEmail, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return messageRepository.findMessageByUserEmail(userEmail, pageable);
    }

    public Page<Message> findMessageByClosed(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return messageRepository.findMessageByClosed(false, pageable);
    }

    public void submitQuestionResponse(String response, Long id, String adminEmail) throws Exception{
        Optional<Message> message = messageRepository.findMessageById(id);
        if(!message.isPresent()) {
            throw new Exception("submitQuestionResponse error. message not exist");
        }
        message.get().setResponse(response);
        message.get().setClosed(true);
        message.get().setAdminEmail(adminEmail);
        messageRepository.save(message.get());
    }
}
