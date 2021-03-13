const ERR_MESSAGE = {
  BAD_REQUEST: 'Введены некорректные данные',
  SERVER_ERR: 'На сервере произошла ошибка',
  NOT_FOUND: 'Запрашиваемый ресурс не найден',
  UNAUTHORIZED: 'Ошибка авторизации. Токен не прошёл проверку',
  TOKEN_NOT_FOUND: 'Ошибка авторизации. Токен недоступен',
  USER: {
    NOT_FOUND_ID: 'Пользователь с данным ID не найден',
    TAKEN_EMAIL: 'Ошибка регистрации. Данный email уже существует',
    INVALID_LOGIN: 'Неправильные почта или пароль',
  },
  MOVIE: {
    EMPTY_LIST: 'Список фильмов не найден',
    INVALID_ID: 'Фильм с данным ID не найден',
    FORBIDDEN_ACTION: 'У Вас недостаточно прав, чтобы совершить это действие',
  },
};

module.exports = ERR_MESSAGE;
