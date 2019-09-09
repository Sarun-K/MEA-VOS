
module.exports = {
    schema : {
     
      definitions: {
        typeEnum: {
          type: "string",
          enum: [
            "ใบแจ้งหนี้",
            "การชำระเงิน",
            "ประกาศดับไฟ"
          ]
        },
        chanelEnum: {
          type: "string",
          enum: [
            "mail",
            "1130",
            "ศูนย์ดำรงธรรม"
          ]
        },
        departEnum: {
          type: "string",
          enum: [
            "กฟผ.จปร",
            "กฝผ.ขรง",
            "กฟจ.จรง"
          ]
        }
      },
          
      title: "ข้อร้องเรียนใหม่",
      type: "object",
      required: [
        "title",
        "issueType",
        "chanel",
        "description",
        "organization",
      ],
  
      properties: {
        title: {
          type: "string",
          title: "เรื่อง"
        },
        issueType: {
          title: "ประเถท",
          $ref: "#/definitions/typeEnum"
        },
        chanel: {
          title: "ช่องทาง",
          $ref: "#/definitions/chanelEnum"
        },
  
        description: {
          type: "string",
          title: "รายละเอียด"
  
        },
        organization: {
          title: "หน่วยงานรับเรื่อง",
          $ref: "#/definitions/departEnum"
        },
  
        customer: {
        type: "object",
        title: "ผู้ร้องเรียน",
        required: [
            "firstname",
            "address",
            "phone",
            "email",
        ],
          properties: {
            firstname: {
              type: "string",
              title: "ชื่อ"
            },
            
              lastname: {
                type: "string",
                title: "นามสกุล"
              },
            
            address: {
              type: "string",
              title: "ที่อยู่"
            },
            phone: {
              type: "string",
              title: "เบอร์โทรศัพท์"
            },
            email: {
              type: "string",
              title: "อีเมลล์"
            },
  
          }
        },
      }
    },
    
    uiSchema : {
      
      "detail": {
        "ui:widget": "textarea"
      },
  
      "status": {
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },

  
      "type": {
        "ui:placeholder": "เลือกประเภท"
      },
      "chanel": {
        "ui:placeholder": "เลือกช่องทาง"
      },
      "numberEnumRadio": {
        "ui:widget": "radio",
        "ui:options": {
          "inline": true
        }
      },
  
    },
  
    formData : {
  
    }
    
  };