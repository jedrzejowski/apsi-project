import type Lang from "../Lang";

export default {
    language_button: "ENGLISH",
    lang_name: "English",
    lang_name_english: "English",
    loading: "Loading ...",
    app: {
        name: "SmartThings"
    },
    copyright: {
        prefix: "Copyright ",
        name: "Zespół 11",
        suffix: "."
    },
    component: {
        delete_btn: {
            accept: "Delete",
            dismiss: "Cancel"
        }
    },
    page: {
        login: {
            sign_invite: "Sign in",
            username_label: "Username",
            password_label: "Password",
            submit: "Sign in",
            forgot_password: "Forgot password?",
            sign_up: "Sign up"
        },
        register: {
            sign_up_invite: "Sign up",
            username_label: "Username",
            password_label: "Password",
            email_label: "Email",
            first_name_label: "First name",
            last_name_label: "Last name",
            submit: "Sign up",
            forgot_password: "Forgot password?",
            sign_in: "Sign in"
        },
        device: {
            delete_btn: {
                label: "Delete device",
                confirm: "Are u sure to delete device?"
            }
        },
    },
    error_msg: {
        message_send_fail: "Error during message send"
    }
} as Lang;