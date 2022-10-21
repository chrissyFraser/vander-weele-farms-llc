09.29:
- Added journal page
- Created list customers and new customer api design psudeo code for end points

9.30
- Worked with team to update API endpoints

10.03
Today I worked on:
- Adding all features as issues
- We started assigning issues
- I learned the format journal entries should be
  
  We realized we had a misunderstanding about how we should go about achieving our stretch goal, and came to the conclusion that assigning orders to trucks didn't need to be so complicated (so maybe we will get that implemented before the project is due).

  Parts of Fast APIs seem to be making sense to me, but I still need to get into some actual coding using them before I can say I have an understanding of how things work.

  Team deployed under construction page!

  10.04
  Today I worked on:
  - Authentication research
    - https://fastapi.tiangolo.com/advanced/security/ 
    - https://fastapi.tiangolo.com/tutorial/security/first-steps/
    - https://fastapi.tiangolo.com/advanced/security/oauth2-scopes/#oauth2-scopes-and-openapi
    - https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/#oauth2passwordrequestform
  - Then I found out that was best saved for later
  I followed the fastapi tutorial for OAuth2 authentication, and got a test version to run on http://127.0.0.1:8000/docs#/default. After playing around with it I understand some of what is happening and feel good putting it aside until we get some more information.

  10.05
  Today I worked on:
  - FAST API research
  - We designated tasks for endpoint
  - I will start on Customers tomorrow
  I realized I missed an entire page (1.5 huors of videos) on Fast APIs and now things are making MUCH more sense! I should be able to dive into some productive coding tomorrow.


  10.06
  Today I worked on:
  - Customers
  - ALL the customers (!)
  - created:
    - get_all_customers
    - get_one_customer
    - update_customer
    - delete_customer
    - create_customer (FIXED IT!!!)
It was good to finally get my hands on the code and start figuring out what things do. Everything customer related tested and works! I accidentally set the status code to 400 - when I corrected to 200 it worked.

10.07
Today I worked on:
- Drivers
- created endpoints for:
  - get_all_drivers
  - get_one_driver
  - update_driver
  - delete_driver
  - create_driver
I got bored and wanted to try running through these all again. Seems to have worked!

10.10
Today I worked on:
- Creating a relationship between customer driver_id and driver(id and driver_name)
I didn't know how to create a foreign key, but I was able to figure it out and as far as I have tested it seems to be working!

10.11
Today I worked on:
- Databases
We need another database for our accounts/authorization service, and I can't figure out how to create another one.

10.12
Today I worked on:
- Authorization
Couldn't get the second database set up so I started looking into authorization.

10.13
Today I worked on:
- Authorization
Finally made some progress on authentication. I am getting the data mixed up at some point, but finally seeing the information, and cant post successfully, but it is going through so I can get all. Something iss going wrong with the hashed password.

10.14
Today I worked on:
- Authorization
I finally found that I was trying to return the wrong form of AccountOut, and once corrected was able to successfully post. I can only login using the id though, which is a problem. I need to figure out where that is getting mixed up.

10.15
Today I fixed:
- Authorixzation
I was selecting the id instead of email from the table, so it was only allowing me to login with the id, not the email.

10.17
Today I worked on:
- Databases
- Tokens across microservices
- Renamed 'sample_service' to accounts_service
I figured out I was trying to make creating multiple databases WAY more complicated than necessary. I started trying to figure out how to communicate that a user has a token across microservices.

10.18
Today I worked on:
- Added roles to the authorization token
- Restricted access to "admin" methods to only users with "admin", on their token
- Restricted access to some methods to only logged in users
Questions I still have:
- Will this method work when polling for the data from accounts?
- What do I need if the user doesnt meet authorization criterea?
I made a lot of progress today, and figured out a way to restrict access from the backend. I did have to put my accounts information into the monolith for now, because I don't know how to poll for the token from the other service. I need to check if my method will work when I seperate them again. (and figure out how to seperate them)
????? 28:00 in video: return vacations.get_account_vacations(account_data) ?????


10.19
Today I worked on:
- Splitting the monolith and account 
- Add 401 Error for unauthorized account levels
- Cleaned up code
Was able to create a concrete class/method for the Authenticator, and used that to verify account information through the cookie instead of needing a poller. Added proper 401 Error message for unauthorized user levels.

10.20
Today I worked on:
- Authorization on frontend

10.21
Today I worked on:
-Added Signup
-Added Logout
Lots of cosmetic work to be done, but technically it works!