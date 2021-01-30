FROM python:3.9

ENV POETRY_VERSION 1.1.4
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/${POETRY_VERSION}/get-poetry.py | python
ENV PATH /root/.poetry/bin:${PATH}

COPY poetry.* ./
COPY pyproject.toml ./
RUN poetry install

ENTRYPOINT ["uvicorn"]
CMD ["main:app"]
