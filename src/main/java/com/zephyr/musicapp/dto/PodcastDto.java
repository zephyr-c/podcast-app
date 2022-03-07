package com.zephyr.musicapp.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class PodcastDto {

    private Long id;

    private String name;

    private String description;

    private String sourceUrl;

    private String audioUrl;

    private String imageUrl;

    private String title;
}
