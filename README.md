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

Basically, my thought process was to first do as much set up as possible at first; my goal was to ensure that all of the business logic checked out, and all of my actions, dispatchers, and reducers were good to go. I wanted to make sure that all of the heavy Redux work was done FIRST, and then I'd worry about presentational components. So I focused mainly on writing clean, modular Redux code for my dispatchers and reducers.

It was a really nice surprise that the Google Books API didn't require an API key, which allowed me to write strictly front end code without the use of a server. This allowed me to deploy using [surge.sh](https://surge.sh) for faster deployment with less setup.

## Next Steps

While I did do SOME styling for the app, I feel like I can do more. I also think that even though the app does exactly as the challenge requires, I think I can expand on it a little more. I wasn't sure how many books I should be returning from the API, so I picked a nice, round 10.

I also think there's some way of programmatically dealing with books with multiple authors that doesn't involve using a `for loop` and brute-forcing the formatting of multiple authors.

## Running Tests
Run the tests using `npm test`.


## Post-Feedback Changes

* There is now a pagination feature to expand the number of possible results without flooding the page
* The list of results is now in a scrollable container
* The document title now is appropriately changed
* Multiple authors are now no longer followed by a trailing comma
* Files now have appropriate permissions
* Error messages are now tailored to the error
* Search results that lack a picture no longer break the app and force an error
