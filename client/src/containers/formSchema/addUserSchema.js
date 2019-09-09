module.exports = {
    schema : {
      type: "object",
      required: ["username", "email", "role", "password"],
      properties: {
        username: {type: "string", title: "username", default: ""},
        password: {type: "string", title: "password", default: ""},
        email: {type: "string", title: "email", default: ""},
        firstname: {type: "string", title: "firstname", default: ""},
        lastname: {type: "string", title: "lastname", default: ""},
        role: {type: "string", title: "role", default: "", "enum": [
            "admin",
            "user",
            
          ]},
        areaCode: {type: "string", title: "area code", default: ""},
      }
    },
    
    uiSchema : {
        "password": {
            "ui:widget": "password"
          }
    }
    
  };