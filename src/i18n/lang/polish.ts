import type Lang from "../Lang";

export default {
    utf8_symbol: "🇵🇱",
    lang_name: "Polski",
    lang_name_english: "Polish",
    loading: "Ładowanie ...",
    app: {
        name: "MądreRzeczy"
    },
    copyright: {
        prefix: "Prawa autorskie ",
        name: "APSI, Zespół 11",
        suffix: "."
    },
    component: {
        delete_btn: {
            dismiss: "Anuluj",
            accept: "Usuń"
        },
        history_table: {
            no_entries: "Brak wpisów",
            table_header: {
                command: "Komenda",
                device: "Urządzenie",
                timestamp: "Czas",
                user: "Nazwa użytkownika"
            },
            user_title: "Historia użytkownika"
        }
    },
    page: {
        dashboard: {
            nav_title: "Pulpit"
        },
        myprofile: {
            nav_title: "Mój profil",
            name_of_field: "Pole",
            value_of_field: "Wartość",
            first_name: "Imię",
            last_name: "Nazwisko",
            authorization_token: "Token",
            start_edit: "Edytuj",
            cancel_edit: "Anuluj",
            save_changes: "Zapisz",
            logout: "Wyloguj się"
        },
        myhistory: {
            nav_title: "Moja historia"
        },
        login: {
            sign_invite: "Zaloguj się",
            username_label: "Użytkownik",
            password_label: "Hasło",
            submit: "Zaloguj",
            forgot_password: "Zapomniałeś hasła?",
            sign_up: "Zarejestruj się"
        },
        register: {
            sign_up_invite: "Zarejestruj się",
            username_label: "Użytkownik",
            password_label: "Hasło",
            email_label: "Email",
            token_label: "Token SmartThings",
            first_name_label: "Imię",
            last_name_label: "Nazwisko",
            submit: "Zarejestruj się",
            forgot_password: "Zapomniałeś hasła?",
            sign_in: "Zaloguj się"
        },
        device: {
            nav_group_label: "Urządzenia",
            details: {
                nav_title: "Szczegóły"
            },
            commands: {
                nav_title: "Komendy",
                no_commands: "Brak komend",
                name_label: "Nazwa:",
                value_label: "Wartość:",
                add_to_app: "Dodaj do aplikacji"
            },
            history: {
                nav_title: "Historia"
            },
            delete_btn: {
                confirm: "Czy na pewno chcesz usunąć urządzenie?",
                label: "Usuń urządzenie",
            }
        },
    },
    notification_msg: {
        message_send_fail: "Błąd wysyłania wiadomości"
    },
    convert: {
        dateToString: (date) => date + "",
        timeToString: (date) => date + "",
        timestampToString: (date) => date + "",
    }
} as Lang;