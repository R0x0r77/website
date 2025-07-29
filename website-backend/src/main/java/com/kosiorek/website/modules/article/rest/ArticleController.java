package com.kosiorek.website.modules.article.rest;

import com.kosiorek.website.modules.article.model.Article;
import com.kosiorek.website.modules.article.model.dto.ArticlePreviewProjection;
import com.kosiorek.website.modules.article.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/articles")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4200"})
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/full-articles")
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> res = this.articleService.findListSortedByDate();
        return ResponseEntity.ok(res);
    }

    @GetMapping()
    public ResponseEntity<List<ArticlePreviewProjection>> getAllArticlePreviews() {
        List<ArticlePreviewProjection> res = this.articleService.findAllPreviewNative();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Article> getArticleBySlug(@PathVariable String slug) {
        return this.articleService.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
