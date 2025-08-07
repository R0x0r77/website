package com.kosiorek.website.modules.riddle.service;

import com.kosiorek.website.modules.riddle.dao.RiddleRepository;
import com.kosiorek.website.modules.riddle.model.Riddle;
import com.kosiorek.website.modules.riddle.model.dto.RiddleQuestionDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RiddleServiceTest {

    @Mock
    private RiddleRepository riddleRepository;

    @InjectMocks
    private RiddleService riddleService;

    @Test
    void givenExistingKey_whenFindByKey_thenReturnRiddle() {
        // given
        Riddle riddle = Riddle.builder()
                .key("test-key-123")
                .answer("test-answer")
                .description("test-description")
                .levelReward(999)
                .build();
        when(riddleRepository.findByKey("test-key-123")).thenReturn(Optional.of(riddle));

        // when
        Riddle foundRiddle = riddleService.findByKey("test-key-123");

        // then
        assertThat(foundRiddle)
                .isNotNull()
                .extracting(Riddle::getKey, Riddle::getAnswer, Riddle::getDescription, Riddle::getLevelReward)
                .containsExactly("test-key-123", "test-answer", "test-description", 999);
    }

    @Test
    void givenNonExistingRiddle_whenFindByKey_thenThrow() {
        // given
        String key = "non-existing-key-123";
        when(riddleRepository.findByKey(key)).thenReturn(Optional.empty());

        // when + then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                riddleService.findByKey(key)
        );
        assertEquals("Riddle with key non-existing-key-123 not found", exception.getMessage());
    }

    @Test
    void givenList_whenFindList_thenReturnListOfRiddles() {
        // given
        Riddle riddle1 = Riddle.builder()
                .key("key1")
                .answer("answer1")
                .description("description1")
                .levelReward(1)
                .build();
        Riddle riddle2 = Riddle.builder()
                .key("key2")
                .answer("answer2")
                .description("description2")
                .levelReward(2)
                .build();
        when(riddleRepository.findAll()).thenReturn(List.of(riddle1, riddle2));

        // when
        List<Riddle> riddles = riddleService.findList();

        // then
        assertThat(riddles)
                .isNotNull()
                .hasSize(2)
                .extracting(Riddle::getKey, Riddle::getAnswer, Riddle::getDescription, Riddle::getLevelReward)
                .containsExactlyInAnyOrder(
                        tuple("key1", "answer1", "description1", 1),
                        tuple("key2", "answer2", "description2", 2)
                );
    }

    @Test
    void givenEmptyList_whenFindList_thenReturnEmptyList() {
        // given
        when(riddleRepository.findAll()).thenReturn(List.of());

        // when
        List<Riddle> riddles = riddleService.findList();

        // then
        assertThat(riddles).isNotNull().isEmpty();
    }

    @Test
    void givenAllRiddles_whenFindAllQuestions_thenReturnAllQuestions() {
        // given
        Riddle riddle1 = Riddle.builder()
                .key("key1")
                .answer("answer1")
                .description("description1")
                .levelReward(1)
                .build();
        Riddle riddle2 = Riddle.builder()
                .key("key2")
                .answer("answer2")
                .description("description2")
                .levelReward(2)
                .build();
        when(riddleRepository.findAll()).thenReturn(List.of(riddle1, riddle2));

        // when
        List<RiddleQuestionDto> questions = riddleService.findAllQuestions();

        // then
        assertThat(questions)
                .isNotNull()
                .hasSize(2)
                .extracting(RiddleQuestionDto::getKey, RiddleQuestionDto::getDescription, RiddleQuestionDto::getLevelReward)
                .containsExactlyInAnyOrder(
                        tuple("key1", "description1", 1),
                        tuple("key2", "description2", 2)
                );
    }

    @Test
    void givenNoRiddles_whenFindAllQuestions_thenReturnEmptyList() {
        // given
        when(riddleRepository.findAll()).thenReturn(List.of());

        // when
        List<RiddleQuestionDto> questions = riddleService.findAllQuestions();

        // then
        assertThat(questions).isNotNull().isEmpty();
    }
}