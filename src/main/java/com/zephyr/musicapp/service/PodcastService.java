package com.zephyr.musicapp.service;

import com.zephyr.musicapp.repo.PodcastRepository;
import com.zephyr.musicapp.dto.PodcastDto;
import com.zephyr.musicapp.model.Podcast;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
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
        final Podcast podcast = mapNewPodcast(podcastDto);
        return podcastRepository.save(podcast).getId();

    }

    public PodcastDto update(final Long id, final HashMap<String, String> updates){
        final Podcast podcast = podcastRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        updatePodcast(podcast, updates);
        podcastRepository.save(podcast);
        return mapToDto(podcast);
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

    private Podcast mapNewPodcast(final PodcastDto podcastDto){
        return Podcast.builder()
                .id(podcastDto.getId())
                .name(podcastDto.getName())
                .description(podcastDto.getDescription())
                .source(podcastDto.getSourceUrl())
                .audio(podcastDto.getAudioUrl())
                .image(podcastDto.getImageUrl())
                .title(podcastDto.getTitle())
                .numLikes(0)
                .numDislikes(0)
                .build();

    }

    private void updatePodcast(final Podcast podcast, HashMap<String, String> updates) {
        for(String field : updates.keySet()){
            podcast.updateField(field, updates.get(field));
        }
    }
}
