package com.williamdsw.semsys.services.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.xml.crypto.URIReferenceException;

import org.springframework.stereotype.Service;

@Service
public class FileService {
	
	public String buildFilePath(String[] folders, String fileName) throws URIReferenceException {
		if ((folders == null || folders.length == 0) || (fileName == null || fileName.isEmpty())) {
			throw new URIReferenceException("Invalid folders or fileName");
		}
		
		String separator = System.getProperty("file.separator");
		StringBuilder path = new StringBuilder(separator);
		for (String folder : folders) {
			path.append(folder).append(separator);
		}
		
		path.append(fileName);
		
		return path.toString();
	}
	
	public String loadFileContent(String filePath, boolean trimEspaces) throws IOException {
		StringBuilder fileContent = new StringBuilder();
		
		String path = this.getClass().getResource(filePath).getFile();
		if (path == null || path.isEmpty()) {
			throw new IOException ("Invalid path!");
		}
		
		File file = new File (path);
		if (!file.exists()) {
			throw new IOException ("File in this path doesn't exists: " + filePath);
		}
		
		try(InputStream inputStream = new FileInputStream(file)) {
			try (InputStreamReader inputReader = new InputStreamReader(inputStream)) {
				try (BufferedReader bufferedReader = new BufferedReader(inputReader)) {
					String content = "";
					while ((content = bufferedReader.readLine()) != null) {
						if (trimEspaces) {
							content = content.trim();
						}

						fileContent.append(content);
					}
				}
			}
		}
		
		return fileContent.toString();
	}
}
