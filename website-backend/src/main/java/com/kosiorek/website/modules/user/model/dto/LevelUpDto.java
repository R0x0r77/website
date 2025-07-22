package com.kosiorek.website.modules.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LevelUpDto {

    private String key;

    private String answer;

    private Integer currentLevel;
}
