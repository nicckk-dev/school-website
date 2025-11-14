// input comp

import React from "react";
import InputComp from "./InputComp"; // Adjust path based on your project

const SurveyTextInputQuestion = ({ question }) => {
  if (!question) return null;

  return (
    <InputComp
      props={{
        fieldtype: "text",
        name: question.identity,
        required: true,
        message: `Please enter ${question.mainQuestion}`,
        maxLength: question?.valuesData?.validationLength?.max || 200,
        pattern: question?.valuesData?.pattern || null,
        patternMessage:
          question?.valuesData?.errorMsg ||
          `Invalid format for ${question.mainQuestion}`,
        autoComplete: "off",
        // disabled: question?.isSaved === false,
        size: "large",
      }}
    />
  );
};

export default SurveyTextInputQuestion;

