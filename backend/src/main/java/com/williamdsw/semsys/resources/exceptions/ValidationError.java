package com.williamdsw.semsys.resources.exceptions;

import java.util.ArrayList;
import java.util.List;

public class ValidationError extends StandardError
{
	// FIELDS
	
	private static final long serialVersionUID = 1L;
	private final List<FieldMessage> errors = new ArrayList<>();
	
	// CONSTRUCTORS
	
	public ValidationError () {}
	public ValidationError (Long timestamp, Integer status, String error, String message, String path) 
	{
		super (timestamp, status, error, message, path);
	}
	
	// GETTERS / SETTERS
	
	public List<FieldMessage> getErrors () 
	{
		return errors;
	}
	
	// HELPER FUNCTIONS
	
	public void addError (String field, String message)
	{
		errors.add (new FieldMessage (field, message));
	}
}