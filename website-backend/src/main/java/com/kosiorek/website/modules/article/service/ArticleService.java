package com.kosiorek.website.modules.article.service;

import com.kosiorek.website.modules.article.dao.ArticleRepository;
import com.kosiorek.website.modules.article.model.Article;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    @Transactional
    public List<Article> findList() {
        return this.articleRepository.findAll();
    }

    @Transactional
    public List<Article> findListSortedByDate() {
        return this.articleRepository.findAllByOrderByPublishedDateDesc();
    }

    @Transactional
    public Optional<Article> findBySlug(String slug) {
        return this.articleRepository.findBySlug(slug);
    }
}
