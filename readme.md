# Front-end coding exercise

If you read this, it is then time to dive into some coding! Your next step in our journey is to express your skills through an assignment which you can expose during a later code review session.

## What to code: a simple lesson management front-end

We prepared an API waiting for your awesome code! Our API is sitting there: [https://api-x.herokuapp.com](https://api-x.herokuapp.com) and you can find its documentation in [`docs/` (link)](https://api-x.herokuapp.com/docs/)

You are required to develop a front-end against our API. The API provides a simple object: _Categories_ with has the following format:

```json
{
  "id": 0,
  "name": "string",
  "description": "string"
}
```

Your front-end must allow the following actions:

- List all categories
- Create a category
- Update a category
- Delete a category

Such development aims at being the MVP of a growing application: scalability is an appreciated point. The API also provides _Courses_ and _Lessons_ data, which are out of scope of this exercise. May you want to explore, you can find more information about those objects in the API documentation link.

This assignment involves multiple front-end concepts, among which:

- **API call**: you are free to use a library you prefer
- **State management**: you are free to use the state management library you prefer ([Redux](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for React or [Vuex](https://vuex.vuejs.org/) for Vue.js).
- **Routing**: Routing is optional in this exercise as everything can be done in a single page.
- **Styling**: plain CSS is enough for this assignment. You are free to use a CSS pre-processor such as [SASS](https://sass-lang.com/), LESS or [Stylus](http://stylus-lang.com/)

One objective is to be as close as possible as a real-life situation when you will submit some pull request to your reviewer(s). You are also welcomed to go the extra-mile, helping you to make a difference

### Remarks

#### Coding

- **JavaScript only**:
  JavaScript is required. You are free to use any library / framework / third-party tool you'd like to achieve your assignment. Preference goes with Vue.js or React.js

#### API Calls

- **String ending slashes**:
  Our back-end cares about ending slashes in URLs so `/some-url` might fail while `/some-url/` will work
- **CORS**:
  CORS is currently configured to accept all origins. Please let us know if you encounter a CORS error.
- **JSON**:
  All requests body and responses body are using JSON. Make sure that necessary headers are properly set.

#### Authentication: protected endpoints

Protected endpoints use [_Bearer Authentication_](https://swagger.io/docs/specification/authentication/bearer-authentication/). Upon a successful authentication, a token will be sent. This token has to be used in all requests to protected endpoints by adding the `Authorization: Bearer <token>` HTTP header.

##### Postman

- Set the required methods and URL
- Set `Authorization` to `Bearer token` and input the token on the right

##### Curl

Example to get the list of categories

```sh
curl https://api-x.herokuapp.com/v1/categories/ -H "Authorization: Bearer {your token here}"
```

#### Authentication: login

To fetch the Bearer token, you'll have to login

[Basic authentication (mdn link)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) is used for authenticating users. Basic authentication is done with a `POST` request to the login endpoint (`https://api-x.herokuapp.com/v1/login/`) using the HTTP header `Authorization: Basic <credentials>`, `credentials` being the Base64 hash of `{username}:{password}` (username, colon, password). You can use the [`btoa`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) method to encode a string in Base64

##### Login with Postman

Login in Postman is straightforward:

- Set request method to `POST`
- Set URL to `https://api-x.herokuapp.com/v1/login/`
- Set _Authorization_ to `Basic Auth` and input your username and password

Your request is ready!

##### Login with Curl

By using `curl`:

```sh
curl -X POST https://api-x.herokuapp.com/v1/login/ --user {username}:{password}
```

Or with some base64 utilities:

```sh
echo -n "{username}:{password}" | base64
# It ouputs the base64 encoding. The output has to be copied in the "base64" placeholder below
curl -X POST https://api-x.herokuapp.com/v1/login/ -H "Authorization: Basic {base64}"
```

##### Login Response format

In succeeding, you will received a response looking like

```json
{
  "token": "c1aff2xxxxxxxxxx1cdb8exxxxxxxxx4031c121",
  "user_id": 2,
  "email": "someone@joyz.co.jp"
}
```

Invalid credentials return:

```json
{
  "detail": "Invalid username/password."
}
```

To logout (invalidate your current token), you have to send a `POST` request to `https://api-x.herokuapp.com/v1/logout/`

You have to send the token as body:

```json
{
  "token": "c1aff2xxxxxxxxxx1cdb8exxxxxxxxx4031c121"
}
```

Response example:

```json
{
  "success": true
}
```

Logging out with an invalid token results as:

```json
{
  "detail": "Invalid token."
}
```

<sub>[↑ top](#front-end-coding-exercise)</sub>

### Categories endpoints

List of error status (such as 404 when accessible an invalid ID) are not detailed here.

- `https://api-x.herokuapp.com/v1/categories/`
  - Method: `GET`
    - `Body`: None
    - Return the list of categories
  - `Method`: `POST`
    - `Body`: the to-be created category such as `{"name": "category name", "description": "category description"}`
    - Create a new category
    - Returns the category, with the new id, if the creation is successful. Otherwise, the response describes the error
- `https://api-x.herokuapp.com/v1/categories/:id/`
  - Method: `GET`
    - `Body`: None
    - Return a requested category for the specified ID
  - Method: `PUT`
    - `Body`: The to-be-updated category
    - Fully update a requested category for the specified ID
  - Method: `PATCH`
    - `Body`: To be updated fields only such as `{"description": "the new description"}`
    - Partially update a requested category for the specified ID
  - Method: `DELETE`
    - `Body`: None
    - Delete a requested category for the specified ID

<sub>[↑ top](#front-end-coding-exercise)</sub>
