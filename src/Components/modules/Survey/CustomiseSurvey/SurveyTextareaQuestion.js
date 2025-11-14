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


// dropdown 
import React, { useEffect, useState } from "react";
import { Form, Select, Input } from "antd";
const { Option } = Select;