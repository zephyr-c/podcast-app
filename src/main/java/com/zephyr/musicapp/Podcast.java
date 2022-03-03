package com.zephyr.musicapp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@Entity
@Getter
@Setter
public class Podcast {

    @Id
    @SequenceGenerator(
            name = "primary_sequence",
            sequenceName = "primary_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = SEQUENCE, generator = "primary_sequence")
    private Long id;

    @Column(columnDefinition = "varchar(255) default ''")
    private String name;

    @Column(columnDefinition = "text default ''")
    private String description;

    @Column(columnDefinition = "varchar(255) default ''")
    private String sourceUrl;

    @Column(columnDefinition = "varchar(255) default ''")
    private String audioUrl;

    @Column(columnDefinition = "varchar(255) default ''")
    private String imageUrl;

    @Column(columnDefinition = "varchar(255) default ''")
    private String title;
}
