import React, { useEffect } from "react";
import { Form, Input } from "antd";

const SurveyCommentBoxQuestion = ({ question, form, onQuestionChange }) => {
  // Destructure early but provide default for EditableData
  const {
    id,
    identity,
    mainQuestion,
    pageId,
    selectedType,
    required,
    validationMessage,
    EditableData = {},
  } = question || {};
  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};
  const fieldValue = form?.getFieldValue?.(identity);
  const safeValue = typeof fieldValue === "string" ? fieldValue : "";

  // ✅ Always call hooks unconditionally
  // console.log('EditableData23232432432',EditableData)
  // useEffect(() => {
  //   if (!form || !EditableData || !identity) return;

  //   const value = EditableData?.answer || "";
  //   form.setFieldValue(identity, value);
  // }, [form, EditableData, identity]);

  // Then return conditionally
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
        },
      };

      onQuestionChange(identity, payload);
    }
  };

  return (
    <div className="comment-box-question">
      <Form.Item
       name={`page${pageId}_${identity}`}
        rules={[
          {
            required: configRequired ?? false,
            message: configErrorMessage || "This field is required",
          },
        ]}
      >
        <Input.TextArea
          rows={4}
          onChange={handleChange}
          value={safeValue}
          placeholder="Enter your comment here..."
        />
      </Form.Item>
    </div>
  );
};

export default SurveyCommentBoxQuestion;
