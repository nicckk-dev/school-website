import React, { useState } from "react";
import { Form, Checkbox } from "antd";
import SurveyOtherOption from "./SurveyOtherOption";

const SurveyCheckboxQuestion = ({ question, form, onQuestionChange }) => {
  const [optionsData, setOptionsData] = useState([]);

  if (!question || !form) return null;
  const {
    id,
    identity,
    mainQuestion,
    pageId,
    selectedType,
    valuesData = {},
    // logicData = [],
    EditableData = {},
  } = question;

  const {
    required,
    errorMessage,
    noneOption,
    noneLabel = "None of the above",
    otherOption,
    otherOptionLabel = "Other",
    otherOptionType,
    logicData,
  } = valuesData;

  // Build display options
  // const customizeOptions = logicData || [];

  // const checkboxOptions = [
  //   ...customizeOptions.map((opt) => ({
  //     label: opt.option,
  //     value: opt.key,
  //   })),
  //   ...(noneOption ? [{ label: noneLabel, value: "none" }] : []),
  //   ...(otherOption && otherOptionType === "answerChoice"
  //     ? [
  //         {
  //           label: otherOptionLabel?.trim() || "Other",
  //           value: otherOptionLabel?.trim() || "other",
  //         },
  //       ]
  //     : []),
  // ];

  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};

  // Final rule values (priority to optionConfig if present)
  // const isRequired = configRequired ?? false;
  // const validationMsg = configErrorMessage || "This field is required";
  const customizeOptions = valuesData?.options || [];

  const checkboxOptions = [
    ...customizeOptions.map((opt, index) => ({
      label: opt.value,
      value: index.toString(), // or use a unique value if available
    })),
    ...(noneOption ? [{ label: noneLabel, value: "none" }] : []),
    ...(otherOption && otherOptionType === "answerChoice"
      ? [
        {
          label: otherOptionLabel?.trim() || "Other",
          value: otherOptionLabel?.trim() || "other",
        },
      ]
      : []),
  ];

  console.log('EditableData', logicData)
  // // Extract default selected values
  // const defaultSelectedValues = (EditableData?.options || [])
  //   .filter((opt) => opt.selected) // only include selected = true
  //   .map((opt) => opt.value);

  const handleCheckboxChange = (checkedValues) => {
    const result = checkboxOptions.map((opt) => ({
      value: opt.value,
      label: opt.label,
      selected: checkedValues.includes(opt.value),
    }));
    setOptionsData(result);
    const fullPayload = {
      id,
      identity,
      mainQuestion,
      pageId: question?.pageId,
      answerData: question?.selectedType,
      logicData: question?.logicData,

      valuesData: {
        options: result,
        selectedOption: result?.find(opt => opt.selected)?.label || null,

      },
    };

    console.log(`✅ Selected values for ${identity}:`, fullPayload);

    if (onQuestionChange) {
      onQuestionChange(identity, fullPayload);
    }
  };
  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    // console.log("input change", value);
    if (onQuestionChange) {
      const payload = {
        id,
        identity,
        question: mainQuestion,
        pageId,
        answerData: selectedType,
        logicData: question?.logicData,

        valuesData: {
          options: optionsData,
          otherValue: value,
        },
      };
      console.log("payload", payload);
      if (onQuestionChange) {
        onQuestionChange(identity, payload);
      }
    }
  };

  return (
    <Form.Item
      // name={identity}
      name={`page${pageId}_${identity}`}
      rules={[
        {
          required: configRequired ?? false,
          message:
            configErrorMessage || "This field is required",
        },
      ]}
    // rules={[
    //   {
    //     required: isRequired,
    //     message: validationMsg,
    //   },
    // ]}
    // initialValue={defaultSelectedValues}
    // rules={[
    //   {
    //     required: required,
    //     message: errorMessage || "This field is required",
    //   },
    // ]}
    >
      <Checkbox.Group
        options={checkboxOptions}
        onChange={(checkedValues) => {
          form.setFieldsValue({ [identity]: checkedValues }); // ✅ tell the form the new value
          handleCheckboxChange(checkedValues); // 🔁 your custom logic
        }}
        // onChange={handleCheckboxChange}
        disabled={question?.isSaved === false}
      />

      {otherOption && (
        <SurveyOtherOption
          question={question}
          handleOtherInputChange={handleOtherInputChange}
        />
      )}
    </Form.Item>
  );
};

export default SurveyCheckboxQuestion;
