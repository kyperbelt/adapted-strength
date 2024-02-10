package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.programming.model.Block;
import com.terabite.programming.repository.BlockRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BlockService {
    BlockRepository programBlockRepository;

    public BlockService(BlockRepository programBlockRepository){
        this.programBlockRepository=programBlockRepository;
    }

    public ResponseEntity<?> createNewProgramBlock(Block programBlock) {
        if(programBlockRepository.findByBlockName(programBlock.getName()).isEmpty()){
            programBlockRepository.save(programBlock);
            return new ResponseEntity<>(programBlock, HttpStatus.CREATED);
        }
        else{
            return ResponseEntity.badRequest().body("Error: There is already a program block with the name: " +programBlock.getName());
        }
    }

	public ResponseEntity<?> updateProgramBlock(Block programBlock) {
        if(programBlockRepository.findByBlockName(programBlock.getName()).isEmpty()){
            return ResponseEntity.badRequest().body("Error: There is no program block by the name: "+programBlock.getName());
        }
        else{
            Block toBeUpdated= programBlockRepository.findOneByBlockName(programBlock.getName());
            toBeUpdated.setProgramWeeks(programBlock.getProgramWeeks());
            return new ResponseEntity<>(programBlock, HttpStatus.ACCEPTED);
        }
    }

	public ResponseEntity<?> getProgramBlock(String jsonBlockName) {
		ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        Block programBlock;
        String blockName;
        try{
            jsonNode=objectMapper.readTree(jsonBlockName);
            blockName=jsonNode.get("block_name").asText();
            programBlock=programBlockRepository.findOneByBlockName(blockName);
            if(programBlock!=null){
                return new ResponseEntity<>(programBlock, HttpStatus.FOUND);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (JsonProcessingException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
	}

	public ResponseEntity<?> deleteProgramBlock(String jsonBlockName) {
		ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        Block programBlock;
        String blockName;
        try{
            jsonNode=objectMapper.readTree(jsonBlockName);
            blockName=jsonNode.get("block_name").asText();
            programBlock=programBlockRepository.findOneByBlockName(blockName);
            if(programBlock!=null){
                programBlockRepository.delete(programBlock);
                return new ResponseEntity<>(programBlock, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (JsonProcessingException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
	}
}
