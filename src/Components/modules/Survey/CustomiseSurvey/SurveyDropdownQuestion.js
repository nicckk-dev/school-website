import React, { useEffect, useState } from "react";
import { Form, Select, Input } from "antd";
import SurveyOtherOption from "./SurveyOtherOption";

const { Option } = Select;

const SurveyDropdownQuestion = ({ question, form, onQuestionChange }) => {
  console.log("dropdown surveyyyyyy", question);
  const [finalOptions, setFinalOptions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const {
    id,
    identity,
    mainQuestion,
    required,
    isSaved,
    pageId,
    selectedType,
    valuesData = {},
    EditableData = {},
    logicData

  } = question;

  const {
    errorMessage,
    options = [],
    randomize = "none",
    noneOption = false,
    noneLabel = "None of the above",
    otherOption = false,
    otherOptionLabel = "Other",
    otherOptionType = "answerChoice",
  } = valuesData;

  const customizeOptions = options;

  // const defaultSelectedValue = EditableData?.options?.find(
  //   (data) => data?.selected
  // );
  // console.log("default value", defaultSelectedValue);
  useEffect(() => {
    if (!customizeOptions) return;

    let opts = customizeOptions.map((opt) => ({
      value: opt.value,
      label: opt.value,
    }));

    if (noneOption) {
      opts.push({ value: "__none__", label: noneLabel || "None of the above" });
    }

    if (otherOption && otherOptionType === "answerChoice") {
      opts.push({ value: "__other__", label: otherOptionLabel || "Other" });
    }
    if (otherOptionType === "commentField" && otherOption) {
      setShowOtherInput(true);
    }

    setFinalOptions(opts);
  }, []);

  if (!question) return null;

  const handleSelectChange = (value) => {
    const isOther = value === "__other__";
    setShowOtherInput(isOther);

    if (!isOther && onQuestionChange) {
      const payload = {
        id,
        identity,
        mainQuestion: mainQuestion,
        pageId,
        answerData: selectedType,
         logicData: question?.logicData,
        valuesData: {
          options: finalOptions.map((opt) => ({
            value: opt.value,
            label: opt.label,
            selected: value === opt.value,
          })),
          selectedOption: value,
        },
      };
      console.log("payload", payload);
      onQuestionChange(identity, payload);
    }
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
          options: finalOptions.map((opt) => ({
            value: opt.value,
            label: opt.label,
            selected: opt.value === "__other__",
          })),
          otherValue: value,
          selectedOption: value,
        },
      };
      console.log("payload", payload);
      onQuestionChange(identity, payload);
    }
  };
  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};
  console.log('requiredrequired', required, errorMessage, question)
  return (
    <>
      <Form.Item
        // label={<strong>{mainQuestion}</strong>}
        name={`page${pageId}_${identity}`}
        // initialValue={undefined}
        rules={[
          {
            required: configRequired ?? false,
            message: configErrorMessage || "This field is required",
          },
        ]}
      >
        <Select
          placeholder="Select"
          style={{ width: "100%" }}
          disabled={isSaved === false}
          onChange={handleSelectChange}
          // defaultValue={defaultSelectedValue?.value || ""}
          allowClear
        >
          {finalOptions?.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label || opt.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* {showOtherInput && (
        <Form.Item
          name={`${identity}_other`}
          rules={[
            {
              required: true,
              message: `Please specify: ${otherOptionLabel || "Other"}`,
            },
          ]}
        >
          <Input
            className="my-2"
            placeholder={otherOptionLabel || "Other"}
            onChange={handleOtherInputChange}
          />
        </Form.Item>
      )} */}
      {showOtherInput && (
        <SurveyOtherOption
          question={question}
          handleOtherInputChange={handleOtherInputChange}
        // otherDefaultValue={EditableData?.otherValue || ""}
        />
      )}
    </>
  );
};

export default SurveyDropdownQuestion;
