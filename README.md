# Secret Escapes Full stack engineer take home task

This project is a starting point for the fullstack engineer technical interview take home task.
It consists of a Frontend (with some functionality already build) and a backend application (to be created by you).

## Frontend application

The frontend application is build using Create react app and is a simple react app using typescript.

### Prerequisites

- Node (version 14+)
- Yarn (modern version)

### To install dependencies

From the `frontend-application` directory and `yarn`
From the `frontend-application` directory and `yarn add axios`
From the `frontend-application` directory and `yarn add react-icons`


### To start the application

From the `frontend-application` directory run `yarn start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Project overview

- `.env` contains URL for Sparrow graphql API
- `index.tsx` is where the application is set up, including the configuration of Apollo client
- `App.tsx` is the root of the application, and where URL routing is configured
- `UserContext` is set up in `App`, this means you can access the user ID in any component via this context
- `pages` directory contains the top-level components which form the contents of each page
- `components` directory contains other reusable components
- `layout` contains the main layout for the page including menu bar
- `utils` contains helper functions to perform data fetching

## Backend application
The backend application is build using Spring boot app in Java, and mySQL database for persistence. 

### Prerequisites

- Java (version 11)
- mySQL80 database

### To start the application
Install mySQL80 and run the service to setup database connection using port 3306 (http://localhost:3306).

From the `backend-application` directory right click the FavouritesApplication.java and Run Java (varies depending on IDE).

This runs the app in the development mode.
Open [http://localhost:8080] to view it in the browser.

## Implementation Comments
Added lombok library to reduce boilerplate code.
Used RestAPI for endpoints as I have used it more often than GraphQL.
Added axios library to frontend for better fetching of data from endpoints.
Added react-icons library to use favourite icons.
The fetch methods are in the SaleCard, LoginButton components, and the Favourites and SaleDetails pages.

## Bugs:
Favourites page only retrieves only the first element.
RemoveFavourite checks for state of favourite to remove it but then inserts duplicate with a different Id instead.
First navigation to favourites after login requires browser refresh to load.

## Given more time:
-Bug fixing to complete functionality.
-Improve navigation from favourites page in different authentication states.
-The database entities can be structured better.
-The calls from the frontend application have repititive code that can be reduced and re-used.
-The UI for the favourites and the favourite button needs to be handled.
-Reduce unneccessary calls and cache results for better performance.
-Clean up the code and add documentation to methods.
-Better distribution of fetch methods (single responsibility object).

## Note: 
The sparrow graphQL layer was not loading anything when trying to access it on several networks and devices, then after searching around and debugging I found out it was a client side issue. 
I suspected it was due to the geographical location, so I tried accessing the link using a VPN with a location set in Europe and it worked.