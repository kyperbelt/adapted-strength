package com.terabite.webadmin.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "home_page_content")
public class HomePageContent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String heroTitle;

    private String heroSubtitle;

    private String heroImageUrl;

    private String ctaButtonText;

    private String ctaButtonLink;

    @OneToMany(mappedBy = "homePageContent", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<HomePageSection> sections = new ArrayList<>();

    private LocalDateTime lastModified;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastModified = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }

    public String getHeroSubtitle() {
        return heroSubtitle;
    }

    public void setHeroSubtitle(String heroSubtitle) {
        this.heroSubtitle = heroSubtitle;
    }

    public String getHeroImageUrl() {
        return heroImageUrl;
    }

    public void setHeroImageUrl(String heroImageUrl) {
        this.heroImageUrl = heroImageUrl;
    }

    public String getCtaButtonText() {
        return ctaButtonText;
    }

    public void setCtaButtonText(String ctaButtonText) {
        this.ctaButtonText = ctaButtonText;
    }

    public String getCtaButtonLink() {
        return ctaButtonLink;
    }

    public void setCtaButtonLink(String ctaButtonLink) {
        this.ctaButtonLink = ctaButtonLink;
    }

    public List<HomePageSection> getSections() {
        return sections;
    }

    public void setSections(List<HomePageSection> sections) {
        this.sections = sections;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }
}
