# homely - the productivity and wellness platform

## Organization 
The backend and frontend source code for this project is organized into the homely-backend and homely-frontend folders respectively. Each contains a README on all the installations necessary to host the Django/React servers locally. Our Django project is contained in homely-backend/backend, in which the homely app can be found as well as our database file db.sqlite3. Images are stored in homely-backend/backend/media/gallery. 

#### Kathy Daniels, Bryan Wong, Caleb Terrill, Jay Park, Fred Chu
### [Github Repository](https://github.com/danielskathyd/homely) | [Figma Design](https://www.figma.com/file/LgFWGLVNPVneEaJUmEv9mL/homely?node-id=0%3A1)

## Intro 
With concerns about COVID-19's exponential growth over the past few months and statewide quarantines taking place, we recognize how difficult it has been for communities to stay connected with each other, maintain health and wellness, and continue on with some semblance of normal life. From student responsibilities and work life to checking in with family and keeping up with friends, it can be easy to become overwhelmed with the drastic changes occurring everyday.

Social media platforms like Instagram have already seen a variety of trending challenges from those choosing to remain indoors during this difficult time. Push up challenges and embarrassing old photos show us that the young community continues trying to find unique ways to cope with social distancing and to spend their time. People on YouTube have started sharing videos about how they spend their days inside, things such as "quarantine recipes" or developing film at home or self-care practices at home.

## About homely
With these ideas in mind, we decided to build homely. Homely is a productivity and social networking website  designed to encourage wellness and social distancing, while still allowing for productivity and entertainment at home. A minimal to-do checklist allows users to keep track of goals they'd like to accomplish day to day, while a panel of shared photos helps users to see what others are doing during their quarantine experience. This panel is meant to inspire users with new ideas on how to spend their time or practice wellness at home, while also being able to share details about their personal accomplishments from their to-do list. And remember: **Be homely, not lonely**

## Backend
We used Django as our backend web framework for the development of homely . This allowed us to develop a system using Python that would control our database and respond to http get and post requests. Additionally, the Django admin site easily allowed us to manual make changes to our database. During our development and testing, we hosted this backend locally on our laptops, but it could be easily deployed to a web server to be available on the internet.

Our backend API uses three main models: a user model, a personal todo model, and a public todo model. By deserializing Information from our local SQLite tables, we were able to receive information about our users/todo items in JSON format at the frontend. These JSON objects could then be easily parsed to display a user's personal todos or the public gallery of todos. Additionally, we used `knox` in order to authenticate user logins. Upon a successful validation, a token hash is returned that is used to fetch a user's todos. Upon logout, this token is invalidated.

## Frontend
For developing frontend, we started out by using a module called material-ui which had built in components. After creating the  overall layout of the website, we began to incorporate the components with Javascript and build several of our own React.js components to easily make them interactive. Our frontend mostly uses React.js, but we connect them to our backend services using Javascript and Python to fetch data and display them on the frontend.

## Improvements
The next step of this project would be a live deployment of the application using Heroku or AWS. It is currently just hosted on a local server, as shown in the demonstration video. We would also touch up the front end so that the post feed is more smooth and more closely resembles the Figma mockup. 
