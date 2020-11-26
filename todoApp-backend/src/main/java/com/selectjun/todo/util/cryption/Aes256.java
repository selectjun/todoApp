package com.selectjun.todo.util.cryption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Aes256 {

    @Value("${aes256.keyValue}")
    private String keyValue;

    @Value("${aes256.ivValue}")
    private String ivValue;

    public String encryption(String t) {
        String rVal = null;
        try {
            if(t != null && !"".equals(t))
                rVal = CipherAES.encryptCbc(t, keyValue, ivValue);
        } catch (Exception e) {};

        return rVal;
    }

    public String decryption(String t) {
        String rVal = null;
        try {
            if(t != null && !"".equals(t))
                rVal = CipherAES.decryptCbc(t, keyValue, ivValue);
        } catch (Exception e) {};

        return rVal;
    }

}
