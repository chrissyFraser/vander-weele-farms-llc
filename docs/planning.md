## additional information
admin can add customers and manually input the orders
manually override the order if there isn't enough to fill it

Print out a list of all the orders like how we did it in carcar see table.image

see if you can send a text reminder

do away with the payment page.

NO prices

We need a way to create a new instance on the loads render page that will make a new load if the original order will not fit on a single pallet

When a customer submits an order email the farm

send an sms message to specific customers on their day for orders. 

orders must be printed in order to be deleted

when will orders be deleted? end of day maybe?

See if we can just click and drag

 account needs to be its own micro service


# Goals
We Need an about page that allows anyone who gets to the website can see

We need a login button that allows customer to login

We need a create account page that is only visible if the admin sends a link to that page

We need to have 2 levels of authorization; customer and admin

### Customer Access
On the create account page they need to be able to input their store name and city/location

The customer needs to be able to see the list of AVAIALABLE products

The customer needs to be able to add the above products to their cart

The customer needs to be able to review their cart and see/edit what is in there

The customer needs to be able to submit the order


### Admin access
The admin needs to be able to create a product that should include
* Product name
* Product description
* Product availability
* Product image
The admin needs to see the full list of products and be able to edit them; a clickable available/not available button needs to be there

The admin needs to be able to add a customer as not all the customers will be using this site for there orders

The admin needs to be able to see the full list of customers

The customers need to be editable as there will be two extra fields that the customer will not be able to input. Those are;
* Driver id
* Priority id

The admin needs to be able to see the list of orders, this has 2 parts;
* the list needs to be in a simple row/column format showing all the open orders (see table_image)
* The list needs to be in formatted so that it shows 2 smaller sublists that are filtered by the driver id, each sublist needs to also be filtered by the priority id so that the orders are arranged in the order that they will be delivered in. 
* There should also be a way for the admin to render 2 blank sublists in that are formatted with dropdown menus where the load should render and be able to choose from the list of all orders which goes where


### Functionality
We need to be able to get a list of products

We need create a product

We need to be able to get the details of a product

We need to be able to edit or delete a product

A product needs to have;
* product name
* product image
* product description
* bool, is available

We need a customer that has fields;
* store name
* store location
* driver id *this one still needs to be figured out, it may be a foreign or we may be able to reference the id of the driver object
* priority id


We need a driver that has fields;
* driver name

When creating an account the customer should not see 
* driver id
* priority id
These will be assigned by the admin

We need to assign the driver id & priority id to a customer

We are going to need a cart that allows a customer to add products

We are going to need to The cart to be able to submit an order


An order needs to contain:
* customer name
* customer location
* driver id
* priority id
* for each product
* * product name
* * product quantity
* bool, is completed?


We need to list orders;
* list all orders
* filter by driver id
* * once filtered by driver id filter in order of priority id

We need to implement some sort of authorization that has levels;
* not logged in/no account
* customer
* admin



We need a user to see/navigate to the log in page but not the create account page

We need the admin to email the create account url to a potential customer

We need to send an sms reminder to a customer that reminds them to place an order

