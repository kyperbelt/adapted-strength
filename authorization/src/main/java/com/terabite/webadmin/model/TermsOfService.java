package com.terabite.webadmin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
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
    private int id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "date_created", nullable = false)
    private LocalDateTime dateCreated;


    public TermsOfService() {
    }

    public TermsOfService(String content, LocalDateTime dateCreated) {
        this.content = content;
        this.dateCreated = dateCreated;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public LocalDateTime getDateCreated(){
        return this.dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated){
        this.dateCreated = dateCreated;
    }

}
