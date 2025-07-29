package com.kosiorek.website.modules.article.dao;

import com.kosiorek.website.modules.article.model.Article;
import com.kosiorek.website.modules.article.model.dto.ArticlePreviewProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    Optional<Article> findBySlug(String slug);

    List<Article> findAllByOrderByPublishedDateDesc();

//    List<ArticlePreviewDto> findAllByOrderByPublishedDateDesc();

    @Query(value = """
        SELECT
            a.article_id,
            a.title,
            a.published_date,
            array_agg(t.tags) AS tags,
            a.cover_image_url,
            a.slug,
			a.content_preview
        FROM article a
        LEFT JOIN article_tags t ON a.article_id = t.article_article_id
        GROUP BY a.article_id
        ORDER BY a.published_date DESC;
        """, nativeQuery = true)
    List<ArticlePreviewProjection> findAllPreviewNative();
}
