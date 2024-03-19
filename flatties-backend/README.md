## Flatties backend API documentation

## Overvie

- **URL**:{baseUrl}/api/v1
- **Enveriment Veriable**: 
    - PORT
    - MONGODB_URL
    - TOKEN_SECRET
- **Request parameters** : none
- **Header** : 
    `Content-Type: application/json`
    `Authorization: "Bearer " + token`
- **Response** :JSON format
```json
    {
        "message":"A message from endpoint",
        "{objectName}":"An Object"
    }
```
- **Error** :JSON format
```json
    {
        "message":"A message from endpoint",
        "error":"Error message"
    }
```

## User Endpoints

- **GET /user/all**
    - *Description*: Retrieve all user object in database
    - *Required Account Type*: `admin`
    - *Request body*: none

- **GET /user/profile**
    - *Description*: Only return the user object of the requesting user for receiving personal information.
    - *Required Account Type*: none
    - *Request body*: none

- **GET /user/find**
    - *Description*: Return an user object with a required user ID
    - *Required Account Type*: `admin`
    - *Request body*: 
    ```json
    {
        "userId":"xxxxxxx"
    }
    ```

- **GET /user/watchinglist**
    - *Description*: Return user's watching list
    - *Required Account Type*: none
    - *Request body*: none

- **POST /user/login**
    - *Description*:login endpoint
    - *Required Account Type*: none
    - *Request body*: 
    ```json
    {
        "email":"xxxxxxx",
        "password":"xxxxxxx"
    }
    ```    

- **POST /user/create**
    - *Description*: Register new user
    - *Required Account Type*: none
    - *Request body*: 
    ```json
    {
        "username":"xxxxxxx",
        "firstname":"xxxxxxx",
        "lastname":"xxxxxxx",
        "email":"xxxxxxx",
        "password":"xxxxxxx"
        ...
    }
    ```

- **POST /user/watchproperty**
    - *Description*: add a property to user's watching list
    - *Required Account Type*: none
    - *Request body*: 
    ```json
    {
        "propertyId":"xxxxxxx",
        "status":"xxxxxxx",
        "note":"xxxxxxx",
    }
    ```
- **PATCH /user/update**
    - *Description*: Update user information, but `accountType`,`isActive`,`watchingList` are not allowed to be updated from this endpoint 
    In the future, `password` updates will also be separated into a separate endpoint from this one.
    - *Required Account Type*: none
    - *Request body*: 
    ```json
    {
        "username":"xxxxxxx",
        "firstname":"xxxxxxx",
        "lastname":"xxxxxxx",
        "email":"xxxxxxx",
        ...
    }
    ```

- **PATCH /user/active**
    - *Description*: swith the user active status
    - *Required Account Type*: `admin`
    - *Request body*: 
    ```json
    {
       "userId":"xxxxxxx"
    }
    ```
    
- **PATCH /user/accounttype**
    - *Description*: Only for update user's accounty type
    - *Required Account Type*: `admin`
    - *Request body*: 
    ```json
    {
        "userId":"xxxxxxx",
        "accountType":"xxxxxxx",
    }
    ```

-   **DELETE /user/delete**
    - *Description*: delete a user by user ID
    - *Required Account Type*: `admin`
    - *Request body*: 
    ```json
    {
        "userId":"xxxxxxx",
    }
    ```