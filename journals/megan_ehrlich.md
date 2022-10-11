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

10.08
Today I worked on:
- Creating a relationship between customer driver_id and driver(id and driver_name)
I didn't know how to create a foreign key, but I was able to figure it out and as far as I have tested it seems to be working!