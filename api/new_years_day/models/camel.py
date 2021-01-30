def to_camel(snake: str) -> str:
    words = snake.split("_")
    return "".join([words[0], *map(str.title, words[1:])])
