package com.zephyr.musicapp;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PodcastService {

    private final PodcastRepository podcastRepository;

    public PodcastService(final PodcastRepository podcastRepository){
        this.podcastRepository = podcastRepository;
    }

    public List<PodcastDto> findAll() {
        return podcastRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PodcastDto get(final Long id){
        return podcastRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final PodcastDto podcastDto){
        final Podcast podcast = new Podcast();
        mapToEntity(podcastDto, podcast);
        return podcastRepository.save(podcast).getId();

    }

    public void update(final Long id, final PodcastDto podcastDto){
        final Podcast podcast = podcastRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(podcastDto, podcast);
        podcastRepository.save(podcast);
    }

    public void delete(final Long id){
        podcastRepository.deleteById(id);
    }

    private PodcastDto mapToDto(final Podcast podcast){
        return PodcastDto.builder()
                .id(podcast.getId())
                .name(podcast.getName())
                .description(podcast.getDescription())
                .sourceUrl(podcast.getSourceUrl())
                .audioUrl(podcast.getAudioUrl())
                .imageUrl(podcast.getImageUrl())
                .title(podcast.getTitle())
                .build();
    }

    private Podcast mapToEntity(final PodcastDto podcastDto, final Podcast podcast) {
        podcast.setName(podcastDto.getName() != null
                ? podcastDto.getName()
                : podcast.getName());
        podcast.setDescription(podcastDto.getDescription() != null
                ? podcastDto.getDescription()
                : podcast.getDescription());
        podcast.setSourceUrl(podcastDto.getSourceUrl() != null
                ? podcastDto.getSourceUrl()
                : podcast.getSourceUrl());
        podcast.setAudioUrl(podcastDto.getAudioUrl() != null
                ? podcastDto.getAudioUrl()
                : podcast.getAudioUrl());
        podcast.setImageUrl(podcastDto.getImageUrl() != null
                ? podcastDto.getImageUrl()
                : podcast.getImageUrl());
        podcast.setTitle(podcastDto.getTitle() != null
                ? podcastDto.getTitle()
                : podcast.getTitle());
        return podcast;
    }
}
