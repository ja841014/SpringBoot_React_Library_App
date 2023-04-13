package com.selflearn.springbootlibrary.dao;

import com.selflearn.springbootlibrary.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    public Page<Message> findMessageByUserEmail(String userEmail, Pageable pageable);

    public Page<Message> findMessageByClosed(boolean closed, Pageable pageable);

    public Optional<Message> findMessageById(Long id);
}
