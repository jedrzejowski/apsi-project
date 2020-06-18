//
//
export default interface Lang {
    utf8_symbol: string,
    lang_name: string,
    lang_name_english: string,
    loading: string
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
        }
    },
    page: {
        dashboard: {
            nav_title: string
        },
        profile: {
            name_of_field: string
            nav_title: string
            value_of_field: string
            first_name: string
            last_name: string
            authorization_token: string
            start_edit: string
            cancel_edit: string
            save_changes: string
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
            first_name_label: string
            last_name_label: string
            submit: string
            forgot_password: string
            sign_in: string
        }
        device: {
            delete_btn: {
                confirm: string
                label: string
            }
        },
    }
    error_msg: {
        message_send_fail: string
    }
}