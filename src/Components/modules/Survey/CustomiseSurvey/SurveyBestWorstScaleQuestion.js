import React, { useEffect } from "react";
import { Table, Form, Radio } from "antd";

const SurveyBestWorstScaleQuestion = ({ question, form, onQuestionChange }) => {
  const {
    id,
    identity,
    required,
    valuesData = {},
    validationMessage,
    EditableData = null,
  } = question || {};

  const customizeOptions = valuesData?.options || [];
  const columnLabels = [
    valuesData?.label1 || "Best",
    valuesData?.label2 || "Worst",
  ];

  const rowLabels = customizeOptions.map((opt) => opt.value);

  // ✅ Handle edit scenario and pre-fill form fields
  console.log('EditableData', EditableData)
  useEffect(() => {
    if (!question || !form || !EditableData) return;

    const selectedOptions = EditableData?.options || [];

    for (const colLabel of columnLabels) {
      const fieldName = `${identity}_${colLabel}`;
      const selectedItem = selectedOptions.find(
        (opt) => opt.selected && opt.column === colLabel
      );
      if (selectedItem && form.getFieldValue(fieldName) == null) {
        form.setFieldValue(fieldName, selectedItem.value);
      }
    }
  }, [question, form, EditableData, columnLabels, identity]);

  if (!question || !form) return null;

  const handleChange = () => {
    const bestKey = `${identity}_${columnLabels[0]}`;
    const worstKey = `${identity}_${columnLabels[1]}`;

    const currentBest = form.getFieldValue(bestKey);
    const currentWorst = form.getFieldValue(worstKey);

    // Prevent selecting the same value for both Best and Worst
    if (currentBest && currentWorst && currentBest === currentWorst) {
      form.setFieldValue(worstKey, null);
    }

    if (onQuestionChange) {
      const payload = {
        id,
        identity,
        mainQuestion: question?.mainQuestion,
        pageId: question?.pageId,
        answerData: question?.selectedType,
        valuesData: {
          options: customizeOptions.flatMap((opt) => {
            const isBest = opt.value === currentBest;
            const isWorst = opt.value === currentWorst;
            const result = [];

            if (isBest) {
              result.push({
                value: opt.value,
                selected: true,
                column: columnLabels[0], // Best
              });
            }
            if (isWorst) {
              result.push({
                value: opt.value,
                selected: true,
                column: columnLabels[1], // Worst
              });
            }

            // Optionally include non-selected entries if needed
            if (!isBest && !isWorst) {
              result.push({
                value: opt.value,
                selected: false,
                column: null,
              });
            }

            return result;
          }),
        }

      };
      onQuestionChange(identity, payload);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      render: (text) => <strong>{text}</strong>,
    },
    ...columnLabels.map((colLabel) => ({
      title: colLabel,
      dataIndex: colLabel,
      key: colLabel,
      render: (_, record) => {
        const fieldName = `${identity}_${colLabel}`;
        return (
          <Form.Item
            name={fieldName}
            noStyle
            rules={[
              {
                required,
                message:
                  validationMessage || `Please select ${colLabel}`,
              },
            ]}
          >
            <Radio.Group
              onChange={handleChange}
              value={form.getFieldValue(fieldName)}
            >
              <Radio value={record.value} />
            </Radio.Group>
          </Form.Item>
        );
      },
    })),
  ];

  const dataSource = customizeOptions.map((opt) => ({
    label: opt.value,
    value: opt.value,
  }));

  return (
    <div className="best-worst-scale">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="value"
        pagination={false}
        bordered
        size="small"
      />
    </div>
  );
};

export default SurveyBestWorstScaleQuestion;
