package com.terabite.movement.model;

import com.terabite.user.model.UserInformation;
import jakarta.persistence.*;


/**
 * This entity represents a user's notes on a specific workout movement.
 */
@Entity
@Table(name = "movement_note_table")
public class MovementNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(targetEntity = Movement.class)
    private Movement movement;

    @ManyToOne(targetEntity = UserInformation.class)
    private UserInformation user;

    String note;
}
