package com.terabite.user.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_workout_comments_table")
public class ProgrammingComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonAlias("comment_id")
    private long commentId;
    
    @JsonAlias("comment")
    private String comment;

    @JsonAlias("created_on")
    private Timestamp creationDate;

    @JsonAlias("last_updated_on")
    private Timestamp lastUpdatedDate;

	@PrePersist
	protected void onCreate() {
		creationDate = Timestamp.valueOf(LocalDateTime.now() );
		lastUpdatedDate = creationDate;
	}

	@PreUpdate
	protected void onUpdate() {
		lastUpdatedDate = Timestamp.valueOf(LocalDateTime.now() );
	}

	public long getCommentId() {
		return commentId;
	}

	public String getComment() {
		return comment;
	}

	public Timestamp getCreationDate() {
		return creationDate;
	}

	public Timestamp getLastUpdatedDate() {
		return lastUpdatedDate;
	}
    
	public void setCommentId(long commentId) {
		this.commentId = commentId;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = creationDate;
	}

	public void setLastUpdatedDate(Timestamp lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}

    
}
