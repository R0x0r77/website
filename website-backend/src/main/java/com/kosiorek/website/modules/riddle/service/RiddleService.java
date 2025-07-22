package com.kosiorek.website.modules.riddle.service;

import com.kosiorek.website.modules.riddle.dao.RiddleRepository;
import com.kosiorek.website.modules.riddle.model.Riddle;
import com.kosiorek.website.modules.riddle.model.dto.RiddleQuestionDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiddleService {

    private final RiddleRepository riddleRepository;

    public RiddleService(RiddleRepository riddleRepository) {
        this.riddleRepository = riddleRepository;
    }

    @Transactional
    public Riddle findByKey(String key) {
        return riddleRepository.findByKey(key)
                .orElseThrow(() -> new IllegalArgumentException("Riddle with key " + key + " not found"));
    }

    @Transactional
    public List<Riddle> findList() {
        return riddleRepository.findAll();
    }

    @Transactional
    public List<RiddleQuestionDto> findAllQuestions() {
        List<Riddle> riddles = findList();
        return riddles.stream()
                .map(riddle -> RiddleQuestionDto.builder()
                        .key(riddle.getKey())
                        .description(riddle.getDescription())
                        .levelReward(riddle.getLevelReward())
                        .build())
                .toList();
    }

}
