package com.kosiorek.website.modules.article.model.dto;

import java.time.Instant;
import java.util.List;

public interface ArticlePreviewProjection {
    Integer getArticleId();
    String getTitle();
    Instant getPublishedDate();
    List<String> getTags();
    String getCoverImageUrl();
    String getSlug();
    String getContentPreview();
}
