package com.timewise.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Integer estimatedTime; // tempo em minutos

    private String status;

    @ManyToOne
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;
}
