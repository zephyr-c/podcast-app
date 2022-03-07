package com.zephyr.musicapp.data;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.zephyr.musicapp.dto.PodcastDto;
import com.zephyr.musicapp.model.Podcast;
import com.zephyr.musicapp.service.PodcastService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.zephyr.musicapp.repo.PodcastRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PodcastConfig {

    @Bean
    CommandLineRunner commandLineRunner(PodcastService service){
        return args -> {
            JSONParser jsonParser = new JSONParser();

            try (FileReader reader = new FileReader("/Users/zephyr/IdeaProjects/music-app/src/main/java/com/zephyr/musicapp/data/data.json")){
                Object obj = jsonParser.parse(reader);
                JSONObject data = (JSONObject) obj;
                JSONArray podList = (JSONArray) data.get("podcasts");

                podList.forEach(pod -> {
                    JSONObject podcast = (JSONObject) pod;
                    PodcastDto currPodcast = PodcastDto.builder()
                            .name((String)podcast.get("name"))
                            .description((String)podcast.get("description"))
                            .sourceUrl((String)podcast.get("source"))
                            .audioUrl((String)podcast.get("audio"))
                            .imageUrl((String)podcast.get("image"))
                            .title((String)podcast.get("title"))
                            .build();
                    service.create(currPodcast);
                });

            } catch (FileNotFoundException e){
                e.printStackTrace();
            } catch (IOException e){
                e.printStackTrace();
            } catch (ParseException e){
                e.printStackTrace();
            }
        };
    }
}
