module.exports = {
    schema : {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: "string", title: "กรอกข้อมูล", default: ""},
      }
    },
    
    uiSchema : {
      
    }
    
  };