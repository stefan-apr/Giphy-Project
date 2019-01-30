# Giphy-Project

This application is designed to display a random selection of GIFs based on a search term that the user decides on. The app is developed in Javascript with jQuery. 

The user is presented with a short list of initial topics to choose from as search terms, and they can add topics to this list or remove topics from the list as they like. The topics list will be saved in the user's cache. If the user clears every topic, they will be given the default list again when they next open the app.

The user can select how many GIFs they would like to be returned using the dropdown box provided. Also, they can filter out any potential R-rated GIFs if they would like.

When the user clicks a topic button, the application queries GIPHY's API and displays a random assortment of GIFs from the search results. The number of GIFs displayed will be the number the user selected, unless there are not enough results to do so.

The results that are displayed are random, but are weighted towards the front of the results queue. This is in the interest of having the GIFs be relevant to the chosen topic.

Pressing either the same or a different topic button after that will simply append more GIFs to the end of the previous results.
The user can clear the GIFs that are currently displayed at any time using the "clear" button.

© Stefan Apreutesei January 29, 2019

I am in no way affiliated with GIPHY, though this application would not have been possible without their API. Thank you!