package com.selectjun.todo.util.cryption;

import org.springframework.stereotype.Component;

@Component
public class Base64 {

    public String encryption(String target) {
        byte[] bytes = target.getBytes();

        java.util.Base64.Encoder encoder =  java.util.Base64.getEncoder();
        byte[] encodeBytes = encoder.encode(bytes);

        return encodeBytes.toString();
    }

    public String decryption(String target) {
        byte[] bytes = target.getBytes();

        java.util.Base64.Decoder decoder =  java.util.Base64.getDecoder();
        byte[] decodeBytes = decoder.decode(bytes);

        return decodeBytes.toString();
    }

}
