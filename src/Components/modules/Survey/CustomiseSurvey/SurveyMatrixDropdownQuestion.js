// matrix of dropdwon

import React, { useState } from "react";
import { Table, Form, Select } from "antd";
import SurveyOtherOption from "./SurveyOtherOption";
import getprocessOptions from "../../../../utils/SurveyRandomizeFun.js";

const SurveyMatrixDropdownQuestion = ({ question, form, onQuestionChange }) => {
  debugger;
  const [optionData, setOptionData] = useState([]);
  // const [showOtherInput, setShowOtherInput] = useState(false);
  console.log("dropdown777777777777777", question);
  if (!question) return null;

  const {
    id,
    identity,
    required,
    valuesData = {},
    logicData = [],
    EditableData = {},
  } = question;
  const { otherOption } = valuesData;
  const options = question?.valuesData.rowOptions?.map((data) => ({
        value: data.rowLabel,
      }));
      const customizeOptions = getprocessOptions(options || [], question?.valuesData);
  // customizeOptions is assumed from your usage context:
  // it's probably question.valuesData.options.options or similar?
  // const customizeOptions = valuesData?.rowOptions || [];

  // Step 2: Extract selected values from EditableData
  // const defaultSelectedValues = (EditableData?.options || [])?.map(
  //   (opt) => opt.value
  // );

  const rows = customizeOptions?.map((r) => r.value);
  const columnsOptions = valuesData?.columnsOptions || [];
  const message =
    valuesData?.validationErrorMessage || "Please select an option";

  const handleChange = (rowKey, colIndex, selectedValue) => {
    // 1. Get current matrix values from form
    const currentValues = form.getFieldValue(identity) || {};

    // 2. Update the current field
    if (!currentValues[rowKey]) currentValues[rowKey] = {};
    currentValues[rowKey][colIndex] = selectedValue;

    // 3. Build structured payload
    const optionMap = {};

    rows.forEach((row, rIdx) => {
      optionMap[row] = columnsOptions.map((col, cIdx) => {
        const selected =
          currentValues?.[rIdx]?.[cIdx] ===
          col.options.find((opt) => opt === selectedValue);
        return {
          column: col.columnLabel,
          value: currentValues?.[rIdx]?.[cIdx] || null,
          selected: !!currentValues?.[rIdx]?.[cIdx],
        };
      });
    });

    setOptionData(optionMap);

    const payload = {
      id,
      identity,
      mainQuestion: question?.mainQuestion,
      pageId: question?.pageId,
      answerData: question?.selectedType,
      valuesData: {
        options: optionMap,
      },
    };
console.log("matrix payload", payload);
    if (onQuestionChange) {
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
        question: question?.mainQuestion,
        pageId: question?.pageId,
        answerData: question?.selectedType,
        valuesData: {
          options: optionData,
          otherValue: value,
          // selectedOption: value,
        },
      };
      onQuestionChange(identity, payload);
    }
  };

  const columnsDef = [
    {
      title: "", // empty header for row labels
      dataIndex: "rowLabel",
      key: "rowLabel",
      render: (text) => <strong>{text}</strong>,
    },
    ...columnsOptions.map((col, colIndex) => ({
      title: col.columnLabel,
      dataIndex: col.columnLabel,
      key: col.columnLabel,
      render: (_, record) => (
        <Form.Item
          name={[identity, record.rowKey, colIndex]}
          rules={[
            {
              required,
              message,
            },
          ]}
          style={{ marginBottom: 0 }}
          // initialValue={defaultSelectedValues}
        >
          <Select
            placeholder="Select"
            options={col.options.map((opt) => ({
              label: opt,
              value: opt,
            }))}
            style={{ minWidth: 120 }}
            onChange={(val) => handleChange(record.rowKey, colIndex, val)}
          />
        </Form.Item>
      ),
    })),
  ];

  const dataSource = rows.map((row, index) => ({
    key: index,
    rowKey: index,
    rowLabel: row,
  }));

  return (
    <div className="matrix-dropdown-question">
      <Table
        dataSource={dataSource}
        columns={columnsDef}
        pagination={false}
        bordered
        size="small"
      />
      {otherOption && (
        <SurveyOtherOption
          question={question}
          handleOtherInputChange={handleOtherInputChange}
        />
      )}
    </div>
  );
};

export default SurveyMatrixDropdownQuestion;
