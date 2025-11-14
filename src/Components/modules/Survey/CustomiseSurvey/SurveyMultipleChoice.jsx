import React, { useEffect, useState } from "react";
import { Form, Radio } from "antd";
import InputComp from "./InputComp";
import TextareaComp from "./TextareaComp";
import SurveyOtherOption from "./SurveyOtherOption";

const SurveyRadioQuestion = ({ question, form, onQuestionChange }) => {
  console.log("mullllllllllllllll", question);
  const [optionsData, setOptionsData] = useState([]);
  const [userselectedValue, setUserSelectedValue] = useState("");
  // const [showOtherInput, setShowOtherInput] = useState(false);
  if (!question || !form) return null;

  const {
    identity,
    mainQuestion,
    isSaved,
    valuesData = {},
    pageId,
    id,
    selectedType,
    EditableData = {},
  } = question;

  const {
    options = [],
    noneOption,
    noneLabel = "None of the above",
    otherOption,
    otherOptionLabel = "Other",
    otherOptionType,
    required,
    errorMessage,
    textStyle = "singleLine",
    logicData

  } = valuesData;

  const customizeOptions = Array.isArray(options) ? options : [];
  console.log('customizeOptions', customizeOptions)
  const radioOptions = [
    ...customizeOptions.map((opt) => ({
      label: opt.value,
      value: opt.value,
    })),
    ...(noneOption ? [{ label: noneLabel, value: "none" }] : []),
    ...(otherOption && otherOptionType === "answerChoice"
      ? [{ label: otherOptionLabel, value: "other" }]
      : []),
  ];
  const handleChange = (val) => {
    debugger;
    // const isOther = val === "other";
    // setShowOtherInput(isOther);
    const selectedOptions = [
      ...customizeOptions
        .filter((opt) => val === opt.value)
        .map((opt) => ({
          value: opt.value,
          label: opt.label || opt.value,
          selected: true,
        })),
      ...(noneOption && val === "none"
        ? [{ value: "none", label: noneLabel, selected: true }]
        : []),
      ...(otherOption && val === "other"
        ? [{ value: "other", label: otherOptionLabel, selected: true }]
        : []),
    ];
    setOptionsData(selectedOptions);
    setUserSelectedValue(val);
    const payload = {
      identity,
      mainQuestion,
      pageId,
      id,
      answerData: selectedType,
      logicData: question?.logicData,

      valuesData: {
        options: selectedOptions, // ✅ only selected ones
        selectedOption: val,
      },
    };

    onQuestionChange?.(identity, payload);
  };
  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    console.log("input change", value);
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
          selectedOption: userselectedValue,
        },
      };
      console.log("payload", payload);
      onQuestionChange(identity, payload);
    }
  };

  // const defaultSelectedValue = (EditableData?.options || []).find(
  //   (opt) => opt.selected
  // )?.value;

  // const handleChange = (val) => {
  //   debugger
  //   const allOptions = [
  //     ...customizeOptions.map((opt) => ({
  //       value: opt.value,
  //       label: opt.value,
  //       selected: val === opt.value,
  //     })),
  //     ...(noneOption
  //       ? [{ value: "none", label: noneLabel, selected: val === "none" }]
  //       : []),
  //     ...(otherOption
  //       ? [{ value: "other", label: otherOptionLabel, selected: val === "other" }]
  //       : []),
  //   ];

  //   const payload = {
  //     identity,
  //     mainQuestion,
  //     pageId,
  //     id,
  //     answerData: selectedType,
  //     valuesData: {
  //       options: allOptions,
  //       selectedOption: val,
  //     },
  //   };

  //   onQuestionChange?.(identity, payload);
  // };

  // const selectedValue = form.getFieldValue(identity) ?? defaultSelectedValue;

  // useEffect(() => {
  //   if (otherOptionType === "commentField") {
  //     setShowOtherInput(true);
  //   }
  // }, []);

  return (
    <>
      <Form.Item
        name={`${pageId}~${identity}`}
        // initialValue={defaultSelectedValue}
        rules={[
          {
            required,
            message: errorMessage || "This field is required",
          },
        ]}
      >
        {/* <Radio.Group
          options={radioOptions}
          onChange={(e) => handleChange(e.target.value)}
          disabled={isSaved === false}
        /> */}
        <Radio.Group
          onChange={(e) => handleChange(e.target.value)}
          disabled={isSaved === false}
          className="row "
        >
          {radioOptions.map((opt) => (
            <Radio
              key={opt.value}
              value={opt.value}
              className="col-md-2 my-1"
            >
              {opt.label}
            </Radio>
          ))}
        </Radio.Group>

      </Form.Item>

      {/* Conditional "Other" input field */}
      {/* {otherOption &&
        otherOptionType === "commentField" &&
        selectedValue === "other" && (
          <Form.Item
            name={`${identity}_other`}
            rules={[
              {
                required: true,
                message: `Please enter ${otherOptionLabel || "Other value"}`,
              },
            ]}
          >
            {textStyle === "singleLine" ? (
              <InputComp
                props={{
                  placeholder: otherOptionLabel,
                  autoComplete: "off",
                  size: "small",
                }}
              />
            ) : (
              <TextareaComp
                props={{
                  placeholder: otherOptionLabel,
                  autoComplete: "off",
                  size: "large",
                }}
              />
            )}
          </Form.Item>
        )} */}
      {otherOption && (
        <SurveyOtherOption
          question={question}
          handleOtherInputChange={handleOtherInputChange}
          otherDefaultValue={EditableData?.otherValue || ""}
        />
      )}
    </>
  );
};

export default SurveyRadioQuestion;
