
module.exports = {
  schema : {
    type: "object",
    required: ["username","password"],
    properties: {
      username: {type: "string", title: "Username", default: ""},
      password: {type: "string", title: "Password", default: ""}
    }
  },
  
  uiSchema : {
    "password": {
      "ui:widget": "password"
    }
  }
  
};