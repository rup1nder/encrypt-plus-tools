package com.encryptdecrypt;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class DynamoService {

    private final DynamoDbClient dynamoDbClient;
    private static final String TABLE_NAME = "EncryptionKeys";

    public DynamoService(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    void onStart(@Observes StartupEvent ev) {
        createTableIfNotExists();
    }

    private void createTableIfNotExists() {
        try {
            dynamoDbClient.describeTable(DescribeTableRequest.builder().tableName(TABLE_NAME).build());
        } catch (ResourceNotFoundException e) {
            CreateTableRequest request = CreateTableRequest.builder()
                    .tableName(TABLE_NAME)
                    .keySchema(KeySchemaElement.builder().attributeName("id").keyType(KeyType.HASH).build())
                    .attributeDefinitions(AttributeDefinition.builder().attributeName("id").attributeType(ScalarAttributeType.S).build())
                    .billingMode(BillingMode.PAY_PER_REQUEST)
                    .streamSpecification(StreamSpecification.builder().streamEnabled(false).build())
                    .build();
            dynamoDbClient.createTable(request);
        }
    }

    public void storeKey(String id, String encryptedPrivateKey, long ttlSeconds) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put("id", AttributeValue.builder().s(id).build());
        item.put("encryptedPrivateKey", AttributeValue.builder().s(encryptedPrivateKey).build());
        // Note: TTL not set for local DynamoDB Local, as it doesn't support TTL
        // For production, enable TTL
        PutItemRequest request = PutItemRequest.builder()
                .tableName(TABLE_NAME)
                .item(item)
                .build();
        dynamoDbClient.putItem(request);
    }

    public String getKey(String id) {
        GetItemRequest request = GetItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(Map.of("id", AttributeValue.builder().s(id).build()))
                .build();
        GetItemResponse response = dynamoDbClient.getItem(request);
        if (response.item().isEmpty()) {
            throw new RuntimeException("Key not found or expired");
        }
        return response.item().get("encryptedPrivateKey").s();
    }
}