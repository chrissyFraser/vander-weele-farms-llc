# Module3 Project Gamma
# LegWalkers VanderWeele Farms LLC website
- Joshoua LaForest
- Megan Ehrlich
- Chrissy Fraser
- Steve Svirko
- Marble - Scott Nideffer

Our new website for VanderWeele Farms, to improve customer and staff experience by allowing them to handle these orders through a website catered to their needs.


## Who is it for?

We have built this website to specs based on communication with our client, VanderWeele Farms.

## Functionality

- Everyone can view the home page.
- First time users will be prompted to sign up to view other pages.
- Upon signup they fill out another form with more information to save to the database.
- Users are now directed to the main cart page where they can:
  -  view available produce
  -  add and remove quantities of items from their basket
  -  submit their order
- Upon submit information is pulled from the user's cookie to match their information with the customer profile in the database and saved with the order.
- Admin level users can view a list of all orders with information from the user who submitted it.
- Admin users also have an admin section where they can:
  - add new produce
  - update individual values of existing produce
  - remove produce



### What makes up this project?
- accounts_service
  For user security we have the user login information in a different microservice from the rest of our application. We used JWT tokens to verify user authentication and authorization. User info is pased through to the monolith service through cookies. Fasr API CRUD endpoints for users are here. This directory also includes tests for the accounts service.
- data
  This directory stores information needed for the monolith/farms database.
- data_a
  This directory stores information needed for the accounts database.
- docs
  Includes planning files for our project and images used in it.
- ghi
  Includes all the information needed for the react side of this project. We used react hooks for the pages.
- journals
  Includes detailed journal entries from each member of team detailing the process of creating the site.
- monolith_service
  This is where the bulk of our application is. It includes the Fast API CRUD endpoints we use for our customers, products, and orders. This includes all the tests for the monolith service.
- The remaining node directory and files including gitlab-ci.yml, and docker-compose.yaml are essential for smoothly running this application.




## How to complete use

Please follow the steps listed to get this project up and running on your local machine.

- Clone this repository to your machine.
- Make sure you are in the proper directory for this project.
- Neccessary volumes will be automatically created for you.
- From this directory run `docker-compose build`
- Then run `docker-compose up`
- Visit localhost:3000 through your browser and enjoy the site!


## Future plans for this project
We layed the ground work for many future features for this site, including:
- Complete and functional CRUD endpoints for creating a driver to be assigned to the orders
- Very nice bootstrap designs for the site
- Dynamic nav bar to adapt to whether the user is logged in or not.