# 8th Light Code Assessment

This is my submission for the 8th Light Technical Code Assessment. 

## The Challenge
Build an app that consumes the Google Books API and returns the following information: 

1. The title, author, and publisher of the book
2. A picture of the cover
3. A link that navigates to a site with more information about the book
4. Deploy it somewhere on the internet

## My Solution
I used JavaScript as my language of choice for this challenge. Initially, I thought I'd need to protect my API requests with a key, but it turns out I didn't need to. That said, I elected to use React.js as my library of choice for this challenge. Additionally, since the challenge also required that I decouple and modularize my code as much as possible, I elected to use Redux.js as my store container so that my components didn't need to rely on each other for information. That said, it may have been a little overkill to add it, since the complexity of the app probably didn't warrant all of the setup that Redux requires.

> EDIT 02/12/2019: Having finished going through the feedback, I realized that it was indeed necessary to add Redux to this app. Looking back, having Redux store all of my state instead of having to pass it around as props to components made my life so much easier. It also made writing components a little more efficient, since I was able to write purely functional components and was able to entirely avoid writing Class Components.

> EDIT 02/12/2019: If I were to do this again, I don't think I'd do anything differently, assuming I still used Javascript as my language of choice. I'm pretty happy with my choices for which libraries I used, and I think that I used them to their full effects. 

> EDIT 02/12/2019: If I had to change one thing, maybe I would implement some sort of authentication. There are a whole bunch of other features in the Google Books API that require an API key. This means that I'd need some way to hide that key, which is impossible when writing strictly front end code. That said, I'd need to incorporate a full server, which I would probably use Node.js for, and then implement OAuth functionality so that I can take full advantage of the API while being able to hide my key from public use.

Basically, my thought process was to first do as much set up as possible at first; my goal was to ensure that all of the business logic checked out, and all of my actions, dispatchers, and reducers were good to go. I wanted to make sure that all of the heavy Redux work was done FIRST, and then I'd worry about presentational components. So I focused mainly on writing clean, modular Redux code for my dispatchers and reducers.

It was a really nice surprise that the Google Books API didn't require an API key, which allowed me to write strictly front end code without the use of a server. This allowed me to deploy using [surge.sh](https://surge.sh) for faster deployment with less setup.

## Deployed App
The app can be found at https://8th-light-challenge.surge.sh

## Next Steps (02/01/2019)

While I did do SOME styling for the app, I feel like I can do more. I also think that even though the app does exactly as the challenge requires, I think I can expand on it a little more.

> EDIT 02/12/2019: I expanded on this concept by adding a pagination functionality. Users can now peruse the entire Google Books API collection through a series of API calls

~~I wasn't sure how many books I should be returning from the API, so I picked a nice, round 10.~~ This has been fixed as of 02/12/2019

~~I also think there's some way of programmatically dealing with books with multiple authors that doesn't involve using a `for loop` and brute-forcing the formatting of multiple authors.~~ This has been fixed as of 02/12/2019

## Running Tests
I was only successfully able to create a test suite for my reducers. I wasn't exactly sure how to write tests for my actions or my components, which may mean that I have room to improve the logic or the flow of those files.

> EDIT 02/13/2019: I've added a couple of rudimentary tests for one of my components

Run the tests using `npm test`.


## Post-Feedback Changes (02/12/2019)

* There is now a pagination feature to expand the number of possible results without flooding the page
* The list of results is now in a scrollable container
* The document title now is appropriately changed
* Multiple authors are now no longer followed by a trailing comma
* Files now have appropriate permissions
* Error messages are now tailored to the error
* Search results that lack a picture no longer break the app and force an error
