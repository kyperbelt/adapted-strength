package com.terabite.authorization.log;


import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

/**
 * Solely for overriding Spring's default error json returns. Unnecessary after filter error handling, but may be helpful in the future
 */
@Component
public class AuthorizationErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes =  super.getErrorAttributes(webRequest, options);
//        errorAttributes.remove("trace");

        return errorAttributes;
    }
}
