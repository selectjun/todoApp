package com.selectjun.todo.util.cryption;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class CipherAES {

    static String AES_ECB_PKCS5Padding = "AES/ECB/PKCS5Padding";
    static String AES_CBC_PKCS5Padding = "AES/CBC/PKCS5Padding";

    /**
     * Key 생성
     * @param keyValue
     * @return
     * @throws Exception
     */
    public static SecretKey generateKey(String keyValue) throws Exception {
        return new SecretKeySpec(keyValue.getBytes("UTF-8"),"AES");
    }

    /**
     * 암호화
     * @param transType 암호화 방식(CBC/ECB)
     * @param srcData   데이터
     * @param keyValue  암호화 Key값 (32byte)
     * @param ivValue   iv값 (CBC인 경우만 사용,  16byte)
     * @return
     * @throws Exception
     */
    public static String encrypt(String transType, String srcData, String keyValue, String ivValue) throws Exception {
        String result = null;
        try {
            SecretKey key = generateKey(keyValue);
            Cipher cipher = Cipher.getInstance(transType);

            if ( transType.equals(AES_ECB_PKCS5Padding) ) {
                //ECB모드는 ivKey 사용없음
                cipher.init(Cipher.ENCRYPT_MODE, key);
            } else {
                //CBC모드는 ivKey 사용
                if ( null!=ivValue && ivValue.length()>0 ) {
                    cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(ivValue.getBytes()));
                } else {
                    cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(new byte[16]));
                }
            }
            byte[] encData  = cipher.doFinal(srcData.getBytes());

            result = Base64.getEncoder().encodeToString(encData);
        } catch(Exception e) {
            e.printStackTrace();
            result = "";
        }
        return result;
    }

    public static String encryptCbc(String srcData, String keyValue, String ivValue) throws Exception {
        return encrypt(AES_CBC_PKCS5Padding, srcData, keyValue, ivValue);
    }

    public static String encryptEcb(String srcData, String keyValue ) throws Exception {
        return encrypt(AES_ECB_PKCS5Padding, srcData, keyValue, null);
    }

    /**
     * 복호화
     * @param transType 암호화 방식(CBC/ECB)
     * @param srcData   데이터
     * @param keyValue  암호화 Key값 (32byte)
     * @param ivValue   iv값 (CBC인 경우만 사용,  16byte)
     * @return
     * @throws Exception
     */
    public static String decrypt(String transType, String srcData, String keyValue, String ivValue) throws Exception {
        return decrypt (transType, srcData, keyValue, ivValue, "UTF-8");
    }

    /**
     * 복호화
     * @param transType 암호화 방식(CBC/ECB)
     * @param srcData   데이터
     * @param keyValue  암호화 Key값 (32byte)
     * @param ivValue   iv값 (CBC인 경우만 사용,  16byte)
     * @return
     * @throws Exception
     */
    public static String decrypt(String transType, String srcData, String keyValue, String ivValue, String charsetName) throws Exception {
        String result = "";
        try {
            SecretKey key = generateKey(keyValue);
            Cipher cipher = Cipher.getInstance(transType);
            if ( transType.equals(AES_ECB_PKCS5Padding) ) {
                //ECB모드는 ivKey 사용없음
                cipher.init(Cipher.DECRYPT_MODE, key);
            } else {
                //CBC모드는 ivKey 사용
                if ( null!=ivValue && ivValue.length()>0 ) {
                    cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(ivValue.getBytes()));
                } else {
                    cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(new byte[16]));
                }
            }
            byte[] decData = cipher.doFinal(Base64.getDecoder().decode(srcData));
            if (charsetName == null) {
                result = new String(decData);
            }
            else {
                result = new String(decData, charsetName);
            }
        } catch (Exception e) {
            result = "";
        }
        return result;
    }

    public static String decryptCbc(String srcData, String keyValue, String ivValue) throws Exception {
        return decrypt(AES_CBC_PKCS5Padding, srcData, keyValue, ivValue);
    }

    public static String decryptEcb(String srcData, String keyValue) throws Exception {
        return decrypt(AES_ECB_PKCS5Padding, srcData, keyValue, null);
    }

}
