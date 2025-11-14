import React, { useEffect, useState } from "react";
import { Form, Slider, InputNumber, Button, Row, Col } from "antd";

const SurveySliderQuestion = ({ question, form, onQuestionChange }) => {
  const [value, setValue] = useState(null);

  // const identity = question?.identity ?? "unknown";
  // const mainQuestion = question?.mainQuestion ?? "";
  //   const mainQuestion = question?.mainQuestion ?? "";

  const isSaved = question?.isSaved ?? false;
  const pageId = question?.pageId ?? null;
  const selectedType = question?.selectedType ?? "";
  const {
    id,
    identity,
    mainQuestion,
    logicData = [],
    EditableData = {},
  } = question;
  const valuesData = question?.valuesData || {};
  const {
    slider_left = 0,
    slider_right = 100,
    slider_center,
    errorMessage,
    required,
  } = valuesData;

  const min = Number(slider_left);
  const max = Number(slider_right);
  const center = (min + max) / 2;

  const marks = {
    [min]: slider_left,
    [center]: slider_center,
    [max]: slider_right,
  };
  console.log('ddddddddddd', question)
  // ✅ Determine initial value from EditableData (edit mode)
  useEffect(() => {
    if (!form || !identity) return;

    const defaultVal = question?.EditableData?.selectedOption ?? min;
    setValue(defaultVal);
    form.setFieldsValue({ [identity]: defaultVal });
  }, [form, identity, min]);

  const handleChange = (val) => {
    setValue(val);
    if (onQuestionChange) {
      const payload = {
        id,
        identity: question.identity,
        mainQuestion: question.mainQuestion,
        pageId: question.pageId,
        answerData: question.selectedType,
        valuesData: {
          options: [], // slider has no options
          selectedOption: val,
        },
      };
      onQuestionChange(question, payload);
    }
  };

  const handleClear = () => {
    setValue(null);
    form.setFieldsValue({ [identity]: null });

    onQuestionChange?.(identity, {
      questionId: identity,
      question: mainQuestion,
      selectedOption: null,
      options: [],
      pageId,
      answerData: selectedType,
    });
  };

  if (!question || !form) return null;

  return (
    <Form.Item
      name={`page${pageId}_${identity}`}
      rules={[
        {
          required,
          message: errorMessage || "This field is required",
        },
      ]}
    >
      <Row align="middle" gutter={12}>
        <Col flex="auto">
          <Slider
            min={min}
            max={max}
            marks={marks}
            step={1}
            tooltipPlacement="top"
            value={value}
            onChange={handleChange}
            disabled={isSaved === false}
          />
        </Col>
        {/* <Col>
          <InputNumber
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            disabled={isSaved === false}
            style={{ width: 70 }}
          />
        </Col> */}
        {/* <Col>
          <Button
            onClick={handleClear}
            disabled={isSaved === false}
            type="default"
            size="small"
          >
            Clear
          </Button>
        </Col> */}
      </Row>
    </Form.Item>
  );
};

export default SurveySliderQuestion;
