package com.williamdsw.semsys.services.aws.util;

public class ImageUtil {

	// FIELDS

	private final static Integer IMAGE_SIZE = 200;

	// GETTERS

	public static Integer getImageSize() {
		return IMAGE_SIZE;
	}

	// HELPER FUNCTIONS

	public static String buildFileName(String fileName) {
		if (fileName == null || fileName.isEmpty()) {
			return null;
		}

		fileName = fileName.toLowerCase();
		fileName = fileName.replaceAll(" ", "-");
		fileName = fileName.replaceAll("_", "-");
		fileName = fileName.concat(".jpg");
		return fileName;
	}
}
