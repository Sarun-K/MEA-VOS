module.exports = {
    schema : {
      type: "object",
      required: ["username", "email", "role"],
      properties: {
        
        email: {type: "string", title: "email", default: ""},
        firstname: {type: "string", title: "firstname", default: ""},
        lastname: {type: "string", title: "lastname", default: ""},
        
            
        
        areaCode: {type: "string", title: "area code", default: ""},
      }
    },
    
    uiSchema : {
      
    }
    
  };