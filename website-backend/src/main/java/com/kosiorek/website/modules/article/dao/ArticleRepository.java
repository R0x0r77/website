package com.kosiorek.website.modules.article.dao;

import com.kosiorek.website.modules.article.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    Optional<Article> findBySlug(String slug);

    List<Article> findAllByOrderByPublishedDateDesc();
}
