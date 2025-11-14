import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Slider,
  Form,
  Rate,
  Select,
  Table,
  Radio,
  Checkbox,
  Typography,
  Input,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Button,
  InputNumber,
} from "antd";
import { CommonEasUpload } from "../../Intervention/CommonEasUpload";
import { ReactSortable } from "react-sortablejs";
import { DownOutlined, DragOutlined, HeartFilled, LikeFilled, SmileFilled, StarFilled, UpOutlined } from "@ant-design/icons";
import { InputComp, TextareaComp } from "../../../common/FormComponent";

const { Option } = Select;
// export const SliderComp = ({ props }) => {
//     debugger
//   return (
//     <Form.Item
//       label={props.label}
//       name={props.name}
//       initialValue={props.initialValue}
//       rules={[
//         {
//           required: props.required,
//           message: props.message,
//         },
//       ]}
//     >
//       <Slider
//         min={props.min}
//         max={props.max}
//         step={props.step}
//         marks={props.marks}
//         tooltipVisible={props.tooltipVisible}
//         tooltipPlacement={props.tooltipPlacement}
//         onChange={props.onChange}
//         disabled={props.disabled}
//         included={props.included}
//         range={props.range}
//         dots={props.dots}
//       />
//     </Form.Item>
//   );
// };

// SliderComp.propTypes = {
//   props: PropTypes.shape({
//     label: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     initialValue: PropTypes.number,
//     required: PropTypes.bool,
//     message: PropTypes.string,
//     min: PropTypes.number,
//     max: PropTypes.number,
//     step: PropTypes.number,
//     marks: PropTypes.object,
//     tooltipVisible: PropTypes.bool,
//     tooltipPlacement: PropTypes.string,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     included: PropTypes.bool,
//     range: PropTypes.bool,
//     dots: PropTypes.bool,
//   }),
// };

// SliderComp.defaultProps = {
//   props: {
//     required: false,
//     tooltipVisible: true,
//     disabled: false,
//     included: true,
//     range: false,
//     step: 1,
//     dots: false,
//   },
// };


export const SliderComp = ({ props }) => {
  const {
    name,
    label,
    required = false,
    message = "This field is required",
    initialValue,
    min ,
    max ,
    step = 1,
    disabled = false,
    onChange,
    marks,
    tooltipVisible = true,
    tooltipPlacement = "top",
  } = props;

  const [value, setValue] = useState(initialValue ?? min);

  const handleChange = (val) => {
    setValue(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    setValue(null);
    if (onChange) onChange(null);
  };

  return (
    <Form.Item
      // label={label}
      name={name}
      initialValue={initialValue}
      rules={[
        {
          required: required,
          message: message,
        },
      ]}
    >
      <Row align="middle" gutter={12}>
        <Col flex="auto">
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            tooltipVisible={tooltipVisible}
            tooltipPlacement={tooltipPlacement}
            onChange={handleChange}
            value={value}
            disabled={disabled}
          />
        </Col>
        <Col>
          <InputNumber
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            style={{ width: 70, padding: "2px" ,alignItems: "center"}}
          />
        </Col>
        <Col>
          <Button
            onClick={handleClear}
            disabled={disabled}
            type="default"
            size="small"
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form.Item>
  );
};

SliderComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    message: PropTypes.string,
    initialValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    marks: PropTypes.object,
    tooltipVisible: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
  }),
};

SliderComp.defaultProps = {
  props: {
    required: false,
    tooltipVisible: true,
    disabled: false,
    step: 1,
    tooltipPlacement: "top",
  },
};

// export const RateComp = ({ props }) => {
//   return (
//     <Form.Item
//       label={props.label}
//       name={props.name}
//       initialValue={props.initialValue}
//       rules={[
//         {
//           required: props.required,
//           message: props.message,
//         },
//       ]}
//     >
//       <Rate
//         count={props.count}
//         allowHalf={props.allowHalf}
//         tooltips={props.tooltips}
//         disabled={props.disabled}
//         onChange={props.onChange}
//       />
//     </Form.Item>
//   );
// };

// RateComp.propTypes = {
//   props: PropTypes.shape({
//     label: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     required: PropTypes.bool,
//     message: PropTypes.string,
//     initialValue: PropTypes.number,
//     count: PropTypes.number, // default is 5
//     allowHalf: PropTypes.bool,
//     tooltips: PropTypes.arrayOf(PropTypes.string),
//     disabled: PropTypes.bool,
//     onChange: PropTypes.func,
//   }),
// };

// RateComp.defaultProps = {
//   props: {
//     required: false,
//     count: 5,
//     allowHalf: false,
//     disabled: false,
//   },
// };


