package com.kosiorek.website.modules.article.model.dto;

import java.time.Instant;
import java.util.List;

public record ArticlePreviewDto(
        Integer articleId,
        String title,
        Instant publishedDate,
        List<String> tags,
        String coverImageUrl,
        String slug,
        String contentPreview
) {}
