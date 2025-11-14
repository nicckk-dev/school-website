import React, { useEffect } from "react";
import { Form, Input } from "antd";

const SurveySingleTextboxQuestion = ({ question, form, onQuestionChange }) => {
  // Destructure with default to empty object to avoid crash before check
  const {
    id,
    identity,
    mainQuestion,
    pageId,
    required,
    validationMessage,
    selectedType,
    EditableData = {}
  } = question || {};
  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};
  // Unique field name for AntD form
  const fieldName = `singleText_${identity}`;

  // useEffect(() => {
  //   // Hook is always called, safe inside useEffect
  //   if (form && EditableData && identity) {
  //     const value = EditableData?.answer || "";
  //     form.setFieldValue(fieldName, value);
  //   }
  // }, [form, EditableData, identity, fieldName]);

  // If question or form is missing, return after hook is called
  if (!question || !form) return null;

  const handleChange = (e) => {
    const value = e.target.value;

    if (onQuestionChange) {
      const payload = {
        id,
        identity,
        mainQuestion,
        pageId,
        answerData: selectedType,
        valuesData: {
          answer: value,
        }
      };

      onQuestionChange(identity, payload);
    }
  };

  return (
    <div className="single-textbox-question">
      <Form.Item
       name={`page${pageId}_${identity}`}
        rules={[
          {
            required: configRequired ?? false,
            message: configErrorMessage || "This field is required",
          },
        ]}
      >
        <Input
          placeholder="Type your answer..."
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );
};

export default SurveySingleTextboxQuestion;
