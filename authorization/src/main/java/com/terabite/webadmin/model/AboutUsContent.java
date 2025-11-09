package com.terabite.webadmin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "about_us_content")
public class AboutUsContent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String founderName;

    private String founderTitle;

    @Column(length = 2000)
    private String founderBio;

    private String founderImageUrl;

    @Column(length = 2000)
    private String missionStatement;

    private String missionImageUrl;

    private String extraImageUrl;

    @Column(length = 2000)
    private String extraSectionContent;

    @Column(length = 2000)
    private String qualifications;

    @Email
    private String contactEmail;

    private String contactPhone;

    private String locationAddress;

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

    public String getFounderName() {
        return founderName;
    }

    public void setFounderName(String founderName) {
        this.founderName = founderName;
    }

    public String getFounderTitle() {
        return founderTitle;
    }

    public void setFounderTitle(String founderTitle) {
        this.founderTitle = founderTitle;
    }

    public String getFounderBio() {
        return founderBio;
    }

    public void setFounderBio(String founderBio) {
        this.founderBio = founderBio;
    }

    public String getMissionStatement() {
        return missionStatement;
    }

    public void setMissionStatement(String missionStatement) {
        this.missionStatement = missionStatement;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

    public String getFounderImageUrl() {
        return founderImageUrl;
    }

    public void setFounderImageUrl(String founderImageUrl) {
        this.founderImageUrl = founderImageUrl;
    }

    public String getMissionImageUrl() {
        return missionImageUrl;
    }

    public void setMissionImageUrl(String missionImageUrl) {
        this.missionImageUrl = missionImageUrl;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }

    public String getExtraImageUrl() {
        return extraImageUrl;
    }

    public void setExtraImageUrl(String extraImageUrl) {
        this.extraImageUrl = extraImageUrl;
    }

    public String getExtraSectionContent() {
        return extraSectionContent;
    }

    public void setExtraSectionContent(String extraSectionContent) {
        this.extraSectionContent = extraSectionContent;
    }
}
