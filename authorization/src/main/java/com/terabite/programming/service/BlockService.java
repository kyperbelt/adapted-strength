package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.terabite.programming.model.Block;
import com.terabite.programming.repository.BlockRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BlockService {
    BlockRepository blockRepository;

    public BlockService(BlockRepository blockRepository){
        this.blockRepository=blockRepository;
    }

    public ResponseEntity<?> createNewBlock(Block block) {
        blockRepository.save(block);
        return new ResponseEntity<>(block, HttpStatus.CREATED);
    }

	public ResponseEntity<?> updateBlock(Block block) {
        if(blockRepository.findById(block.getId()).isEmpty()){
            return new ResponseEntity<>(block, HttpStatus.NOT_FOUND);        }
        else{
            blockRepository.save(block);
            return new ResponseEntity<>(block, HttpStatus.ACCEPTED);
        }
    }

	public ResponseEntity<?> getBlock(Block block) {
		if(blockRepository.findById(block.getId()).isEmpty()){
            return new ResponseEntity<>(block, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(blockRepository.findOneById(block.getId()), HttpStatus.FOUND);
        }
	}

    public ResponseEntity<?> getAllBlocks() {
        return new ResponseEntity<>(blockRepository.findAll(), HttpStatus.ACCEPTED);
    }

	public ResponseEntity<?> deleteBlock(Block block) {
		if(blockRepository.findById(block.getId()).isEmpty()){
            return new ResponseEntity<>(block, HttpStatus.NOT_FOUND);
        }
        else{
            blockRepository.delete(block);
            return new ResponseEntity<>(blockRepository.findOneById(block.getId()), HttpStatus.FOUND);
        }
	}
}
