# Base Image
FROM python:3.8.8-alpine as base

ENV DJREACT_TODO_BACKEND=/home/app/backend

# set default environment variables
ENV PYTHONFAULTHANDLER=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONHASHSEED=random
ENV PYTHONUNBUFFERED=1
ENV APP_USER=myuser

RUN addgroup -S $APP_USER && adduser -S $APP_USER -G $APP_USER

# set working directory
RUN mkdir -p $DJREACT_TODO_BACKEND
WORKDIR $DJREACT_TODO_BACKEND

FROM base as builder

ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.1.11

# install dependencies
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk del build-deps \
    && apk --no-cache add bash nano musl-dev gettext linux-headers g++ libffi-dev


# install environment dependencies
RUN pip install --upgrade pip 

# Add user
# RUN addgroup -S $APP_USER && adduser -S $APP_USER -G $APP_USER
# USER $APP_USER

# Install project dependencies
COPY requirements.txt /home/app/backend/requirements.txt
RUN pip install -r requirements.txt

# copy project to working directory
COPY . $DJREACT_TODO_BACKEND

EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

CMD ["/bin/bash", "/home/app/backend/entrypoint.sh"]

# Use In Production Mode
# CMD gunicorn config.wsgi:application --bind 0.0.0.0:$APP_PORT