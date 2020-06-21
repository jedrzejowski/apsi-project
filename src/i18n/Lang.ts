//
//
export default interface Lang {
    utf8_symbol: string,
    lang_name: string,
    lang_name_english: string,
    loading: string,
    app: {
        name: string
    },
    copyright: {
        prefix: string
        name: string
        suffix: string
    },
    component: {
        delete_btn: {
            dismiss: string
            accept: string
        },
        history_table: {
            no_entries: string
            table_header: {
                command: string
                device: string
                timestamp: string
                user: string
            }
        }
    },
    page: {
        dashboard: {
            nav_title: string
        },
        myprofile: {
            name_of_field: string
            nav_title: string
            value_of_field: string
            first_name: string
            last_name: string
            authorization_token: string
            start_edit: string
            cancel_edit: string
            save_changes: string
            logout: string
        },
        myhistory: {
            nav_title: string
        },
        login: {
            sign_invite: string
            username_label: string
            password_label: string
            submit: string
            forgot_password: string
            sign_up: string
        },
        register: {
            sign_up_invite: string
            username_label: string
            password_label: string
            email_label: string
            token_label: string
            first_name_label: string
            last_name_label: string
            submit: string
            forgot_password: string
            sign_in: string
        }
        device: {
            nav_group_label: string
            details: {
                nav_title: string
            },
            commands: {
                nav_title: string
                no_commands: string
            },
            history: {
                nav_title: string
            },
            delete_btn: {
                confirm: string
                label: string
            }
        },
    },
    notification_msg: {
        unknown_error: string
        message_send_fail: string
    },
    convert: {
        dateToString: (date: Date | string | number) => string
        timeToString: (date: Date | string | number) => string
        timestampToString: (date: Date | string | number) => string
    }
}