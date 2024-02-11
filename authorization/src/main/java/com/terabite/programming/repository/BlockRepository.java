package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.Block;

public interface BlockRepository extends JpaRepository<Block, Long>
{
    Optional <Block> findByName(String blockName);
    Block findOneByName(String blockName);
    Optional <Block> findByBlockId(Long id);
    Block findOneByBlockId(Long id);
}
