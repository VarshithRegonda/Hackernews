
const validator = require('validator');
const isEmpty = require('./isEmpty');
const validateLoginInput = (data) =>{
   let errors = {};
   data.email = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';
   if(!validator.isEmail(data.email)){
    errors.email = 'Email is Invalid';
   }
   if(validator.isEmpty(data.email)){
    errors.email = 'Email field is required';
   }
   if(!validator.isLength(data.password,{min:8, max: 12})){
    errors.password = 'Password must be 8 to 12 charecters long';
   }

   if(validator.isEmpty(data.password)){
    errors.password = 'Password field is required';
   }

   return {
       errors,
       isValid: isEmpty(errors)
   }
};
module.exports = validateLoginInput;