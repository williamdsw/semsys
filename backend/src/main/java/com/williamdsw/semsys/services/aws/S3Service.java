package com.williamdsw.semsys.services.aws;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.util.IOUtils;
import com.williamdsw.semsys.aws.AwsConstants;
import com.williamdsw.semsys.services.exceptions.FileException;

@Service
public class S3Service {

	// FIELDS

	@Autowired
	private AmazonS3 client;

	private String bucketName = AwsConstants.getS3Bucket();

	// HELPER FUNCTIONS

	public URI uploadFile(MultipartFile multipartFile, String fileName) {
		try {
			// File info
			InputStream inputStream = multipartFile.getInputStream();
			String contentType = multipartFile.getContentType();
			return uploadFile(fileName, inputStream, contentType);
		} 
		catch (IOException ex) {
			throw new FileException(String.format("Upload file error: %s", ex.getMessage()));
		}
	}

	public URI uploadFile(String fileName, InputStream inputStream, String contentType) {
		try {
			byte[] bytes = IOUtils.toByteArray(inputStream);
			ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType(contentType);
			metadata.setContentLength(bytes.length);
			client.putObject(bucketName, fileName, byteArrayInputStream, metadata);
			return client.getUrl(bucketName, fileName).toURI();
		} 
		catch (URISyntaxException | IOException ex) {
			throw new FileException("Parsing URL to URI has failed");
		}
	}
}