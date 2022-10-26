9/29/2022

    Wrote api endpoints for drivers.

10/06/22

    cloned this repo to local, no longer working on old repo.

10/10/22

    started working on shopping cart in an external file.

10/11/22

    beginning attempts at integrating shopping cart to project.
    fixed cart header to display actual count of items in cart (thanks Chrissy!)

10/12/22

    - planning implementation of cart to project, must retrieve from API endpoints.
    - created cart-specific branch, added cart modules to project, cannot successfully run npm start.
    - created docker database, ran docker-compose build & docker-compose up, do not need to run npm start. 

10/13/22

    - attempting new cart approach, working with Chrissy and Steve on a single cart rather than 3 separate 
    attempts.

10/17/22

    - overall rough day, not much was done
    - began working on CI/CD and testing

10/18/22

    - working on CI/CD and testing with "The Elliots", databases are having errors when trying to build
    - found out the issue and didn't begin working on them until following day

10/19/22

    - began removing unused imports & fixing dependency issues in produce.js files. added image element alt prop for header.js
      - 25 problems (0 errors, 25 warnings) => 5 problems (2 errors 3 warnings).
      - 5 problems (2 errors 3 warnings) => 3 problems (3 warnings)
      - 3 problems (3 warnings) => 0 problems!
      - 0 problems, pipeline is functioning with 0 errors!
    - site loads on heroku, no content, no links. attempting to fix.
    - database not installed.
    - installed and connected database. data not flowing

10/20/22

    - began working on connecting heroku app and PostgreSQL database
      - put code in app.js to link the two^
      - webpack error: can't resolve pg in app/src
      - ran npm install util, wrote line in webpack.config.js to ignore webpack error - util
      - ran npm install net
      - constant stream of webpack errors. Need help from group. Tomorrow at 4.
        - Greg says variables in gitlab-ci.yml file need to be replaced with actual usable variables. Will bring up in group tomorrow.

10/22/22

    - Working on database stuff with Josh. Pulled from main and merged into my working branch, Josh will be copying my branch.
    - Josh didn't actually copy my branch. 
    - Pushing to end the day. Figured out the lack of connection to postgres/postgres commands weren't working was because I didn't have postgres downloaded. Attempted to create empty or filled table, failed miserably. Was able to get it to try migration, it did connect, but it didn't like the migration file I passed in with cat <file_name> | heroku pg:psql. 
      - https://medium.com/@ronmartin89/heroku-how-to-seeding-a-postgresql-database-with-node-js-742bcf034d3e url for source of code

10/25/22

    - wrote test to get single customer
    - test isn't passing, editing to get it to pass
    - bricked old branch, starting new branch (working-marble-final)
    - started writing and mostly finished tests for create customer and get one customer. will finish tomorrow.

