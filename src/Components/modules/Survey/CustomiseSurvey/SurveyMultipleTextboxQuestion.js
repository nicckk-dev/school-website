import React, { useEffect } from "react";
import { Form, Row, Col, Input } from "antd";
import getprocessOptions from "../../../../utils/SurveyRandomizeFun";

const SurveyMultipleTextboxQuestion = ({
  question,
  onQuestionChange,
  form,
  readOnly = false,
  savedAnswers = {}, // { identity_0: "A", identity_1: "B" }
}) => {
  const {
    id,
    identity,
    mainQuestion,
    required = false,
    valuesData = {},
  } = question;

  const options = valuesData.labelOptions?.map((data) => ({
    value: data.label,
  }));
  const customizeOptions = getprocessOptions(options || [], question?.valuesData);
  // const customizeOptions = valuesData?.labelOptions || [];
  const allowNumericOnly = valuesData?.allowNumericOnly || false;
  const numericValidationMessage =
    valuesData?.numericValidationMessage || "Only numbers allowed";
  const requireFixedSum = valuesData?.requireFixedSum || false;
  const sumValue = valuesData?.sumValue ?? null;
  const sumErrorMessage = valuesData?.sumErrorMessage || "Sum mismatch";
  const message = valuesData?.errorMessage || "This field is required";

  const questions = customizeOptions.map((val, index) => ({
    key: index,
    label: val.value || "",
  }));

  const handleChange = () => {
    const allValues = form.getFieldsValue();
    const currentValues = {};

    questions.forEach((q, index) => {
      const fieldName = `${identity}_${index}`;
      currentValues[`field_${index}`] = allValues[fieldName];
    });

    const payload = {
      id,
      identity,
      mainQuestion,

      pageId: question?.pageId,
      answerData: question?.selectedType,
      valuesData: {
        options: currentValues,
      },
    };

    if (onQuestionChange) {
      onQuestionChange(identity, payload);
    }
  };

  useEffect(() => {
    const flatToSet = {};

    questions.forEach((q, index) => {
      const key = `${identity}_${index}`;

      // Priority: savedAnswers -> question.options
      if (savedAnswers && savedAnswers[key] !== undefined) {
        flatToSet[key] = savedAnswers[key];
      } else if (question.options?.[`field_${index}`] !== undefined) {
        flatToSet[key] = question.options[`field_${index}`];
      }
    });

    if (Object.keys(flatToSet).length > 0) {
      requestAnimationFrame(() => {
        form.setFieldsValue(flatToSet);
      });
    }
  }, [form, identity, savedAnswers, question.options]);

  const sumValidator = () => {
    if (requireFixedSum && sumValue !== null) {
      const allValues = form.getFieldsValue();
      const values = questions.map((q, index) =>
        Number(allValues[`${identity}_${index}`] || 0)
      );
      const sum = values.reduce((acc, val) => acc + val, 0);
      if (sum !== Number(sumValue)) {
        return Promise.reject(new Error(sumErrorMessage));
      }
    }
    return Promise.resolve();
  };
  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};
  return (
    <>
      {questions.map((q, index) => {
        const fieldName = `${identity}_${index}`;
        return (
          <Form.Item
            key={fieldName}
            name={fieldName}
            rules={
              readOnly
                ? []
                : [
                  {
                    required: configRequired ?? required ?? false,
                    message: configErrorMessage || `${q.label} - ${message}` || "This field is required",
                  },
                  ...(allowNumericOnly
                    ? [
                      {
                        pattern: /^\d+$/,
                        message: numericValidationMessage || "Only numeric values allowed",
                      },
                    ]
                    : []),
                ]
            }

          // rules={
          //   readOnly
          //     ? []
          //     : [
          //         {
          //           required,
          //           message: `${q.label} - ${message}`,
          //         },
          //         ...(allowNumericOnly
          //           ? [
          //               {
          //                 pattern: /^\d+$/,
          //                 message: numericValidationMessage,
          //               },
          //             ]
          //           : []),
          //       ]
          // }
          >
            <Row align="middle" className="mb-2">
              <Col span={6}>
                <label style={{ marginRight: 8 }}>{q.label}</label>
              </Col>
              <Col span={18}>
                <Input
                  placeholder={q.label}
                  disabled={readOnly}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Item>
        );
      })}

      {requireFixedSum && !readOnly && (
        <Form.Item shouldUpdate>
          {() => (
            <Form.Item noStyle rules={[{ validator: sumValidator }]}>
              <div style={{ display: "none" }} />
            </Form.Item>
          )}
        </Form.Item>
      )}
    </>
  );
};

export default SurveyMultipleTextboxQuestion;


