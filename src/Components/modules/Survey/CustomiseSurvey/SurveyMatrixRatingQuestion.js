// matrix rating

import React, { useState } from "react";
import { Table, Form, Radio, Checkbox } from "antd";
import SurveyOtherOption from "./SurveyOtherOption";
import getprocessOptions from "../../../../utils/SurveyRandomizeFun.js";

const SurveyMatrixRatingQuestion = ({ question, form, onQuestionChange }) => {
   const [optionData, setOptionData] = useState([]);
  if (!question) return null;
 
  console.log("matrix ratings", question);

  const {
    id,
    identity,
    required,
    mainQuestion,
    pageId,
    selectedType,
    valuesData = {},
    logicData = [],
    EditableData = {},
  } = question;
  const { otherOption } = valuesData;
  const options = valuesData.rowOptions?.map((data) => ({
    value: data.labelValue,
  }));
  const customizeOptions = getprocessOptions(
    options || [],
    question?.valuesData
  );

  // const customizeOptions = valuesData?.rowOptions || [];
  const rowOptions = customizeOptions.map((r, idx) => ({
    key: idx,
    label: r?.value || `Row ${idx + 1}`,
  }));

  const columnsOptions = valuesData?.columnsOptions || [];

  // Prepare columns in expected format
  const columns = columnsOptions.map((col) => ({
    label: col.columnValue,
    value: col.columnValue,
  }));

  const dataSource = [...rowOptions];

  // if (valuesData?.otherOption) {
  //   dataSource.push({
  //     key: "other",
  //     rowKey: "other",
  //     rowLabel: valuesData?.otherOptionLabel || "Other",
  //   });
  // }

  const formattedDataSource = dataSource.map((row, index) => ({
    key: row.key || index,
    rowKey: row.key || index,
    rowLabel: row.label || row,
  }));

  const allowMultipleResponses = false;
  // !valuesData?.singleRowScale;
  const addNAColumn = valuesData?.addNA;
  const naLabel = valuesData?.NAcolumn || "N/A";
  const otherLabel = valuesData?.otherOptionLabel || "Other";
  const message = valuesData?.validationErrorMessage || "";

  const handleChange = (rowKey, e) => {
    const selectedVal = e?.target?.value || e;

    // Set form value for the changed row
    form.setFieldsValue({
      [identity]: {
        ...(form.getFieldValue(identity) || {}),
        [rowKey]: selectedVal,
      },
    });

    // Get the entire updated matrix from the form
    const currentMatrixValues = form.getFieldValue(identity) || {};

    const optionMap = {};

    formattedDataSource.forEach((row) => {
      const selectedForRow = currentMatrixValues?.[row.rowKey];

      const allOptions = columns.map((col) => ({
        value: col.value || col,
        selected: selectedForRow === (col.value || col),
      }));

      if (addNAColumn) {
        allOptions.push({
          value: "NA",
          selected: selectedForRow === "NA",
        });
      }

      optionMap[row.rowKey] = allOptions;
    });

    setOptionData(optionMap);

    const payload = {
      id,
      identity,
      mainQuestion: mainQuestion,
      pageId: pageId,
      answerData: selectedType,
      valuesData: {
        options: optionMap,
      },
    };

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
        question: mainQuestion,
        pageId: pageId,
        answerData: selectedType,
        valuesData: {
          options: optionData,
          otherValue: value,
          // selectedOption: value,
        },
      };
      onQuestionChange(identity, payload);
    }
  };

  const finalColumns = [
    {
      title: "",
      dataIndex: "rowLabel",
      key: "rowLabel",
      render: (text) => <strong>{text}</strong>,
      fixed: "left",
    },
    ...columns.map((col, colIndex) => ({
      title: col.label || col,
      dataIndex: `col_${colIndex}`,
      key: `col_${colIndex}`,
      align: "center",
      render: (_, record) => {
        const rowName = `${identity}.${record.rowKey}`;
        const value = col.value || col;

        return (
          <Form.Item
            name={rowName}
            className="m-0"
            rules={
              required
                ? [
                    {
                      required: true,
                      message:
                        message || `Please select for ${record.rowLabel}`,
                    },
                  ]
                : []
            }
          >
            {allowMultipleResponses ? (
              <Checkbox
                value={value}
                onChange={() => handleChange(record.rowKey, value)}
              />
            ) : (
              <Radio.Group onChange={(val) => handleChange(record.rowKey, val)}>
                <Radio value={value} />
              </Radio.Group>
            )}
          </Form.Item>
        );
      },
    })),
  ];

  if (addNAColumn) {
    finalColumns.push({
      title: naLabel,
      dataIndex: "na",
      key: "na",
      align: "center",
      render: (_, record) => {
        const rowName = `${identity}.${record.rowKey}`;

        return (
          <Form.Item name={rowName} className="m-0">
            {allowMultipleResponses ? (
              <Checkbox
                value="NA"
                onChange={() => handleChange(record.rowKey, "NA")}
              />
            ) : (
              <Radio.Group onChange={(val) => handleChange(record.rowKey, val)}>
                <Radio value="NA" />
              </Radio.Group>
            )}
          </Form.Item>
        );
      },
    });
  }

  return (
    <div className="matrix-rating-question">
      <Table
        dataSource={formattedDataSource}
        columns={finalColumns}
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

export default SurveyMatrixRatingQuestion;
