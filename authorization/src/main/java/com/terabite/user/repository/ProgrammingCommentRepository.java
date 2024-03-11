package com.terabite.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.user.model.ProgrammingComment;

public interface ProgrammingCommentRepository extends JpaRepository<ProgrammingComment, Long>{

}
