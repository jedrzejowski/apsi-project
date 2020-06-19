import type Lang from "../Lang";

export default {
    utf8_symbol: "🇬🇧",
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
        dashboard: {
            nav_title: "Dashboard"
        },
        profile: {
            nav_title: "My Profile",
            name_of_field: "Field",
            value_of_field: "Value",
            first_name: "First name",
            last_name: "Last name",
            authorization_token: "Token",
            start_edit: "Edit",
            cancel_edit: "Cancel",
            save_changes: "Save"
        },
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
            nav_group_label: "Devices",
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