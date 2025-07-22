package com.kosiorek.website.modules.riddle.dao;

import com.kosiorek.website.modules.riddle.model.Riddle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RiddleRepository extends JpaRepository<Riddle, Integer> {

    Optional<Riddle> findByKey(String key);
}
