// URL приложения авторизации, на который ведут кнопки «Войти» и CTA.
// TODO: заглушка ведёт на сам лендинг — заменить, когда приложение авторизации
// будет готово, либо задать переменную окружения VITE_AUTH_URL (см. .env.example).
export const AUTH_URL: string = import.meta.env.VITE_AUTH_URL ?? '/'