const getRatingIcon = (shape) => {
  switch (shape) {
    case "heart":
      return <HeartFilled  />;
    case "smile":
    case "smiley":
      return <SmileFilled  />;
    case "thumb":
      return <LikeFilled  />;
    case "star":
    default:
      return <StarFilled />;
  }
};

export const RateComp = ({ props }) => {
  debugger
  const {
    label,
    name,
    initialValue,
    required,
    message,
    count,
    allowHalf,
    tooltips,
    disabled,
    onChange,
    shape = "star",
  } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={initialValue}
      rules={[
        {
          required,
          message,
        },
      ]}
    >
      <Rate
        count={count}
        tooltips={tooltips}
        allowHalf={allowHalf}
        disabled={disabled}
        character={getRatingIcon(shape)}
        onChange={onChange}
        className="fs-4"
      />
    </Form.Item>
  );
};

RateComp.propTypes = {
  props: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    message: PropTypes.string,
    initialValue: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    tooltips: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    shape: PropTypes.oneOf(["star", "heart", "smile", "thumb"]),
  }),
};

RateComp.defaultProps = {
  props: {
    required: false,
    count: 5,
    allowHalf: false,
    disabled: false,
    shape: "star",
  },
};

// export const MatrixDropdownComp = ({ props }) => {
//   const { name, rows, columns, options, required, message } = props;

//   const columnsDef = [
//     {
//       title: "", // empty header for row labels
//       dataIndex: "rowLabel",
//       key: "rowLabel",
//       render: (text) => <strong>{text}</strong>,
//     },
//     ...columns?.map((col, colIndex) => ({
//       title: col,
//       dataIndex: col,
//       key: col,
//       render: (_, record) => (
//         <Form.Item
//           name={[name, record.rowKey, colIndex]}
//           rules={[
//             {
//               required: required,
//               message: message || "Please select an option",
//             },
//           ]}
//           style={{ marginBottom: 0 }}
//         >
//           <Select
//             placeholder="Select"
//             options={options}
//             style={{ minWidth: 120 }}
//           />
//         </Form.Item>
//       ),
//     })),
//   ];

//   const dataSource = rows?.map((row, index) => ({
//     key: index,
//     rowKey: index,
//     rowLabel: row,
//   }));

//   return (
//     <div className="matrix-dropdown-question">
//       <Table
//         dataSource={dataSource}
//         columns={columnsDef}
//         pagination={false}
//         bordered
//         size="small"
//       />
//     </div>
//   );
// };

// MatrixDropdownComp.propTypes = {
//   props: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     rows: PropTypes.array.isRequired,
//     columns: PropTypes.array.isRequired,
//     options: PropTypes.array.isRequired,
//     required: PropTypes.bool,
//     message: PropTypes.string,
//   }),
// };

// export const MatrixRatingComp = ({ props }) => {
//   const {
//     name,
//     rows,
//     columns,
//     required,
//     message,
//     allowMultipleResponses = false,
//     addNAColumn = false,
//     naLabel = "N/A",
//     addOtherRow = false,
//     otherLabel = "Other",
//   } = props;

//   const dataSource = [...rows];

//   if (addOtherRow) {
//     dataSource.push({
//       key: "other",
//       rowKey: "other",
//       rowLabel: otherLabel,
//     });
//   }

//   const finalColumns = [
//     {
//       title: "",
//       dataIndex: "rowLabel",
//       key: "rowLabel",
//       render: (text) => <strong>{text}</strong>,
//       fixed: "left",
//     },
//     ...columns.map((col, colIndex) => ({
//       title: col.label || col,
//       dataIndex: `col_${colIndex}`,
//       key: `col_${colIndex}`,
//       align: "center",
//       render: (_, record) => {
//         const rowName = `${name}.${record.rowKey}`;
//         const value = col.value || col;
//         const label = col.label || col;

//         return (
//           <Form.Item
//             name={allowMultipleResponses ? [rowName] : rowName}
//             valuePropName={allowMultipleResponses ? "value" : undefined}
//             className="m-0"
//             rules={
//               required
//                 ? [
//                     {
//                       required: true,
//                       message:
//                         message || `Please select for ${record.rowLabel}`,
//                     },
//                   ]
//                 : []
//             }
//           >
//             {allowMultipleResponses ? (
//               <Checkbox value={value} />
//             ) : (
//               <Radio value={value} />
//             )}
//           </Form.Item>
//         );
//       },
//     })),
//   ];

//   if (addNAColumn) {
//     finalColumns.push({
//       title: naLabel,
//       dataIndex: "na",
//       key: "na",
//       align: "center",
//       render: (_, record) => {
//         const rowName = `${name}.${record.rowKey}`;

