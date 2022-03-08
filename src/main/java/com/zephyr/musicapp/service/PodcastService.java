package com.zephyr.musicapp.service;

import com.zephyr.musicapp.repo.PodcastRepository;
import com.zephyr.musicapp.dto.PodcastDto;
import com.zephyr.musicapp.model.Podcast;
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
        podcastRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        podcastRepository.deleteById(id);
    }

    private PodcastDto mapToDto(final Podcast podcast){
        return PodcastDto.builder()
                .id(podcast.getId())
                .name(podcast.getName())
                .description(podcast.getDescription())
                .sourceUrl(podcast.getSource())
                .audioUrl(podcast.getAudio())
                .imageUrl(podcast.getImage())
                .title(podcast.getTitle())
                .numLikes(podcast.getNumLikes())
                .numDislikes(podcast.getNumDislikes())
                .build();
    }


    private Podcast mapToEntity(final PodcastDto podcastDto, final Podcast podcast) {
        podcast.setName(podcastDto.getName() != null
                ? podcastDto.getName()
                : podcast.getName());
        podcast.setDescription(podcastDto.getDescription() != null
                ? podcastDto.getDescription()
                : podcast.getDescription());
        podcast.setSource(podcastDto.getSourceUrl() != null
                ? podcastDto.getSourceUrl()
                : podcast.getSource());
        podcast.setAudio(podcastDto.getAudioUrl() != null
                ? podcastDto.getAudioUrl()
                : podcast.getAudio());
        podcast.setImage(podcastDto.getImageUrl() != null
                ? podcastDto.getImageUrl()
                : podcast.getImage());
        podcast.setTitle(podcastDto.getTitle() != null
                ? podcastDto.getTitle()
                : podcast.getTitle());
        podcast.setNumLikes(podcastDto.getNumLikes() != null
                ? podcastDto.getNumLikes()
                : podcast.getNumLikes() != null
                ? podcast.getNumLikes() : 0);
        podcast.setNumDislikes(podcastDto.getNumDislikes() != null
                ? podcastDto.getNumDislikes()
                : podcast.getNumDislikes() != null ? podcast.getNumDislikes() : 0);
        return podcast;
    }
}
