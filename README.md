# Quickbite

## [See the App!](https://lexi-words.netlify.app)

![Quick bite Logo](./src/assets/imagenes/logo.png)

## Description

Quickbite is the app that turns your favorite recipes into fast, organized shopping lists—making cooking easier from the very first step.

#### [Client Repo here](https://github.com/somorales/quickbite-frontend)

#### [Server Repo here](https://github.com/somorales/quickbite-backend)

## Technologies, Libraries & APIs used

- **Frontend:** React, HTML5, CSS3, JavaScript
- **Backend:** Node.js
- **Styling:** Tailwind
- **HTTP client:** Axios
- **Deployment:** Netlify (Frontend), Render & Mongo Atlas (Backend)

## Backlog Functionalities

- **Recipes:** -View all recipes - View a recipe in detail - Filter recipes -add them to your favorites -add recipe list -generate a single shopping list with all the ingredients you need.

# Client Structure

## User Stories

- sign up - As a user I want to sign up on the webpage so that I can see the app.
- login - As a user I want to be able to log in on the webpage so that I can get back to my account.
- logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- homepage - As a user I want to be able to access the homepage so that I can see all my recipes.
- recipespage- As a user can view the details of a recipes.
- favoritespage- As a user can view all favorite recipes.
- filterspage- As a user can search for recipes by cooking time, cuisine, and dietary style.
- Filteredresults- As a user can view all results based on the selected filters.
- meallistpage- As a user can add the recipes they want to use and generate a shopping list.

## Client Routes

| Path                 | Page                | Components      | Permissions | Behavior                                                                |
| -------------------- | ------------------- | --------------- | ----------- | ----------------------------------------------------------------------- |
| `/signup`            | SignUpPage          | Signup          | Public      | Allows users to create an account.                                      |
| `/login`             | LoginPage           | LoginPage       | Public      | Allows users to log in to their account.                                |
| `/logout`            | -                   | LogoutFunction  | Private     | Logs out the user and redirects to the login page.                      |
| `/`                  | HomePage            | HomePage        | Private     | Displays the homepage with a list of all user recipes.                  |
| `/recipes`           | RecipesPage         | AllRecipes      | Private     | Displays a list of all available recipes.                               |
| `/recipes/:recipeId` | RecipeDetailPage    | RecipePage      | Private     | Displays the details of a specific recipe.                              |
| `/favorites`         | FavoritesPage       | Favorites       | Private     | Displays all favorite recipes of the user.                              |
| `/filters`           | FiltersPage         | Filters         | Private     | Allows users to search for recipes by cooking time, cuisine, and style. |
| `/filteredResults`   | FilteredResultsPage | FilteredResults | Private     | Displays all recipes matching the selected filters.                     |
| `/mealsList`         | MealListPage        | MealListPage    | Private     | Allows users to plan meals and generate a shopping list.                |

## Other Components

- **NavigationBar:** A navigation bar with links to different sections of the app (Home, Profile, Favotites and Meallist).

## Links

### Project

[Repository Link Client](https://github.com/somorales/quickbite-frontend)

[Repository Link Server](https://github.com/somorales/quickbite-backend)

[Deploy Link](https://lexi-words.netlify.app/)
