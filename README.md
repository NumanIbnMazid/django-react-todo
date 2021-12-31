# A simple `Todo` application made with `Django` & `React JS`

## Features

* Todo CRUD
* Todo Filter
* Prioritize Task
* Responsive UI

## Tools

* Python, Django, Django Rest Framework, Docker, PostgreSQL, JavaScript, React JS, Bootstrap

## Running Project

There are two parts of this project:

* Backend (Django REST API)
* Frontend (React)

#### Prerequisites

* Running `Python 3.6+`
* Running `pip` or `poetry`
* Running `Node v16+`
* Running `npm`
* Running `npm` or `yarn`
* Running `PostgreSQL` or `MySQL` [Django Default Databse `SQLite3` can be used for simplicity]
* Django Secret Key can be generated from here: <https://djecrety.ir/>
* Create a Database for the project

### Project Setup

##### (Prepare Backend)

* Navigate to the `backend` directory
* Create a `.env` file using the template `.env.example`
* Create a python virtual environment for the project. Refer to this link for help: <https://gist.github.com/dreamorosi/e2947827e5de92b69df68c88475eba38>
* Install the dependencies within the `backend` directory

```bash:
pip install -r requirements.txt
```

* Run Migrations

```python:
python manage.py makemigrations
python manage.py migrate
```

* Test if the server is running as expected

```python:
python manage.py runserver
```

This should run the development server in the following url in port 8000: <http://127.0.0.1:8000/>

##### (Prepare Frontend)

* Navigate to the `frontend` directory
* Install the dependencies

```bash:
npm install
```

* Run the developement server

```bash:
npm run start
```

This should open the development server in the following url: <http://localhost:3000/>

Now browse the following url and test the application.


#### Sample API Response Formats

##### `CREATE` Todo Response

```json
{
    "error": {
        "code": null,
        "error_details": null
    },
    "data": {
        "id": 6,
        "title": "Todo Item Six",
        "slug": "todo-item-six-8d4741fc-a4a6-4582-a82d-edb5dce9588b",
        "description": "Amazing Sixth Todo Item",
        "is_completed": true,
        "priority": "Medium",
        "created_at": "2021-12-30 07:41:06",
        "updated_at": "2021-12-30 07:41:06"
    },
    "status": true,
    "status_code": 201,
    "message": "Success"
}
```

##### `RETRIEVE` Todo Response

```json
{
    "error": {
        "code": null,
        "error_details": null
    },
    "data": {
        "id": 6,
        "title": "Todo Item Six",
        "slug": "todo-item-six-8d4741fc-a4a6-4582-a82d-edb5dce9588b",
        "description": "Amazing Sixth Todo Item",
        "is_completed": true,
        "priority": "Medium",
        "created_at": "2021-12-30 07:41:06",
        "updated_at": "2021-12-30 07:41:06"
    },
    "status": true,
    "status_code": 200,
    "message": "Object retrieved successfully!"
}
```

##### `UPDATE (PUT)` Todo Response

```json
{
    "error": {
        "code": null,
        "error_details": null
    },
    "data": {
        "id": 6,
        "title": "Todo Item Six Updated in PUT Method",
        "slug": "todo-item-six-8d4741fc-a4a6-4582-a82d-edb5dce9588b",
        "description": "Amazing Sixth Todo Item",
        "is_completed": true,
        "priority": "Medium",
        "created_at": "2021-12-30 07:41:06",
        "updated_at": "2021-12-30 07:45:20"
    },
    "status": true,
    "status_code": 200,
    "message": "Updated successfully!"
}
```

##### `UPDATE (PATCH)` Todo Response

```json
{
    "error": {
        "code": null,
        "error_details": null
    },
    "data": {
        "id": 6,
        "title": "Todo Item Six Updated in PATCH Method",
        "slug": "todo-item-six-8d4741fc-a4a6-4582-a82d-edb5dce9588b",
        "description": "Amazing Sixth Todo Item",
        "is_completed": true,
        "priority": "Medium",
        "created_at": "2021-12-30 07:41:06",
        "updated_at": "2021-12-30 07:46:23"
    },
    "status": true,
    "status_code": 200,
    "message": "Updated successfully!"
}
```

##### `DELETE` Todo Response

```json
{
    "error": {
        "code": null,
        "error_details": null
    },
    "data": null,
    "status": true,
    "status_code": 204,
    "message": "Deleted successfully!"
}
```

##### `LIST` Todo Response

```json
{
    "error": {
        "code": null,
        "error_details": null
    },
    "data": [
        {
            "id": 5,
            "title": "Todo Five",
            "slug": "todo-five-fafffa8d-9209-4628-acfc-05df74460d3c",
            "description": "Fifth Todo",
            "is_completed": true,
            "priority": "Medium",
            "created_at": "2021-12-30 07:36:33",
            "updated_at": "2021-12-30 07:36:33"
        },
        {
            "id": 1,
            "title": "Todo One",
            "slug": "todo-one-72188484-7797-4b5e-a359-74d9123a2492",
            "description": "First Todo",
            "is_completed": false,
            "priority": "Low",
            "created_at": "2021-12-30 06:42:09",
            "updated_at": "2021-12-30 06:42:09"
        }
    ],
    "status": true,
    "status_code": 200,
    "message": "List retrieved successfully!"
}
```

[#python]() [#django]() [#django_rest_framework]() [#react]() [#react_js]() [#postgresql]() [#mysql]()
[#todo]() [#django_react_todo]() [#djano_react_todo_application]() [#django_react_docker]() [#todo_application]()