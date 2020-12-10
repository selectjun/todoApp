const express = require("express");
const interceptor = require("express-interceptor");

const authInterceptor = interceptor((req, res, next) => {
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function(){
      return true;
    },
    // Appends a paragraph at the end of the response body
    intercept: function(body, send) {
      console.log("Auth Interceptor!!");
      if (req.get("X-AUTH-TOKEN")) {
        next();
      } else {
        send({success: false, message: "test"});
      }
    }
  };
})

module.exports = authInterceptor;