//         return (
//           <Form.Item
//             name={allowMultipleResponses ? [rowName] : rowName}
//             className="m-0"
//           >
//             {allowMultipleResponses ? (
//               <Checkbox value="NA" />
//             ) : (
//               <Radio value="NA" />
//             )}
//           </Form.Item>
//         );
//       },
//     });
//   }

//   const formattedDataSource = dataSource.map((row, index) => ({
//     key: row.key || index,
//     rowKey: row.key || index,
//     rowLabel: row.label || row,
//   }));

//   return (
//     <div className="matrix-rating-question">
//       <Table
//         dataSource={formattedDataSource}
//         columns={finalColumns}
//         pagination={false}
//         bordered
//         size="small"
//       />
//     </div>
//   );
// };
// MatrixRatingComp.propTypes = {
//   props: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     rows: PropTypes.array.isRequired,
//     columns: PropTypes.array.isRequired,
//     required: PropTypes.bool,
//     message: PropTypes.string,
//   }),
// };

// new

export const MatrixDropdownComp = ({ props }) => {
  const { name, rows, columnsOptions, required, message, disabled } = props;

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
          name={[name, record.rowKey, colIndex]}
          rules={[
            {
              required: required,
              message: message || "Please select an option",
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Select
            placeholder="Select"
            options={col.options.map((opt) => ({
              label: opt,
              value: opt,
            }))}
            style={{ minWidth: 120 }}
            disabled={disabled}
          />
        </Form.Item>
      ),
    })),
  ];

  const dataSource = rows?.map((row, index) => ({
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
    </div>
  );
};

MatrixDropdownComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    columnsOptions: PropTypes.arrayOf(
      PropTypes.shape({
        columnLabel: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
    required: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
};

export const MatrixRatingComp = ({ props }) => {
    debugger
  const {
    name,
    rows,
    columns,
    required,
    message,
    allowMultipleResponses = false,
    addNAColumn = false,
    naLabel = "N/A",
    addOtherRow = false,
    otherLabel = "Other",
    singleRowScale = false,
    disabled
  } = props;

  const dataSource = rows.length > 0 ? [...rows] : [];

  if (addOtherRow) {
    dataSource.push({
      key: "other",
      rowKey: "other",
      rowLabel: otherLabel,
    });
  }

  const formattedDataSource = singleRowScale ?  [dataSource[0]] : dataSource?.map((row, index) => ({
    key: row.key || index,
    rowKey: row.key || index,
    rowLabel: row.label || row,
  }));

  const finalColumns = [
    ...(!singleRowScale
    ? [
        {
          title: "",
          dataIndex: "rowLabel",
          key: "rowLabel",
          render: (text) => <strong>{text}</strong>,
          fixed: "left",
        },
      ]
    : []),
    ...columns?.map((col, colIndex) => ({
      title: col.label || col,
      dataIndex: `col_${colIndex}`,
      key: `col_${colIndex}`,
      align: "center",
      render: (_, record) => {
        const rowName = `${name}.${record.rowKey}`;
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
              <Checkbox value={value} disabled={disabled}/>
            ) : (
              <Radio.Group>
                <Radio value={value} disabled={disabled} />
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
        const rowName = `${name}.${record.rowKey}`;

        return (
          <Form.Item name={rowName} className="m-0">
            {allowMultipleResponses ? (
              <Checkbox value="NA" disabled={disabled}/>
            ) : (
              <Radio.Group>
                <Radio value="NA" disabled={disabled}/>
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
    </div>
  );
};

// export const MatrixRatingComp = ({ props }) => {
//   const {
//     name,
//     rows,
//     columns,
//     required,
//     message,
//     allowMultipleResponses = false,
//     addNAColumn = false,
//     naLabel = "N/A",
//     addOtherRow = false,
//     otherLabel = "Other",
//     singleRowScale = false, // <-- NEW FLAG from props
//   } = props;

//   const formItemRules = required
//     ? [
//         {
//           required: true,
//           message: message || `Please select an option`,
//         },
//       ]
//     : [];

//   // CASE 1: SINGLE ROW SCALE VIEW (like SurveyMonkey)
//   if (singleRowScale) {
//     const options = columns.map((col) => ({
//       label: col.label || col,
//       value: col.value || col,
//     }));

//     if (addNAColumn) {
//       options.push({ label: naLabel, value: "NA" });
//     }

//     return (
//       <Form.Item name={name} rules={formItemRules}>
//         {allowMultipleResponses ? (
//           <Checkbox.Group options={options} />
//         ) : (
//           <Radio.Group options={options} />
//         )}
//       </Form.Item>
//     );
//   }

//   // CASE 2: REGULAR MATRIX TABLE
//   const dataSource = [...rows];
//   if (addOtherRow) {
//     dataSource.push({
//       key: "other",
//       rowKey: "other",
//       rowLabel: otherLabel,
//     });
//   }

//   const formattedDataSource = dataSource?.map((row, index) => ({
//     key: row.key || index,
//     rowKey: row.key || index,
//     rowLabel: row.label || row,
//   }));

//   const finalColumns = [
//     {
//       title: "",
//       dataIndex: "rowLabel",
//       key: "rowLabel",
//       render: (text) => <strong>{text}</strong>,
//       fixed: "left",
//     },
//     ...columns?.map((col, colIndex) => ({
//       title: col.label || col,
//       dataIndex: `col_${colIndex}`,
//       key: `col_${colIndex}`,
//       align: "center",
//       render: (_, record) => {
//         const rowName = `${name}.${record.rowKey}`;
//         const value = col.value || col;

//         return (
//           <Form.Item name={rowName} className="m-0" rules={formItemRules}>
//             {allowMultipleResponses ? (
//               <Checkbox value={value} />
//             ) : (
//               <Radio.Group>
//                 <Radio value={value} />
//               </Radio.Group>
//             )}
//           </Form.Item>
//         );
//       },
//     })),
//   ];

//   if (addNAColumn) {
//     finalColumns.push({
//       title: naLabel,
//       dataIndex: "na",
//       key: "na",
//       align: "center",
//       render: (_, record) => {
//         const rowName = `${name}.${record.rowKey}`;

//         return (
//           <Form.Item name={rowName} className="m-0">
//             {allowMultipleResponses ? (
//               <Checkbox value="NA" />
//             ) : (
//               <Radio.Group>
//                 <Radio value="NA" />
//               </Radio.Group>
//             )}
//           </Form.Item>
//         );
//       },
//     });
//   }

//   return (
//     <div className="matrix-rating-question">
//       <Table
//         dataSource={formattedDataSource}
//         columns={finalColumns}
//         pagination={false}
//         bordered
//         size="small"
//       />
//     </div>
//   );
// };


MatrixRatingComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    required: PropTypes.bool,
    message: PropTypes.string,
    allowMultipleResponses: PropTypes.bool,
    addNAColumn: PropTypes.bool,
    naLabel: PropTypes.string,
    addOtherRow: PropTypes.bool,
    otherLabel: PropTypes.string,
  }),
};

// old
// export const BestWorstScaleComp = ({ props }) => {
//   const {
//     name,
//     options,
//     columnLabels,
//     required,
//     message,
//     form,
//   } = props;

//   const handleChange = (columnKey, value) => {
//     const currentBest = form.getFieldValue(`${name}_${columnLabels[0]}`);
//     const currentWorst = form.getFieldValue(`${name}_${columnLabels[1]}`);

//     // prevent selecting the same option for both best and worst
//     if (columnKey === columnLabels[0] && currentWorst === value) {
//       form.setFieldValue(`${name}_${columnLabels[1]}`, null);
//     }
//     if (columnKey === columnLabels[1] && currentBest === value) {
//       form.setFieldValue(`${name}_${columnLabels[0]}`, null);
//     }
//   };

//   const columns = [
//     {
//       title: "",
//       dataIndex: "label",
//       key: "label",
//       render: (text) => <strong>{text}</strong>,
//     },
//     ...columnLabels?.map((colLabel) => ({
//       title: colLabel,
//       dataIndex: colLabel,
//       key: colLabel,
//       render: (_, record) => (
//         <Form.Item
//           name={`${name}_${colLabel}`}
//           noStyle
//           rules={[
//             {
//               required,
//               message: message || `Please select ${colLabel}`,
//             },
//           ]}
//         >
//           <Radio.Group
//             onChange={(e) => handleChange(colLabel, record.value)}
//             value={form.getFieldValue(`${name}_${colLabel}`)}
//           >
//             <Radio value={record.value} />
//           </Radio.Group>
//         </Form.Item>
//       ),
//     })),
//   ];

//   return (
//     <div className="best-worst-scale">
//       <Table
//         dataSource={options}
//         columns={columns}
//         rowKey="value"
//         pagination={false}
//         bordered
//         size="small"
//       />
//     </div>
//   );
// };

// BestWorstScaleComp.propTypes = {
//   props: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     options: PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string,
//         value: PropTypes.string,
//       })
//     ).isRequired,
//     columnLabels: PropTypes.arrayOf(PropTypes.string),
//     required: PropTypes.bool,
//     message: PropTypes.string,
//     form: PropTypes.object.isRequired,
//   }).isRequired,
// };

// export const MultipleTextboxComp = ({ props }) => {
//   const {
//     name,
//     label,
//     required = false,
//     message = "This field is required",
//     questions = [],
//   } = props;

//   return (
//     <div>
//       {label && <label style={{ fontWeight: "bold" }}>{}</label>}
//       {questions.map((q) => (
//         <Form.Item
//           key={`${name}_${q.key}`}
//           name={[name, q.key]}
//           label={q.label}
//           rules={[
//             {
//               required: required,
//               message: `${q.label} - ${message}`,
//             },
//           ]}
//         >
//           <Input placeholder={q.label} />
//         </Form.Item>
//       ))}
//     </div>
//   );
// };

// new
export const BestWorstScaleComp = ({ props }) => {
  const { name, options, columnLabels, required, message, form, disabled } = props;

  const handleChange = (columnKey, value) => {
    debugger
    const bestKey = `${name}_${columnLabels[0]}`;
    const worstKey = `${name}_${columnLabels[1]}`;

    const currentBest = form.getFieldValue(bestKey);
    const currentWorst = form.getFieldValue(worstKey);

    // prevent selecting the same option for both best and worst
    if (columnKey === columnLabels[0] && currentWorst === value) {
      form.setFieldValue(worstKey, null);
    }
    if (columnKey === columnLabels[1] && currentBest === value) {
      form.setFieldValue(bestKey, null);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      render: (text) => <strong>{text}</strong>,
    },
    ...columnLabels?.map((colLabel) => ({
      title: colLabel,
      dataIndex: colLabel,
      key: colLabel,
      render: (_, record) => {
        const fieldName = `${name}_${colLabel}`;
        return (
          <Form.Item
            name={fieldName}
            noStyle
            rules={[
              {
                required,
                message: message || `Please select ${colLabel}`,
              },
            ]}
          >
            <Radio.Group
              onChange={() => handleChange(colLabel, record.value)}
              value={form.getFieldValue(fieldName)}
              disabled={disabled}
            >
              <Radio value={record.value} />
            </Radio.Group>
          </Form.Item>
        );
      },
    })),
  ];

  return (
    <div className="best-worst-scale">
      <Table
        dataSource={options}
        columns={columns}
        rowKey="value"
        pagination={false}
        bordered
        size="small"
      />
    </div>
  );
};

BestWorstScaleComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ).isRequired,
    columnLabels: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
    message: PropTypes.string,
    form: PropTypes.object.isRequired,
  }).isRequired,
};

// export const MultipleTextboxComp = ({ props }) => {
//   const {
//     name,
//     label,
//     required = false,
//     message = "This field is required",
//     questions = [],
//   } = props;

//   return (
//     <div>
//       {/* {label && (
//         <div style={{ fontWeight: "bold", marginBottom: 8 }}>{label}</div>
//       )} */}

//       {questions?.map((q) => (
//         <Form.Item
//           key={`${name}_${q.key}`}
//           name={[name, q.key]}
//           rules={[
//             {
//               required: required,
//               message: `${q.label} - ${message}`,
//             },
//           ]}
//         >
//           <Row align="middle mb-12">
//             <Col span={6}>
//               <label style={{ marginRight: 8 }}>{q.label}:</label>
//             </Col>
//             <Col span={18} className="my-2">
//               <Input placeholder={q.label} />
//             </Col>
//           </Row>
//         </Form.Item>
//       ))}
//     </div>
//   );
// };

// MultipleTextboxComp.propTypes = {
//   props: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     required: PropTypes.bool,
//     message: PropTypes.string,
//     questions: PropTypes.arrayOf(
//       PropTypes.shape({
//         key: PropTypes.string.isRequired,
//         label: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

// export const SurveyDateTimeComp = ({ props }) => {
//   const {
//     name,
//     label,
//     required = false,
//     message = "This field is required",
//     type ,//= "datetime", // date | time | datetime
//     format // = "MM/DD/YYYY",
//   } = props;

//   const getPicker = () => {
//     if (type === "date") {
//       return (
//         <DatePicker
//           style={{ width: "100%" }}
//           format={format}
//           placeholder="Select date"
//         />
//       );
//     }

//     if (type === "time") {
//       return (
//         <TimePicker
//           style={{ width: "100%" }}
//           format="HH:mm"
//           placeholder="Select time"
//         />
//       );
//     }

//     // datetime
//     return (
//      <>
//       <DatePicker
//         showTime
//         style={{ width: "100%" }}
//         // format={`${format} HH:mm`}
//         placeholder="Select date and time"
//       />
//       <TimePicker
//           style={{ width: "100%" }}
//           format="HH:mm"
//           placeholder="Select time"
//         />
//      </>
//     );
//   };

//   return (
//     <Form.Item
//       name={name}
//       label={<strong>{label}</strong>}
//       rules={[
//         {
//           required,
//           message,
//         },
//       ]}
//     >
//       {getPicker()}
//     </Form.Item>
//   );
// };

export const MultipleTextboxComp = ({ props }) => {
    debugger
  const {
    name,
    label,
    required = false,
    message = "This field is required",
    questions = [],
    allowNumericOnly = false,
    numericValidationMessage = "Only numbers allowed",
    requireFixedSum = false,
    sumValue = null,
    sumErrorMessage = "Sum mismatch",
    disabled
  } = props;

  // This validator will run after individual validations, on form submit
  const sumValidator = (_, allValues) => {
    if (requireFixedSum && sumValue !== null) {
      const values = Object.values(allValues?.[name] || {}).map((v) =>
        Number(v || 0)
      );
      const sum = values.reduce((acc, val) => acc + val, 0);

      if (sum !== Number(sumValue)) {
        return Promise.reject(new Error(sumErrorMessage));
      }
    }
    return Promise.resolve();
  };

  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldsValue }) => (
        <>
          {/* {label && (
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>{label}</div>
          )} */}

          {questions?.map((q) => (
            <Form.Item
              key={`${name}_${q.key}`}
              name={[name, q.key]}
              rules={[
                {
                  required,
                  message: `${q.label} - ${message}`,
                },
                ...(allowNumericOnly
                  ? [
                      {
                        pattern: /^\d+$/,
                        message: numericValidationMessage,
                      },
                    ]
                  : []),
              ]}
            >
              <Row align="middle" className="mb-2">
                <Col span={6}>
                  <label style={{ marginRight: 8 }}>{q.label}:</label>
                </Col>
                <Col span={18}>
                  <Input placeholder={q.label} disabled={disabled}/>
                </Col>
              </Row>
            </Form.Item>
          ))}

          {requireFixedSum && (
            <Form.Item
              noStyle
              shouldUpdate={(prev, current) => {
                return (
                  JSON.stringify(prev[name]) !== JSON.stringify(current[name])
                );
              }}
              rules={[{ validator: sumValidator }]}
            >
              {() => null}
            </Form.Item>
          )}
        </>
      )}
    </Form.Item>
  );
};

MultipleTextboxComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    message: PropTypes.string,
    allowNumericOnly: PropTypes.bool,
    numericValidationMessage: PropTypes.string,
    requireFixedSum: PropTypes.bool,
    sumErrorMessage: PropTypes.string,
    sumValue: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export const SurveyDateTimeComp = ({ props }) => {
  const {
    name,
    label,
    required = false,
    message = "This field is required",
    type, // = "datetime", // date | time | datetime
    format, // = "MM/DD/YYYY",
    options,
    showDateInfo,
    showTimeInfo,
    disabled
  } = props;
 
  return (
    <>
      {options?.map((data) => (
        <div className="d-flex flex-column mb-4">
          <p className="m-0 mb-2 p-0 fs-6">{data.label}</p>
          <div className="row">
            {showDateInfo && (
              <div className="col-12 col-md-5">
                <Form.Item label="Date">
                  <DatePicker
                  className=""
                  format={format}
                  placeholder="Select date"
                 disabled={disabled}
 
                />
                </Form.Item>
               
              </div>
            )}
            {showTimeInfo && (
              <div className="d-flex gap-3 col-12 col-md-7">
                <Form.Item label="Time">
                   <Input className="" placeholder="hh" maxLength={2} disabled={disabled} />
                </Form.Item>
                <Form.Item label="    ">
                  <Input className="" placeholder="mm" maxLength={2} disabled={disabled} />
                </Form.Item>
               
                <Form.Item label="AM/PM">
                   <Select
                  className=""
                  placeholder="AM/PM"
                  options={[
                    { value: "AM", label: "AM" },
                    { value: "PM", label: "PM" },
                  ]}
                  disabled={disabled}
                />
                </Form.Item>
               
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
 
//   const getPicker = () => {
//     if (type === "date") {
//       return (
//         <DatePicker
//           className="w-50"
//           format={format}
//           placeholder="Select date"
//         />
//       );
//     }
 
//     if (type === "time") {
//       return (
//         <div className="d-flex ">
//           <Input className="w-40 mr-10" placeholder="hh" maxLength={2} />
//           <Input className="w-40 mr-10" placeholder="mm" maxLength={2} />
//           <Select
//             className="w-20"
//             placeholder="AM/PM"
//             options={[
//               { value: "AM", label: "AM" },
//               { value: "PM", label: "PM" },
//             ]}
//           />
//         </div>
//       );
//     }
 
//     // datetime
//     return (
//       <>
//         <DatePicker
//           className="w-25"
//           format={format}
//           placeholder="Select date"
//         />
//         {/* <div style={{ display: "flex", alignItems: "center" }}> */}
//         <Input className="w-25 mr-10" placeholder="hh" maxLength={2} />
//         <Input className="w-25 mr-10" placeholder="mm" maxLength={2} />
//         <Select
//           className="w-25"
//           placeholder="AM/PM"
//           options={[
//             { value: "AM", label: "AM" },
//             { value: "PM", label: "PM" },
//           ]}
//         />
//         {/* </div> */}
//       </>
//     );
//   };
 
//   return (
//     <Form.Item
//       name={name}
//       label={<strong>{label}</strong>}
//       rules={[
//         {
//           required,
//           message,
//         },
//       ]}
//     >
//       {getPicker()}
//     </Form.Item>
//   );
};
 

SurveyDateTimeComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    message: PropTypes.string,
    type: PropTypes.oneOf(["date", "time", "datetime"]),
    format: PropTypes.string,
  }).isRequired,
};

export const SurveyFileUploadQuestion = ({ question, disabled }) => {
  debugger;
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleOpenUploadModal = () => {
    setIsCameraModalVisible(true);
  };

  const handleUploadDone = () => {
    console.log("Uploaded files:", fileList);
    setIsCameraModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleOpenUploadModal} disabled={disabled}>Choose File</Button>

      <CommonEasUpload
        multiple={question?.valuesData?.allowMultiple || false}
        isCameraModalVisible={isCameraModalVisible}
        setisCameraModalVisible={setIsCameraModalVisible}
        fileList={fileList}
        setFileList={setFileList}
        acceptFiles={question?.valuesData?.allowedFileTypes} // e.g., ["pdf", "png"]
        limit={question?.valuesData?.limit} // e.g., 2
        fileSize={question?.valuesData?.fileSize} // e.g., 5000000 for 5MB
        onOk={handleUploadDone}
        onCancel={() => setIsCameraModalVisible(false)}
        readOnlyFlg={question?.readOnlyFlg}
        containerName={question?.containerName}
        pageFlag={question?.pageFlag}
        fileNameStr={question?.fileNameStr}
        //handleBeforeUpload={(file) => true} // Optional validation
      />
    </>
  );
};

export const SurveyRankingQuestion = ({ question, onChange, disabled }) => {
    debugger
  const initialItems =
    question?.valuesData?.options?.map((opt) => opt.value) || [];
  const [rankingItems, setRankingItems] = useState(initialItems);

  const moveItem = (index, direction) => {
    const newItems = [...rankingItems];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[index],
    ];
    setRankingItems(newItems);
  };

  return (
    <div>
      {/* <h4>{question.label}</h4> */}
      <ReactSortable
        tag="ul"
        list={rankingItems}
        setList={setRankingItems}
        animation={200}
        className="list-group"
        disabled={disabled}
      >
        {rankingItems?.map((item, index) => (
          <li
            key={index}
            className="list-group-item bg-light border mb-2 p-2 rounded shadow-sm d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <DragOutlined className="me-2" />
              {item}
            </div>
            <div className="d-flex gap-1">
              <Button
                icon={<UpOutlined />}
                disabled={index === 0 || disabled}
                onClick={() => moveItem(index, -1)}
              />
              <Button
                icon={<DownOutlined />}
                disabled={index === rankingItems.length - 1 || disabled}
                onClick={() => moveItem(index, 1)}
              />
            </div>
          </li>
        ))}
      </ReactSortable>
    </div>
  );
};

SurveyRankingQuestion.propTypes = {
  question: PropTypes.shape({
    label: PropTypes.string,
    valuesData: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    }),
  }),
  //   onChange: PropTypes.func // optional callback to send updated order
};

