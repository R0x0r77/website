package com.kosiorek.website.modules.article.service;

import com.kosiorek.website.modules.article.dao.ArticleRepository;
import com.kosiorek.website.modules.article.model.Article;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
class ArticleServiceTest {

    @MockBean
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleService articleService;

    @Test
    void findList_shouldReturnListOfArticles() {
        // Given
        Article article1 = new Article();
        Article article2 = new Article();
        List<Article> mockArticles = List.of(article1, article2);

        when(articleRepository.findAll()).thenReturn(mockArticles);

        // When
        List<Article> result = articleService.findList();

        // Then
        assertThat(result).hasSize(2).containsExactly(article1, article2);
        verify(articleRepository, times(1)).findAll();
    }

    @Test
    void findListSortedByDate_shouldReturnArticlesSortedByInstantDescending() {
        // Given
        Article older = new Article();
        older.setPublishedDate(Instant.parse("2024-01-01T12:00:00Z"));

        Article newer = new Article();
        newer.setPublishedDate(Instant.parse("2025-01-01T12:00:00Z"));

        List<Article> sortedArticles = List.of(newer, older);

        when(articleRepository.findAllByOrderByPublishedDateDesc()).thenReturn(sortedArticles);

        // When
        List<Article> result = articleService.findListSortedByDate();

        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getPublishedDate()).isAfter(result.get(1).getPublishedDate());
        verify(articleRepository, times(1)).findAllByOrderByPublishedDateDesc();
    }

    @Test
    void findAllPreviewNative() {
    }

    @Test
    void findBySlug() {
    }
}