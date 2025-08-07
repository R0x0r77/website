package com.kosiorek.website.modules.riddle.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosiorek.website.config.JwtService;
import com.kosiorek.website.modules.riddle.model.dto.RiddleQuestionDto;
import com.kosiorek.website.modules.riddle.service.RiddleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = RiddleController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
class RiddleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RiddleService riddleService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void shouldReturnListOfRiddleQuestions() throws Exception {
        // given
        List<RiddleQuestionDto> questions = List.of(
                new RiddleQuestionDto("key1", "description1", 1),
                new RiddleQuestionDto("key2", "description2", 2)
        );
        when(riddleService.findAllQuestions()).thenReturn(questions);

        // when + then
        mockMvc.perform(get("/api/riddles/questions")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(questions)));
    }

    @Test
    void shouldReturnEmptyListWhenNoQuestions() throws Exception {
        // given
        when(riddleService.findAllQuestions()).thenReturn(List.of());

        // when + then
        mockMvc.perform(get("/api/riddles/questions")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}