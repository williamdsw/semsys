package com.williamdsw.semsys.services.exceptions;

public class DataIntegrityException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DataIntegrityException(String message) {
		super(message);
	}
}