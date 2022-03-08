package com.zephyr.musicapp.model;

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
    private String source;

    @Column(columnDefinition = "varchar(255) default ''")
    private String audio;

    @Column(columnDefinition = "varchar(255) default ''")
    private String image;

    @Column(columnDefinition = "varchar(255) default ''")
    private String title;

    @Column(columnDefinition = "integer default 0")
    private Integer numLikes;

    @Column(columnDefinition = "integer default 0")
    private Integer numDislikes;
}
