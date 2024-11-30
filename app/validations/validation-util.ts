import { ZodError, z } from 'zod';

export const errorMap: z.ZodErrorMap = (issue, ctx) => {
	switch (issue.code) {
		case z.ZodIssueCode.invalid_type:
			if (issue.expected === 'string') {
				return { message: 'invalid_string' };
			} else if (issue.expected === 'number') {
				return { message: 'invalid_number' };
			} else {
				return { message: 'invalid_type' };
			}
		case z.ZodIssueCode.custom:
			return { message: issue.message || 'custom_error' };
		case z.ZodIssueCode.invalid_union:
			return { message: 'invalid_union' };
		case z.ZodIssueCode.invalid_enum_value:
			return { message: 'invalid_enum_value' };
		case z.ZodIssueCode.unrecognized_keys:
			return { message: 'unrecognized_keys' };
		case z.ZodIssueCode.invalid_arguments:
			return { message: 'invalid_arguments' };
		case z.ZodIssueCode.invalid_return_type:
			return { message: 'invalid_return_type' };
		case z.ZodIssueCode.invalid_date:
			return { message: 'invalid_date' };
		case z.ZodIssueCode.invalid_string:
			return { message: 'invalid_string' };
		case z.ZodIssueCode.too_small:
			return { message: 'min {}' };
		case z.ZodIssueCode.too_big:
			return { message: 'too_big' };
		case z.ZodIssueCode.invalid_intersection_types:
			return { message: 'invalid_intersection_types' };
		case z.ZodIssueCode.not_multiple_of:
			return { message: 'not_multiple_of' };
		case z.ZodIssueCode.not_finite:
			return { message: 'not_finite' };
		default:
			return { message: ctx.defaultError };
	}
};

export const getErrorsObject = (error: ZodError) => {
	const { fieldErrors } = error.flatten();
	const validationError: ValidationError = {};

	for (const entry of Object.entries(fieldErrors)) {
		const [key, values] = entry as [string, string[] | undefined];

		if (values) {
			validationError[key] = values[0];
		}
	}

	return validationError;
};
