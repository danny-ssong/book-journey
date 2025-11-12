import { FieldError, FieldErrors } from "react-hook-form";

export function getFirstZodErrorMessage(errors: FieldErrors) {
  const errorMessages = getErrorMessages(errors);
  return errorMessages[0];
}

// zod 에러 객체를 순회하며 메시지를 찾는 함수
function getErrorMessages(errors: FieldErrors): string[] {
  const errorMessages: string[] = [];

  Object.values(errors).forEach((fieldError) => {
    if (!fieldError) return;

    // 먼저 중첩된 FieldErrors 객체인지 검사 (객체나 배열 필드의 에러)
    if (typeof fieldError === "object" && !isFieldError(fieldError)) {
      errorMessages.push(...getErrorMessages(fieldError as FieldErrors));
    }
    // FieldError 객체인 경우 (단일 필드 에러)
    else if (isFieldError(fieldError) && fieldError.message) {
      errorMessages.push(fieldError.message);
    }
  });

  return errorMessages;
}

// FieldError 타입 가드 함수
function isFieldError(value: any): value is FieldError {
  return value && typeof value === "object" && "type" in value;
}