export const MultipleChoiceQuestion = ({ props }) => {
  const {
    name,
    options,
    required,
    message,
    allowMultiple = false,
    addOther = false,
    otherLabel = "Other",
  } = props;

  const [otherText, setOtherText] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (checkedValues) => {
    setSelectedValues(checkedValues);
  };

  const handleRadioChange = (e) => {
    setSelectedValues([e.target.value]);
  };

  const renderOptions = () => {
    const optionElements = options?.map((option, index) => {
      const value = option.value || option;
      const label = option.label || option;

      if (allowMultiple) {
        return (
          <Checkbox key={index} value={value}>
            {label}
          </Checkbox>
        );
      } else {
        return (
          <Radio key={index} value={value}>
            {label}
          </Radio>
        );
      }
    });

    if (addOther) {
      if (allowMultiple) {
        optionElements.push(
          <Checkbox key="other" value="__other__">
            {otherLabel}
            {selectedValues.includes("__other__") && (
              <Input
                placeholder="Please specify"
                style={{ marginTop: 8 }}
                onChange={(e) => setOtherText(e.target.value)}
              />
            )}
          </Checkbox>
        );
      } else {
        optionElements.push(
          <Radio key="other" value="__other__">
            {otherLabel}
            {selectedValues.includes("__other__") && (
              <Input
                placeholder="Please specify"
                style={{ marginTop: 8 }}
                onChange={(e) => setOtherText(e.target.value)}
              />
            )}
          </Radio>
        );
      }
    }

    return optionElements;
  };

  return (
    <Form.Item
      name={name}
      rules={
        required
          ? [
              {
                required: true,
                message: message || "This question is required",
              },
            ]
          : []
      }
    >
      {allowMultiple ? (
        <Checkbox.Group value={selectedValues} onChange={handleCheckboxChange}>
          {renderOptions()}
        </Checkbox.Group>
      ) : (
        <Radio.Group value={selectedValues[0]} onChange={handleRadioChange}>
          {renderOptions()}
        </Radio.Group>
      )}
    </Form.Item>
  );
};

