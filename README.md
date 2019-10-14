# PrepTalk

_Practice makes perfect, perfect with PrepTalk_

Looking to ace your next interview? PrepTalk can help!

PrepTalk is an interview practice platform to hone in on your delivery of the most common questions asked.
Through PrepTalk, users can create an account and record videos of themselves answering an interview prompt.
Once completed, feedback will be provided on one's facial expressions and speech.
Give it a shot!

## Our Team

Daphne Lee

Peter Lee

Austin Wu

Michael Chan

## Technologies Used

* React-Redux
* Node / Express
* D3
* Postgres
* Sequelize
* OpenTok
* AWS S3
* Google Cloud
* Google Speech-To-Text
* Face-API.js

We built PrepTalk using a variety of technologies. For our front end, we chose to use React and Redux to create an interactive single page application. We wanted to keep relations between users, their videos, facial data and transcripts, so our backend is composed of Postgres, Sequelize, Express and NodeJS.
In order to analyze facial expressions from recorded videos, we integrated face-api.js. Face-api.js uses a powerful 68 point landmark detection algorithm. These landmarks keep track of the location of certain facial features within each frame and is able to accurately determine whether someone is happy, sad, disgusted along with four other expressions. Each frame’s data is stored in our database and parsed to generate an average of the most frequently occurring facial expression within each video. This data is then presented as a donut crafted with d3.  
Other technologies used were, OpenTok SDK for its secure video recording and archiving capabilities, Google Cloud’s Speech-To-Text for its advanced machine learning models allowing it to transcribe speech with a much higher accuracy compared to its competitors.

## Try it Out

Our website is deployed through Heroku.

To see this project, please visit:

https://preptalk.herokuapp.com/
