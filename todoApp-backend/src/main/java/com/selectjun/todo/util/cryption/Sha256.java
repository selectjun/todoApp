package com.selectjun.todo.util.cryption;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class Sha256 {

    /**
     * SHA-256 암호화
     * @param source    암호화 대상(원본)
     * @return          암호화 문자열
     * @throws NoSuchAlgorithmException
     */
    public static String encryption(String source) throws NoSuchAlgorithmException {
        return byteToHex(sha256(source));
    }

    /**
     *  SHA-256 암호화
     * @param message   암호화 대상
     * @return          암호화 문자열
     * @throws NoSuchAlgorithmException
     */
    private static byte[] sha256(String message) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(message.getBytes());

        return messageDigest.digest();
    }

    /**
     * 문자열 16진수 변환
     * @param bytes 대상
     * @return      16진수 값
     */
    private static String byteToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();

        for (byte aByte : bytes) {
            builder.append(String.format("%02x", aByte));
        }

        return builder.toString();
    }

}
