package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.Block;

public interface BlockRepository extends JpaRepository<Block, Long>{
    Optional <Block> findByBlockName(String programBlockName);
    Block findOneByBlockName(String programBlockName);
}
