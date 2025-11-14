// other option component 

import React from "react";
import InputComp from "./InputComp"; // import your InputComp
import TextareaComp from "./TextareaComp"; // import your TextareaComp
import { getValidationConfig } from "./validationUtils"; // your validation helper

const SurveyOtherOptionCommentField = ({ question }) => {
  if (
    !question?.valuesData?.otherOption ||
    question?.valuesData?.otherOptionType !== "commentField"
  ) {
    return null;
  }

  const {
    identity,
    mainQuestion,
    valuesData,
  } = question;

  const label =
    valuesData?.otherOptionLabel || "Other (please specify):";

const getValidationConfig = (validationType) => {
    const patternMap = {
      // specificLength: {
      //   pattern: "^.{5,10}$", // Example: 5 to 10 characters
      //   message: "Please enter between 5 and 10 characters.",
      // },

      wholeNumber: "^[0-9]+$",

      decimalNumber: "^[0-9]*\\.?[0-9]+$",

      email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",

      dateMMDDYYYY: "^(0[1-9]|1[0-2])/([0-2][0-9]|3[01])/\\d{4}$",

      dateDDMMYYYY: "^([0-2][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$",

      none: null,
    };

    return patternMap[validationType] || {};
  };

  const validationPattern =
    getValidationConfig(valuesData?.validationType) || null;

  const validationMessage =
    valuesData?.validationErrorMessage ||
    `Invalid input for ${mainQuestion}`;

  if (valuesData?.textStyle === "singleLine") {
    return (
      <div className="mt-2">
        <label htmlFor={`${identity}_other`}>{label}</label>
        <InputComp
          props={{
            name: `${identity}_other`,
            required: true,
            message: `Please enter ${label}`,
            maxLength: valuesData?.max || 200,
            pattern: validationPattern,
            patternMessage: validationMessage,
            autoComplete: "off",
            size: "small",
          }}
        />
      </div>
    );
  }

  // multi-line textarea fallback
  return (
    <div className="mt-2">
      <label htmlFor={`${identity}_other`}>{label}</label>
      <TextareaComp
        props={{
          name: `${identity}_other`,
          required: true,
          message: `Please enter ${label}`,
          maxLength: valuesData?.characters || 500,
          pattern: validationPattern,
          patternMessage: validationMessage,
          autoComplete: "off",
          size: "large",
        }}
      />
    </div>
  );
};

export default SurveyOtherOptionCommentField;

