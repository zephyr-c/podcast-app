package com.zephyr.musicapp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Podcast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Column
    private String sourceUrl;

    @Column
    private String audioUrl;

    @Column
    private String imageUrl;

    @Column
    private String title;
}
