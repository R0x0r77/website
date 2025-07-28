package com.kosiorek.website.modules.article.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer articleId;

    private String title;

    private Instant publishedDate;

    @ElementCollection
    @Column(name = "tags")
    private List<String> tags;

//    @Lob
    @Column(columnDefinition = "TEXT")
    private String markdownContent;

    private String coverImageUrl;

    private String slug;
}
