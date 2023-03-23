package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.HistoryRepository;
import com.selflearn.springbootlibrary.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HistoryService {

    private HistoryRepository historyRepository;
    @Autowired
    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public Page<History> findBookByUserEmail(String userEmail, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return historyRepository.findBookByUserEmail(userEmail, pageable);
    }
}
