package com.timewise.backend.controller;

import com.timewise.backend.model.Goal;
import com.timewise.backend.repository.GoalRepository;
import com.timewise.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalController(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Goal> findAllByCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        var user = userRepository.findByEmail(email).orElseThrow();
        return goalRepository.findByUserId(user.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goal> findById(@PathVariable Long id) {
        return goalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Goal create(@RequestBody Goal goal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        var user = userRepository.findByEmail(email).orElseThrow();
        goal.setUser(user);
        return goalRepository.save(goal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Goal> update(@PathVariable Long id, @RequestBody Goal updatedGoal) {
        return goalRepository.findById(id)
                .map(goal -> {
                    goal.setTitle(updatedGoal.getTitle());
                    goal.setDescription(updatedGoal.getDescription());
                    goal.setPriority(updatedGoal.getPriority());
                    goal.setDueDate(updatedGoal.getDueDate());
                    return ResponseEntity.ok(goalRepository.save(goal));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return goalRepository.findById(id)
                .map(goal -> {
                    goalRepository.delete(goal);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
