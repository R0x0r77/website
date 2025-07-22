package com.kosiorek.website.modules.riddle.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RiddleQuestionDto {

    private String key;

    private String description;

    private Integer levelReward;
}
