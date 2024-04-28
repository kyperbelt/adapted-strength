package com.terabite.webadmin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

/**
 * TermsOfService
 */
@Entity
@Table(name = "terms_of_service")
public class TermsOfService {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Lob
    @Column(name = "content", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(name = "date_created", nullable = false)
    private LocalDateTime dateCreated;

    // auto incrementing Version column
    @Column(name = "version", nullable = true)
    private Long version = 0L; // set a default value

    @PrePersist
    public void incrementVersion() {
        this.version++;
    }

    public TermsOfService() {
    }

    public TermsOfService(String content, LocalDateTime dateCreated, Long version) {
        this.content = content;
        this.dateCreated = dateCreated;
        this.version = version;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDateCreated() {
        return this.dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

}
