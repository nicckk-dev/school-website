import React from "react";
import { Input, Form, Typography } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const SurveyOtherOption = ({ question, handleOtherInputChange }) => {
  const { identity, valuesData } = question || {};

  const label = valuesData?.otherOptionLabel || "Other (please specify):";

  const getValidationPattern = (type) => {
    const patterns = {
      wholeNumber: {
        pattern: /^[0-9]+$/,
        message: "Please enter a valid whole number.",
      },
      decimalNumber: {
        pattern: /^[0-9]*\.?[0-9]+$/,
        message: "Please enter a valid decimal number.",
      },
      email: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Please enter a valid email address.",
      },
      dateMMDDYYYY: {
        pattern: /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$/,
        message: "Date must be in MM/DD/YYYY format.",
      },
      dateDDMMYYYY: {
        pattern: /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        message: "Date must be in DD/MM/YYYY format.",
      },
    };

    return patterns[type] || null;
  };

  const validation = getValidationPattern(valuesData?.validationType);

  const maxLength =
    valuesData?.characters ||
    (valuesData?.textStyle === "singleLine" ? 200 : 500);

  // ✅ Build validation rules
  const rules = [
    {
      required: true,
      message:
        valuesData?.errorMessage || // from DB if exists
        `${valuesData?.emptyAnswerError}`,
    },
    ...(validation
      ? [
          {
            pattern: validation.pattern,
            message:
              valuesData?.validationErrorMessage || validation.message,
          },
        ]
      : []),
  ];

  return (
    <div className="mt-2">
      {valuesData?.otherOptionType !== "answerChoice" && (
        <Form.Item
          name={`${identity}_other`}
          label={<Text strong>{label}</Text>}
          rules={rules}
        >
          {valuesData?.textStyle === "singleLine" ? (
            <Input
              placeholder="Type your answer"
              maxLength={maxLength}
              autoComplete="off"
              size="small"
              onChange={handleOtherInputChange}
            />
          ) : (
            <TextArea
              placeholder="Type your answer"
              autoSize={{ minRows: 3 }}
              maxLength={maxLength}
              autoComplete="off"
              size="large"
              onChange={handleOtherInputChange}
            />
          )}
        </Form.Item>
      )}
    </div>
  );
};

export default SurveyOtherOption;
