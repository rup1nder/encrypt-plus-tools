package com.encryptdecrypt;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api")
public class EncryptionResource {

    @Inject
    EncryptionService encryptionService;

    @POST
    @Path("/encrypt")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response encrypt(EncryptRequest request) {
        try {
            String result = encryptionService.encrypt(request.plaintext(), request.password());
            return Response.ok(new EncryptResponse(result)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse("Encryption failed: " + e.getMessage())).build();
        }
    }

    @POST
    @Path("/decrypt")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response decrypt(DecryptRequest request) {
        try {
            String result = encryptionService.decrypt(request.encrypted(), request.password());
            return Response.ok(new DecryptResponse(result)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse("Decryption failed: " + e.getMessage())).build();
        }
    }

    public record EncryptRequest(String plaintext, String password) {}
    public record DecryptRequest(String encrypted, String password) {}
    public record EncryptResponse(String encrypted) {}
    public record DecryptResponse(String plaintext) {}
    public record ErrorResponse(String error) {}
}