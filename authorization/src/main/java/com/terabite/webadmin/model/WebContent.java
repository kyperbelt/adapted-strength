package com.terabite.webadmin.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * WebContent
 */
@Entity
@Table(name = "web_content")
public class WebContent {

    @Id
    private long id;
    
    @OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "terms_of_service_id", referencedColumnName = "id") 
    private TermsOfService termsOfService;

    public WebContent() {
    }

    public WebContent(long id, TermsOfService termsOfService) {
        this.id = id;
        this.termsOfService = termsOfService;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TermsOfService getTermsOfService() {
        return this.termsOfService;
    }

    public void setTermsOfService(TermsOfService termsOfService) {
        this.termsOfService = termsOfService;
    }
}
