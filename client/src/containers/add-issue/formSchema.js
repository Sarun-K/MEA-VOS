
module.exports = {
  schema : {
   
    "definitions": {
      "typeEnum": {
        "type": "string",
        "enum": [
          "ประเภท1",
          "ประเภท2",
          "ประเภท3"
        ]
      },
      "chanelEnum": {
        "type": "string",
        "enum": [
          "ช่องทาง1",
          "ช่องทาง2",
          "ช่องทาง3"
        ]
      },
      "departEnum": {
        "type": "string",
        "enum": [
          "หน่วยงาน1",
          "หน่วยงาน2",
          "หน่วยงาน3"
        ]
      }
    },
        
    "title": "ข้อร้องเรียนใหม่",
    "type": "object",
    "required": [
      "issue",
      "type",
      "chanel",
      "detail",
      "department",
    ],

    "properties": {
      "issue": {
        "type": "string",
        "title": "เรื่อง"
      },
      "type": {
        "title": "ประเถท",
        "$ref": "#/definitions/typeEnum"
      },
      "chanel": {
        "title": "ช่องทาง",
        "$ref": "#/definitions/chanelEnum"
      },

      "detail": {
        "type": "string",
        "title": "รายละเอียด"

      },
      "department": {
        "title": "หน่วยงานรับเรื่อง",
        "$ref": "#/definitions/departEnum"
      },

      "stringFormats": {
      "type": "object",
      "title": "ผู้ร้องเรียน",
      "required": [
          "firstname",
          "address",
          "tel",
          "email",
      ],
        "properties": {
          "firstname": {
            "type": "string",
            "title": "ชื่อ"
          },
          
            "lastname": {
              "type": "string",
              "title": "นามสกุล"
            },
          
          "address": {
            "type": "string",
            "title": "ที่อยู่"
          },
          "tel": {
            "type": "string",
            "title": "เบอร์โทรศัพท์"
          },
          "email": {
            "type": "string",
            "title": "อีเมลล์"
          },

        }
      },
      "status": {
        "type": "string",
        "title": "สถานะ",
        "default": "เปิดข้อร้องเรียน",
        "enum": [
          "เปิดข้อร้องเรียน"
        ]
      },
      "createdBy": {
        "type": "string",
        "title": "เปิดข้อร้องเรียนโดย",
        "default": "บุคคลทั่วไป",
        "enum": [
          "บุคคลทั่วไป"
        ]
      },

      "file": {
        "type": "object",
        "title": "เอกสารแนบ",
          "properties": {
            "files": {
              "type": "string",
              "format": "data-url",
              "title": "Single file"
            }
          }
        }
      
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
    "createdBy": {
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