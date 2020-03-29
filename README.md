# homely - the productivity and wellness platform
#### Kathy Daniels, Bryan Wong, Caleb Terrill, Jay Park, Fred Chu
### [Figma Design](https://www.figma.com/file/LgFWGLVNPVneEaJUmEv9mL/homely?node-id=0%3A1) [Devpost](https://devpost.com/software/homely-15mlc4)

## Organization 
The backend and frontend source code for this project is organized into the homely-backend and homely-frontend folders respectively. Each contains a README on all the installations necessary to host the Django/React servers locally. Our Django project is contained in homely-backend/backend, in which the homely app can be found as well as our database file db.sqlite3. Images are stored in homely-backend/backend/media/gallery. 

## Intro 
With concerns about COVID-19's exponential growth over the past few months and statewide quarantines taking place, we recognize how difficult it has been for communities to stay connected with each other, maintain health and wellness, and continue on with some semblance of normal life. From student responsibilities and work life to checking in with family and keeping up with friends, it can be easy to become overwhelmed with the drastic changes occurring everyday.

Social media platforms like Instagram have already seen a variety of trending challenges from those choosing to remain indoors during this difficult time. Push up challenges and embarrassing old photos show us that the young community continues trying to find unique ways to cope with social distancing and to spend their time. People on YouTube have started sharing videos about how they spend their days inside, things such as "quarantine recipes" or developing film at home or self-care practices at home.

## About homely
With these ideas in mind, we decided to build homely. Homely is a productivity and social networking website  designed to encourage wellness and social distancing, while still allowing for productivity and entertainment at home. A minimal to-do checklist allows users to keep track of goals they'd like to accomplish day to day, while a panel of shared photos helps users to see what others are doing during their quarantine experience. This panel is meant to inspire users with new ideas on how to spend their time or practice wellness at home, while also being able to share details about their personal accomplishments from their to-do list. And remember: **Be homely, not lonely**

## Backend
We used Django as our backend web framework for the development of homely . This allowed us to develop a system using Python that would control our database and respond to http get and post requests. Additionally, the Django admin site easily allowed us to manual make changes to our database. During our development and testing, we hosted this backend locally on our laptops, but it could be easily deployed to a web server to be available on the internet.

Our backend API uses three main models: a user model, a personal todo model, and a public todo model. By deserializing Information from our local SQLite tables, we were able to receive information about our users/todo items in JSON format at the frontend. These JSON objects could then be easily parsed to display a user's personal todos or the public gallery of todos. Additionally, we used `knox` in order to securely authenticate user logins. Upon a successful validation, a token hash is returned that is used to fetch a user's todos. Upon logout, this token is invalidated.

## Frontend
For developing frontend, we started out by using a module called material-ui which had built in components. After creating the  overall layout of the website, we began to incorporate the components with Javascript and build several of our own React.js components to easily make them interactive. Even with a lot of modularization (we have 10 different React components), our main project file contains over 400 lines of code. With the help of material-ui, our website is also (mostly) responsive! Another notable fact about our website is that it is actually a single-page website with React Routes for the login/ register/ pop-up windows. This meant we had to do a lot more work with states, but it made for a more fluid user experience. Our frontend is connected to our backend services with the `axios` HTTP request package for fetching data from our local APIs.

## Improvements
The next step of this project would be a live deployment of the application using Heroku or AWS. It is currently just hosted on a local server, as shown in the demonstration video. We would also touch up the front end so that the post feed is more smooth and more closely resembles the Figma mockup. 

## Build Instructions
If you'd like to try homely yourself, here are the steps to build it:

### Backend
Navigate to `homely-backend/backend` as it contains `manage.py`, the script used to run our local Django server. Make sure pipenv and python3 are installed:

```
brew install pipenv
pip install --user pipenv
```

Install the following packages with pipenv:

```
pipenv install djangorestframework django-cors-headers

pipenv install django-rest-knox

pipenv install Pillow
```

Now we can run the server in the pipenv environment as follows:

```
pipenv shell
cd backend
python manage.py runserver
```

Here's a list of URLs/routes you can use:
* User APIs: http://localhost:8000/api/users
* Personal (private) Todo APIs: http://localhost:8000/api/ptodos
* Public Todo APIs: http://localhost:8000/api/todos

The following two URLs use `knox` and return a session Token on successful authentication:
* User Register: http://localhost:8000/api/register
* User Login: http://localhost:8000/api/auth/login

That token can be used to get that User's data:
* User data by Token: http://localhost:8000/api/auth/user
Make sure to include the header for this URL:
```
Header:
{
  "Authorization" : "Token <INSERT TOKEN HERE>"
}
```
And lastly:
* Logout: http://localhost:8000/api/auth/logout
(This invalidates the token)

### Frontend
Navigate to homely-frontend and run:
```
npm install
```
This could take a while, as my team members can attest to :)
After this install is complete, run:
```
npm start
```
And the website should be good to go at http://localhost:3000/. Hope you enjoyed our project, we had a lot of fun making it!
