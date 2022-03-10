# Podcast Application
Created as a finalist project for the SiriusXM + Pandora Apprenticeship

## Summary
An application that allows users to save, sort, and play a list of podcasts.
* Users can click on a podcast to view it's details and play it
* Users can add a podcast to the list(must have all required information fields, and submit form)
* Users can like or dislike a podcast, as well as see how many likes and dislikes the podcast has.
* Users can sort the list by name, title, number of likes, and number of dislikes.

## Project Details

### File Structure And Architecture:


### Requirements:
#### Application can be interacted with in a minimum of 3 ways
1. Users can view the list of podcasts
2. Users can open a podcast from the list and listen to it
3. Users can like a podcast
4. Users can dislike a podcast
5. Users can sort the podcast list in 4 different ways
6. Users can use the discovery feature to find new podcasts on iTunes

#### Application uses a specified architectural pattern
* Application follows MVC pattern

#### Integration with a backend service developed by you with CRUD operations
* Backend service manages the podcast list that is stored in a database
* Has operations to create, read, update, and delete a podcast. 
  The delete capability is currently unused, but exists anyway to be thorough.

#### Integration with a 3rd party RESTful API
* Application utilizes the iTunes search API to allow users to discover new podcasts based on a search term.

#### Usage of at least 1 Object Oriented principle