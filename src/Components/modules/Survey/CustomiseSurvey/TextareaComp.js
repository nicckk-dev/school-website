// textarea 
import React from "react";
import TextareaComp from "./TextareaComp"; // Adjust import based on your folder structure

const SurveyTextareaQuestion = ({ question }) => {
  if (!question) return null;

  return (
    <TextareaComp
      props={{
        name: question.identity,
        required: true,
        message: `Please enter ${question.mainQuestion}`,
        maxLength: question?.valuesData?.validationLength?.max || 500,
        pattern: question?.valuesData?.pattern || null,
        patternMessage:
          question?.valuesData?.errorMsg ||
          `Invalid format for ${question.mainQuestion}`,
        // disabled: question?.isSaved === false,
        size: "large",
      }}
    />
  );
};

export default SurveyTextareaQuestion;

