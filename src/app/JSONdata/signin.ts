export let logindata = [
    {
        "placeholder": "Email",
        "formname": "email",
        "type": "email",
        "patternerror": "Email is invalid"
    },
    {
        "placeholder": "Password",
        "formname": "password",
        "type": "password",
    }
]

export let regdata = [

    {
        "placeholder": "Enter Name",
        "formname": "name",
        "type": "text",
    },

    {
        "placeholder": "Enter Email",
        "formname": "email",
        "type": "email",
        "patternerror": "Email is invalid"
    },

    {
        "placeholder": "Enter Phone Number",
        "formname": "phone",
        "type": "text",
        "patternerror": "Phone is invalid. Please provide a 10 digit phone number."
    },

    {
        "placeholder": "Enter Password",
        "formname": "password",
        "type": "password",
        "patternerror": "Password should contain [a-z],[A-Z],[0-9],a special character"
    },

    {
        "placeholder": "Confirm Password",
        "formname": "confirmpassword",
        "type": "password",
        "patternerror": "Passwords don't match!"
    },
    {
        "placeholder": "Select Role",
        "value": null,
        "type": "dropdown",
        "options": [{
            "value": "1",
            "placeholder": "Family Member"
        },
        {
            "value": "2",
            "placeholder": "Doctor"
        },
        {
            "value": "3",
            "placeholder": "Care Taker"
        }]
        

    }
]