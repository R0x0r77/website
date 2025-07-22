package com.kosiorek.website.modules.riddle.rest;

import com.kosiorek.website.modules.riddle.model.dto.RiddleQuestionDto;
import com.kosiorek.website.modules.riddle.service.RiddleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api/riddles")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4200"})
public class RiddleController {

    private final RiddleService riddleService;

    public RiddleController(RiddleService riddleService) {
        this.riddleService = riddleService;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<RiddleQuestionDto>> getAllRiddleQuestions() {
        List<RiddleQuestionDto> questions = riddleService.findAllQuestions();
        return ResponseEntity.ok(questions);
    }
}
