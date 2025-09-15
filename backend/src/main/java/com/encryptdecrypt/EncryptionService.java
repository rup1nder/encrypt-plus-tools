package com.encryptdecrypt;

import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import javax.crypto.*;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class EncryptionService {

    @Inject
    DynamoService dynamoService;

    private static final String RSA_ALGORITHM = "RSA";
    private static final String AES_ALGORITHM = "AES";
    private static final String CIPHER_RSA = "RSA/ECB/PKCS1Padding";
    private static final String CIPHER_AES = "AES/ECB/PKCS5Padding";
    private static final int KEY_SIZE = 2048;
    private static final int PBKDF2_ITERATIONS = 65536;
    private static final int AES_KEY_SIZE = 256;
    private static final long TTL_SECONDS = 3 * 24 * 60 * 60; // 3 days

    public String encrypt(String plaintext, String password) throws Exception {
        // Generate random RSA key pair
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance(RSA_ALGORITHM);
        keyGen.initialize(KEY_SIZE);
        KeyPair keyPair = keyGen.generateKeyPair();

        // Encrypt plaintext with public key
        Cipher rsaCipher = Cipher.getInstance(CIPHER_RSA);
        rsaCipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
        byte[] encryptedData = rsaCipher.doFinal(plaintext.getBytes());

        // Encrypt private key with AES using password
        byte[] salt = new byte[16];
        SecureRandom random = new SecureRandom();
        random.nextBytes(salt);
        SecretKey aesKey = deriveKeyFromPassword(password, salt);
        Cipher aesCipher = Cipher.getInstance(CIPHER_AES);
        aesCipher.init(Cipher.ENCRYPT_MODE, aesKey);
        byte[] encryptedPrivateKey = aesCipher.doFinal(keyPair.getPrivate().getEncoded());

        // Store encrypted private key + salt in DynamoDB
        String id = java.util.UUID.randomUUID().toString();
        String storedData = Base64.getEncoder().encodeToString(salt) + "::" + Base64.getEncoder().encodeToString(encryptedPrivateKey);
        dynamoService.storeKey(id, storedData, TTL_SECONDS);

        // Return ID + encrypted data
        String encryptedDataB64 = Base64.getEncoder().encodeToString(encryptedData);
        return id + "::" + encryptedDataB64;
    }

    public String decrypt(String combined, String password) throws Exception {
        String[] parts = combined.split("::");
        if (parts.length != 2) throw new IllegalArgumentException("Invalid encrypted data format");

        String id = parts[0];
        byte[] encryptedData = Base64.getDecoder().decode(parts[1]);

        // Get stored data from DynamoDB
        String storedData = dynamoService.getKey(id);
        String[] storedParts = storedData.split("::");
        byte[] salt = Base64.getDecoder().decode(storedParts[0]);
        byte[] encryptedPrivateKey = Base64.getDecoder().decode(storedParts[1]);

        // Derive AES key from password
        SecretKey aesKey = deriveKeyFromPassword(password, salt);

        // Decrypt private key
        Cipher aesCipher = Cipher.getInstance(CIPHER_AES);
        aesCipher.init(Cipher.DECRYPT_MODE, aesKey);
        byte[] privateKeyBytes = aesCipher.doFinal(encryptedPrivateKey);
        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        PrivateKey privateKey = keyFactory.generatePrivate(privateKeySpec);

        // Decrypt data with private key
        Cipher rsaCipher = Cipher.getInstance(CIPHER_RSA);
        rsaCipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedData = rsaCipher.doFinal(encryptedData);

        return new String(decryptedData);
    }

    private SecretKey deriveKeyFromPassword(String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, PBKDF2_ITERATIONS, AES_KEY_SIZE);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        byte[] keyBytes = factory.generateSecret(spec).getEncoded();
        return new SecretKeySpec(keyBytes, AES_ALGORITHM);
    }
}