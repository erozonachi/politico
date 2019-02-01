/**
* @author Eneh, James Erozonachi
*
* @description A module that validates fields in request payloads
*
* */

export default {
  isEmpty(field) {
    if (String(field).trim() === '' || field === null || field === undefined) {
      return true;
    }

    return false;
  },

  isNumber(field) {
    if (!Number.isNaN(field)) {
      return true;
    }

    return false;
  },

  maxLength(field, max) {
    if (field.length > max) {
      return false;
    }

    return true;
  },

  minLength(field, min) {
    if (field.length < min) {
        return false;
    }

    return true;
  },

  isAlpha(field) {
    if (RegExp(/^[a-zA-Z]+$/, 'g').test(field)) {
      return true;
    }

    return false;
  },
  
  isNumeric(field) {
    if(RegExp(/^[0-9.]+$/).test(field)) {
      return true;
    }

    return false;
  },

  isEmail(field) {
    if(RegExp(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/).test(field)) {
      return true;
    }

    return false;
  },

  isvalidURL(field) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');

    return pattern.test(field);
 },

}
