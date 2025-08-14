package com.kosiorek.website.modules.article.dao;

import com.kosiorek.website.modules.article.model.Article;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class ArticleRepositoryTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    void shouldFindArticleBySlug() {
        // Given
        Article article = Article.builder()
                .articleId(9999)
                .title("Sample Article")
                .publishedDate(Instant.parse("2020-01-01T10:00:00Z"))
                .tags(List.of("test", "spring"))
                .markdownContent("# Sample Content")
                .coverImageUrl("sample_cover")
                .slug("sample-article")
                .build();

        articleRepository.save(article);

        // When
        Optional<Article> result = articleRepository.findBySlug("sample-article");

        // Then
        assertThat(result).isPresent();
        assertThat(result.get().getTitle()).isEqualTo("Sample Article");
        assertThat(result.get().getSlug()).isEqualTo("sample-article");
        assertThat(result.get().getTags()).containsExactly("test", "spring");
    }

    @Test
    void shouldReturnEmptyWhenSlugNotFound() {
        // When
        Optional<Article> result = articleRepository.findBySlug("non-existent-slug");

        // Then
        assertThat(result).isEmpty();
    }

    @Test
    void shouldReturnArticlesSortedByPublishedDateDescending() {
        // Given
        Article oldestArticle = Article.builder()
                .articleId(9998)
                .title("Old Article")
                .publishedDate(Instant.parse("1965-01-01T10:00:00Z"))
                .tags(List.of("spring", "java"))
                .markdownContent("# Old")
                .coverImageUrl("old_article")
                .slug("old-article")
                .build();

        Article newerArticle = Article.builder()
                .articleId(9999)
                .title("Newer Article")
                .publishedDate(Instant.parse("1970-01-01T10:00:00Z"))
                .tags(List.of("spring-boot", "jpa"))
                .markdownContent("# New")
                .coverImageUrl("newer_article")
                .slug("newer-article")
                .build();

        articleRepository.save(oldestArticle);
        articleRepository.save(newerArticle);

        // When
        List<Article> result = articleRepository.findAllByOrderByPublishedDateDesc();

        // Then
        assertThat(result.get(result.size() - 2).getTitle()).isEqualTo("Newer Article");
        assertThat(result.getLast().getTitle()).isEqualTo("Old Article");

        assertThat(result.getLast().getTags()).containsExactly("spring", "java");
    }
}
