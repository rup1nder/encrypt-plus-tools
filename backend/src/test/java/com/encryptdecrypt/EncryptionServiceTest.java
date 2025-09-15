package com.encryptdecrypt;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.InjectMock;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.anyLong;

@QuarkusTest
public class EncryptionServiceTest {

    @Inject
    EncryptionService encryptionService;

    @InjectMock
    DynamoService dynamoService;

    @Test
    public void testEncryptDecrypt() throws Exception {
        String plaintext = "Hello World";
        String password = "secret123";

        // Mock the store and get methods
        Mockito.doNothing().when(dynamoService).storeKey(anyString(), anyString(), anyLong());
        Mockito.when(dynamoService.getKey(anyString())).thenReturn("salt::encryptedPrivateKey");

        String encrypted = encryptionService.encrypt(plaintext, password);
        assertNotNull(encrypted);
        assertTrue(encrypted.contains("::"));

        String decrypted = encryptionService.decrypt(encrypted, password);
        assertEquals(plaintext, decrypted);
    }
}