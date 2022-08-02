# Orchard Tracker

This was my first attempt at a full stack CRUD web app using Node.js, Express, MongoDB, and some EJS.

**Live:** https://orchardtracker.herokuapp.com/

## How it's made

I combined what I learned from these three areas:
* https://zellwk.com/blog/crud-express-mongodb/
* https://fullstackopen.com/en/part3/node_js_and_express/
* https://www.twitch.tv/videos/1499332272
* (code: https://github.com/100devs/rap-names-express)

It uses HTML, CSS, JavaScript for the front end. 

The back end uses Node.js and Express framework and MongoDB as the database. There is some EJS for server-side rendering. I also used Postman to test the API.

## Optimizations

There are a few improvements I would like to make, but I don't know yet how:

* How to renew the page after replacing corn with beans.
* How to order results by date after entry.
* How to remove the first-entered cucumber plot (currently it removes the last).
* How to set the default date to today instead of leaving it empty
* How to rearrange what appears: Right now the yield comes before the seedling icon, I would like to see it come after. When I rearranged in the form, it just printed again.

## Lessons learned

The coolest thing I learned was using heroku's config vars through the web interface, setting a true/false condition by creating a key value pair there. 

https://discord.com/channels/735923219315425401/984252010356420659/988190779103146054

the actual connection string with the actual username and pw is entirely inside the .env file and also an env variable set in Heroku.

Here's how I explained it at the time:

One needs to tell heroku to look for the username/password in config vars or else it keeps searching for env and the solution is to use config vars.

if you have a key value pair in config vars like heroku: yes, then if the app is operating locally, then that would be false, and you would use dotenv, otherwise heroku knows to use the username and password for the mongoenvironment in config vars
and so the username and password is wrapped up in the connectionstring, and that whole connection string is the value to the key connectionString in config vars.

## Troubleshooting
I had a little trouble distinguishing between requiring 'CORS' and requiring 'body-parser'.

The explanation I got was:

CORS is to handle cross-origin resource sharing: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS If you've ever tried to use someone else's API and got blocked - you might have seen the error come up in the browser console. So to avoid this happening with our own API, we use that line of code. I guess it is indeed middleware. https://expressjs.com/en/resources/middleware/cors.html

body-parser is middleware to handle URL-encoded requests and JSON - so it does different things. But we don't need it anymore with current version of express. 