MultipleChoiceQuestion.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired, // array of strings or { label, value }
    required: PropTypes.bool,
    message: PropTypes.string,
    allowMultiple: PropTypes.bool,
    addOther: PropTypes.bool,
    otherLabel: PropTypes.string,
  }),
};

export const DropdownComp = ({ props }) => {
    debugger
  const {
    name,
    label,
    required,
    message,
    disabled,
    initialValue,
    options = [],
    randomize = "none",
    noneOption = false,
    noneLabel = "None of the above",
    otherOption = false,
    otherOptionLabel = "Other",
    otherOptionType = "answerChoice",
    onChange,
    textStyle = "singleLine", // from question.valuesData
    characters = 200,
    pattern,
    patternMessage,
    line,
    question
  } = props;

  const [finalOptions, setFinalOptions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);

  useEffect(() => {
    let opts = [...options];

    // Randomize
    // if (randomize === "alpha") {
    //   opts.sort((a, b) => a.value.localeCompare(b.value));
    // } else if (randomize === "random") {
    //   opts.sort(() => Math.random() - 0.5);
    // }

    // Append none/other options
    if (noneOption) {
      opts.push({ value: "__none__", label: noneLabel });
    }
    if (otherOption) {
      opts.push({ value: "__other__", label: otherOptionLabel });
    }

    setFinalOptions(opts);
  }, [options, randomize, noneOption, otherOption, noneLabel, otherOptionLabel]);

  const handleSelectChange = (value) => {
    setShowOtherInput(value === "__other__");
    if (value !== "__other__") {
      props?.onChange?.(value);
    }
  };

  return (
    <>
      <Form.Item
        // label={label}
        name={name}
        initialValue={initialValue}
        rules={[
          {
            required,
            message: message || "This field is required",
          },
        ]}
      >
        <Select
          placeholder="Select"
          style={{ width: "100%" }}
          disabled={disabled}
          onChange={handleSelectChange}
          allowClear
        >
          {finalOptions.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label || opt.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* {showOtherInput && (
        <Form.Item
          name={`${name}_other`}
          rules={[
            {
              required: true,
              message:`Please specify: ${otherOptionLabel}`,
            },
          ]}
        >
          <Input className="my-2" placeholder={otherOptionLabel}  />
        </Form.Item>
      )} */}

      {showOtherInput && otherOption && otherOptionType == "commentField" && (
        <div className="mt-2">
          {/* <label htmlFor={`${name}_other`}>
            {otherOptionLabel || "Other (please specify):"}
          </label> */}

          {textStyle === "singleLine" ? (
            <InputComp
              props={{
                name: `${name}_other`,
                required: true,
                message: `Please enter ${otherOptionLabel || "Other value"}`,
                maxLength: characters || 200,
                pattern: pattern || null,
                patternMessage: patternMessage || `Invalid input for ${label}`,
                autoComplete: "off",
                size: "small",
              }}
            />
          ) : (
            <TextareaComp
              props={{
                name: `${name}_other`,
                required: true,
                message: `Please enter ${otherOptionLabel || "Other value"}`,
                row: line || null,
                maxLength: characters || 500,
                pattern: pattern || null,
                patternMessage: patternMessage || `Invalid input for ${label}`,
                autoComplete: "off",
                size: "large",
              }}
            />
          )}
            </div>
      )}
    </>
  );
};

DropdownComp.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    message: PropTypes.string,
    disabled: PropTypes.bool,
    initialValue: PropTypes.string,
    randomize: PropTypes.oneOf(["none", "alpha", "random"]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    noneOption: PropTypes.bool,
    noneLabel: PropTypes.string,
    otherOption: PropTypes.bool,
    otherOptionLabel: PropTypes.string,
    onChange: PropTypes.func,
  }),
};

