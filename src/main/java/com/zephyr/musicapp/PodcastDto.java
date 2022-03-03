package com.zephyr.musicapp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PodcastDto {

    private Long id;

    private String name;

    private String description;

    private String sourceUrl;

    private String audioUrl;

    private String imageUrl;

    private String title;
}
