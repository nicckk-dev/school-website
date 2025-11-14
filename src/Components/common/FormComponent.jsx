import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  Divider,
  Radio,
  DatePicker,
  AutoComplete,
  Collapse,
  Empty,
  Button,
  Upload,
  Table,
  Image,
  TimePicker,
  Tabs,
  Modal,
  message,
  List,
  Switch,
  InputNumber,
  Form,
  Input,
  Skeleton,
} from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { SelectComp } from "./SelectComp";
import "../../assets/css/style.scss";
const { TextArea } = Input;

export const InputComp = ({ props, conditionalProps }) => {
  const { pattern, patternMessage, onKeyPress } = props;
  return (
    <Form.Item
      help={props.help}
      validateStatus={props.validateStatus}
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        { required: props.required, message: props.message },
        {
          pattern: pattern ? new RegExp(pattern) : "",
          message: patternMessage || "", // Use patternMessage if provided, otherwise use a default message
        },
        {
          type: props.typeerror,
          message: props.typemessage,
        },
      ]}
    >
      <Input
        type={props.type}
        placeholder={props.placeholder}
        size={props.size}
        style={props.style}
        width={props.width}
        height={props.height}
        className={props.className}
        maxLength={props.maxLength}
        minLength={props.minLength}
        id={props.id || `textitem_${props?.name}`}
        defaultValue={props.defaultValue}
        value={props.value}
        onKeyPress={onKeyPress}
        pattern={props.pattern}
        disabled={props.disabled}
        max={props.max}
        prefix={props.prefix}
        suffix={props.suffix}
        allowClear={props.allowClear}
        onChange={props.onChange}
        onBlur={props.onBlur}
        readOnly={props.readOnly}
        autoComplete={props.autoComplete}
        onKeyUp={props.onkeyup}
        onKeyDown={props.onkeydown}
        onInput={props.oninput}
        onPaste={props.onpaste}
      />
    </Form.Item>
  );
};

// Define prop types
InputComp.propTypes = {
  props: PropTypes.object,
  help: PropTypes.string,
  validateStatus: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  message: PropTypes.string,
  pattern: PropTypes.string,
  patternMessage: PropTypes.string,
  onKeyPress: PropTypes.func,
  type: PropTypes.string,
  typemessage: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  defaultValue: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  allowClear: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.string,
  onkeyup: PropTypes.func,
  onkeydown: PropTypes.func,
  oninput: PropTypes.func,
  onpaste: PropTypes.func,
  conditionalProps: PropTypes.object,
  typeerror: PropTypes.string,
};

// Default props
InputComp.defaultProps = {
  required: false,
  allowClear: true,
  autoComplete: "off",
  type: "",
  message: "",

  conditionalProps: {},
};

export const InputPassword = ({ props, conditionalProps }) => {
  const { pattern, patternMessage, onKeyPress } = props;

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the paste action
  };
  return (
    <Form.Item
      help={props.help}
      validateStatus={props.validateStatus}
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        { required: props.required, message: props.message },
        {
          pattern: pattern ? new RegExp(pattern) : "",
          message: patternMessage || "", // Use patternMessage if provided, otherwise use a default message
        },
      ]}
    >
      <Input.Password
        type={props.type}
        placeholder={props.placeholder}
        size={props.size}
        style={props.style}
        width={props.width}
        height={props.height}
        className={props.className}
        maxLength={props.maxLength}
        minLength={props.minLength}
        defaultValue={props.defaultValue}
        value={props.value}
        onKeyPress={onKeyPress}
        pattern={props.pattern}
        disabled={props.disabled}
        max={props.max}
        prefix={props.prefix}
        suffix={props.suffix}
        allowClear={props.allowClear}
        onChange={props.onChange}
        onBlur={props.onBlur}
        readOnly={props.readOnly}
        autoComplete={props.autoComplete}
        onKeyUp={props.onkeyup}
        onKeyDown={props.onkeydown}
        onInput={props.oninput}
        onPaste={handlePaste}
        iconRender={props.iconRender}
        visibilityToggle={props.visibilityToggle}
      />
    </Form.Item>
  );
};

// Define prop types
InputPassword.propTypes = {
  props: PropTypes.object,
  help: PropTypes.string,
  validateStatus: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  message: PropTypes.string,
  pattern: PropTypes.string,
  patternMessage: PropTypes.string,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  allowClear: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.string,
  onkeyup: PropTypes.func,
  onkeydown: PropTypes.func,
  oninput: PropTypes.func,
  iconRender: PropTypes.func,
  visibilityToggle: PropTypes.bool,

  conditionalProps: PropTypes.object,
  type: PropTypes.string,
};

// Default props
InputPassword.defaultProps = {
  required: false,
  allowClear: true,
  visibilityToggle: true,
  autoComplete: "off",

  conditionalProps: {},
};

export const InputNumberComp = ({ props }) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      // rules={[{ required: props.required, message: props.message }]}
      initialValue={props.initialValue}
      rules={[
        { required: props.required, message: props.message },
        // {
        //   type: props.typeerror,
        //   message: props.typemessage,
        // },
      ]}
    >
      <InputNumber
        type="number"
        size={props.size}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        min={props.min || 0}
        max={props.max || 10}
        value={props.value}
        onChange={props.onChange}
        style={props.style}
        className={props.className}
        maxLength={props.maxLength}
        minLength={props.minLength}
        disabled={props.disabled}
        id={props.id || `textitem_${props?.name}`}
      />
    </Form.Item>
  );
};

InputNumberComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  message: PropTypes.string,
  initialValue: PropTypes.any,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.number,

  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  id: PropTypes.any,
};

// Default props
InputNumberComp.defaultProps = {
  required: false,
  message: "",
  min: 1,
  max: 10,
};

export const TextareaComp = ({ props, conditionalProps }) => {
  const { pattern, patternMessage } = props;

  return (
    <Form.Item
      help={props.help}
      validateStatus={props.validateStatus}
      label={props.label}
      initialValue={props.initialValue}
      name={props.name}
      rules={[
        { required: props.required, message: props.message },
        {
          pattern: pattern ? new RegExp(pattern) : "",
          message: patternMessage || "", // Use patternMessage if provided, otherwise use a default message
        },
        {
          type: props.typeerror,
          message: props.typemessage,
        },
      ]}
    >
      <TextArea
        value={props.value}
        maxLength={props.maxLength}
        minLength={props.minLength}
        placeholder={props.placeholder}
        readOnly={props?.readOnly}
        style={props.style}
        disabled={props.disabled}
        status={false ? "error" : ""}
        rows={props.rows}
        size={props.size}
        autoSize={props.autoSize}
        className={props.className}
        onChange={props.onChange}
        onKeyUp={props.onkeyup}
        onKeyDown={props.onkeydown}
        onInput={props.oninput}
        onPaste={props.onpaste}
        onBlur={props.onBlur}
        id={props.id || `textitem_${props?.name}`}
        {...conditionalProps}
      />
    </Form.Item>
  );
};

// PropTypes validation
TextareaComp.propTypes = {
  props: PropTypes.object,
  help: PropTypes.string,
  validateStatus: PropTypes.string,
  label: PropTypes.string,
  initialValue: PropTypes.any,
  name: PropTypes.string,
  required: PropTypes.bool,
  message: PropTypes.string,
  pattern: PropTypes.string,
  patternMessage: PropTypes.string,
  typeerror: PropTypes.string,
  typemessage: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.string,
  autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onkeyup: PropTypes.func,
  onkeydown: PropTypes.func,
  oninput: PropTypes.func,
  onpaste: PropTypes.func,
  onBlur: PropTypes.func,
  conditionalProps: PropTypes.object,
};

// Default props
TextareaComp.defaultProps = {
  required: false,
  disabled: false,
  rows: 4,
  size: "default",
  autoSize: false,
  conditionalProps: {},
};
// CheckBox
export const CheckboxComp = ({
  props,
  conditionalProps,
  group = false,
  checkallbtn = false,
  divider = true,
}) => {
  const defaultValue = ["Kane"];
  const [checkedList, setCheckedList] = useState(defaultValue);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < props.options.length);
    setCheckAll(list.length === props.options.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? props.options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      {group ? (
        checkallbtn ? (
          <>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
              style={props.checkAllStyle}
              disabled={props.disabled}
            >
              CheckAllBtn
            </Checkbox>
            {divider ? <Divider /> : null}
            <Checkbox.Group
              options={props.options}
              value={checkedList}
              onChange={onChange}
              style={props.checkStyle}
              className={props.className}
              disabled={props.disabled}
            />
          </>
        ) : (
          <Checkbox.Group
            options={props.options}
            value={props.value}
            checked={props.checked}
            onChange={props.onChange}
            style={props.checkStyle}
            className={props.className}
            disabled={props.disabled}
          />
        )
      ) : (
        <Checkbox
          {...conditionalProps}
          style={props.style}
          className={props.className}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.content}
        </Checkbox>
      )}
    </Form.Item>
  );

  // {props}:
  // name: name
  // value: value
  // indeterminate: indeterminate checked
  // options: options for group-level Checkbox
  // group: true for Group level Checkbox
  // label: Checkbox label
  // checkbtn: Component with "Check-all Button" property

  // {conditionalProps}
  // disabled: disabling
};

// PropTypes validation
CheckboxComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.array,
  required: PropTypes.bool,
  message: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string), // For group-level checkboxes
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onChange: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  checkAllStyle: PropTypes.object,
  checkStyle: PropTypes.object,
  content: PropTypes.node,

  conditionalProps: PropTypes.object,
  group: PropTypes.bool,
  checkallbtn: PropTypes.bool,
  divider: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};

// Default props
CheckboxComp.defaultProps = {
  required: false,
  options: [],
  checkAllStyle: {},
  checkStyle: {},

  conditionalProps: {},
  group: false,
  checkallbtn: false,
  divider: true,
};

// RadioButton
export const RadioComp = ({
  props,
  conditionalProps,
  group = true,
  radioStyle = false,
}) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      {group ? (
        radioStyle ? (
          <Radio.Group
            name={props.name}
            size={props.size}
            buttonStyle={props.buttonStyle}
            style={props.style}
            className={props.className}
            onChange={props.onChange}
            {...conditionalProps}
          >
            {props.options.map((op, index) => (
              <Radio.Button value={op} key={index}>
                {op}
              </Radio.Button>
            ))}
          </Radio.Group>
        ) : (
          <Radio.Group
            name={props.name}
            buttonStyle={props.buttonStyle}
            style={props.style}
            className={props.className}
            options={props.options}
            onChange={props.onChange}
            disabled={props.disabled}
            {...conditionalProps}
          />
        )
      ) : (
        <Radio
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          style={props.style}
          className={props.className}
          {...conditionalProps}
        >
          {props.content}
        </Radio>
      )}
    </Form.Item>
  );

  // Props
  // name: name
  // value: value
  // options: options for Group Radio
  // group: true for Group-level Radio
  // radioStyle: true for Radio Styling, default is false for normal radio
  // buttonStyle: {solid,outline}

  // ConditionalProps
  // disabled: disabling
};

// PropTypes Validation
RadioComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  message: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ])
  ),
  size: PropTypes.oneOf(["small", "middle", "large"]),
  buttonStyle: PropTypes.oneOf(["solid", "outline"]),
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.node,

  conditionalProps: PropTypes.object,
  group: PropTypes.bool,
  radioStyle: PropTypes.bool,
};

// Default Props
RadioComp.defaultProps = {
  required: false,
  options: [],
  size: "middle",
  buttonStyle: "outline",

  conditionalProps: {},
  group: true,
  radioStyle: false,
};

// DatePicker
export const DatePickerComp = ({
  props,
  conditionalProps,
  range = false,
  switchPick = false,
  minDate,
  maxDate,
}) => {
  const [pick, setPick] = useState("date");

  const handleSwitch = (e) => {
    // console.log(e)
    setPick(e);
  };

  const disabledDate = (current) => {
    return current && (current < minDate || current > maxDate);
  };

  // console.log(props.value)

  const selectProps = {
    options: [
      { value: "date", label: "Date" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
      { value: "quarter", label: "Quarter" },
      { value: "year", label: "Year" },
    ],
    onChange: handleSwitch,
    style: { width: 100 },
    size: "large",
  };

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      {range ? (
        switchPick ? (
          <div style={{ display: "flex" }}>
            <SelectComp props={selectProps} />
            <DatePicker.RangePicker
              onChange={props.onChange}
              value={props.value}
              format={props.format}
              placement={props.placement}
              style={props.style}
              picker={pick}
              onOpenChange={props.onOpenChange}
              onOk={props.onOk}
              status={props.status}
              inputReadOnly
              size={props.size}
              readOnly={props.readOnly}
              defaultValue={props.defaultValue}
              {...conditionalProps}
            />
          </div>
        ) : (
          <DatePicker.RangePicker
            size={props.size}
            onChange={props.onChange}
            value={props.value}
            format={props.format}
            placement={props.placement}
            style={props.style}
            picker={props.picker}
            onOpenChange={props.onOpenChange}
            onOk={props.onOk}
            status={props.status}
            disabledDate={(current) => disabledDate(current)}
            {...conditionalProps}
            readOnly={props.readOnly}
            defaultValue={props.defaultValue}
          />
        )
      ) : switchPick ? (
        <div style={{ display: "flex" }}>
          <SelectComp props={selectProps} />
          <DatePicker
            onChange={props.onChange}
            onOpenChange={props.onOpenChange}
            onOk={props.onOk}
            status={props.status}
            format={props.format}
            style={props.style}
            picker={pick}
            size={props.size}
            disabledDate={(current) => disabledDate(current)}
            {...conditionalProps}
          />
        </div>
      ) : (
        <DatePicker
          onChange={props.onChange}
          size={props.size}
          format={props.format}
          placement={props.placement}
          style={props.style}
          picker={props.picker}
          onOpenChange={props.onOpenChange}
          defaultValue={props.defaultValue}
          value={props.value}
          onOk={props.onOk}
          status={props.status}
          className={props.className}
          allowClear={false}
          showTime={props?.showTime}
          disabledDate={props.disabledDate || disabledDate}
          defaultPickerValue={props.defaultPickerValue}
          inputReadOnly
          placeholder={props?.placeholder}
          readOnly={props.readOnly}
          disabled={props.disabled}
          id={props.id || `textitem_${props?.name}`}
          {...conditionalProps}
        />
      )}
    </Form.Item>
  );

  // props
  // range: true to make it RangePicker
  // switchPick: true to make it to Switch Mode
  // size: size of input
  // picker: picker type(time,date,week,month,quarter,year)
  // format: Date Format
};

// Define prop types
DatePickerComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  message: PropTypes.string,
  onChange: PropTypes.func,
  onOpenChange: PropTypes.func,
  onOk: PropTypes.func,
  value: PropTypes.any,
  format: PropTypes.string,
  placement: PropTypes.string,
  style: PropTypes.object,
  picker: PropTypes.string,
  size: PropTypes.string,
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  showTime: PropTypes.bool,
  disabledDate: PropTypes.func,
  defaultPickerValue: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  status: PropTypes.string,

  conditionalProps: PropTypes.object,
  range: PropTypes.bool,
  switchPick: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  id: PropTypes.any,
};

export const AutoCompleteComp = ({ props, conditionalProps }) => {
  const [defaultOpen, setDefaultOpen] = useState(false);

  const handleSearch = (value) => {
    if (value.length <= 2) {
      setDefaultOpen(false);
    } else {
      setDefaultOpen(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter") {
      setDefaultOpen(false);
    }
  };

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      <AutoComplete
        placeholder={props.placeholder}
        style={props.style}
        className={props.className}
        options={props.options}
        filterOption={(inputValue, option) =>
          option.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        size={props.size}
        open={defaultOpen}
        onSearch={handleSearch}
        onChange={props.onChange}
        onSelect={() => setDefaultOpen(false)}
        onFocus={props.onFocus}
        onKeyUp={handleKeyUp}
        notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        id={props.id || `textitem_${props?.name}`}
        {...conditionalProps}
      />
    </Form.Item>
  );

  // Props:
  // className: className
  // options: options for autocomplete dropdown
  // filterOption & open & handleSearch: made-up properties that will work only after options
};

// PropTypes Validation
AutoCompleteComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
    })
  ),
  size: PropTypes.oneOf(["small", "middle", "large"]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  id: PropTypes.any,
  conditionalProps: PropTypes.object,
};

// Default Props
AutoCompleteComp.defaultProps = {
  required: false,
  placeholder: "Start typing...",
  style: {},
  options: [],
  size: "middle",

  conditionalProps: {},
};

export const CollapseComp = ({ props, conditionalProps }) => {
  return (
    <Collapse
      items={props.items}
      defaultActiveKey={props.defaultActiveKey}
      activeKey={props.activeKey}
      collapsible={props.collapsible}
      accordion={props.accordion}
      onChange={props.onChange}
      expandIcon={props.expandIcon}
      expandIconPosition={props.expandIconPosition}
      className={props.className}
      style={props.style}
      {...conditionalProps}
    />
  );

  // props
  // items: items for panels. extra parameters: {extra,showArrow}
  // defaultActiveKey: default active key
  // collapsible: {header,icon,default}
  // accordion: true to select one panel at a time
  // expandIcon: expand ANOTHER ICON
  // expandIconPosition: Position of expand icon {start/end/left/right}
};

// PropTypes Validation
CollapseComp.propTypes = {
  props: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      children: PropTypes.node,
      extra: PropTypes.node,
      showArrow: PropTypes.bool,
    })
  ),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  collapsible: PropTypes.oneOf(["header", "icon", "disabled"]),
  accordion: PropTypes.bool,
  onChange: PropTypes.func,
  expandIcon: PropTypes.func,
  expandIconPosition: PropTypes.oneOf(["start", "end", "left", "right"]),
  className: PropTypes.string,
  style: PropTypes.object,

  conditionalProps: PropTypes.object,
};

// Default Props
CollapseComp.defaultProps = {
  defaultActiveKey: null,
  activeKey: null,
  collapsible: "header",
  accordion: false,
  expandIconPosition: "end",
  className: "",
  style: {},

  conditionalProps: {},
};

export const ButtonComp = ({ props, conditionalProps, formItem }) => {
  return formItem ? (
    <Form.Item>
      <Button
        style={props.style}
        className={props.className}
        type={props.type}
        icon={props.icon}
        shape={props.shape}
        size={props.size}
        loading={props.loading}
        htmlType={props.htmlType}
        href={props.href}
        onClick={props.onClick}
        onMouseOver={props.onMouseOver}
        {...conditionalProps}
      >
        {props.label}
      </Button>
    </Form.Item>
  ) : (
    <Button
      style={props.style}
      className={props.className}
      type={props.type}
      icon={props.icon}
      shape={props.shape}
      size={props.size}
      loading={props.loading}
      htmlType={props.htmlType}
      href={props.href}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      {...conditionalProps}
    >
      {props.label}
    </Button>
  );

  // props:
  // type: {primary,dashed,text,link}
  // icon: icon on button
  // label: button text
  // shape: shape of button {default,circle,round}

  // ConditionalProps:
  // block: fit button width to its parent
  // disabled: disabled
  // danger: danger background
};

ButtonComp.propTypes = {
  props: PropTypes.object,
  type: PropTypes.oneOf(["primary", "dashed", "text", "link"]),
  icon: PropTypes.node,
  label: PropTypes.string,
  shape: PropTypes.oneOf(["default", "circle", "round"]),
  size: PropTypes.oneOf(["small", "middle", "large"]),
  loading: PropTypes.bool,
  htmlType: PropTypes.oneOf(["button", "submit", "reset"]),
  href: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,

  conditionalProps: PropTypes.object,
  formItem: PropTypes.bool,
};

// Default Props
ButtonComp.defaultProps = {
  type: "default", // Default button type
  size: "middle", // Default size
  shape: "default", // Default shape
  loading: false, // Not loading by default
  htmlType: "button", // Default to 'button'

  conditionalProps: {},
  formItem: false,
};

export const UploadComp = ({
  props,
  fileType = null,
  updatedList,
  showPreview = false,
  fileSizeException = true,
  needOnChange = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const getPromiseBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) =>
        reject(new Error(error.message || "Request failed"));
    });
  };

  const beforeUpload = (file) => {
    const isImgType = fileType.find((type) => type === file.type);
    // console.log('isImgType', isImgType)
    const isLimit5MB = fileSizeException; // file.size <= 5000000
    let fileExt;
    if (fileType !== null) {
      fileType.forEach((f) => {
        if (
          f ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          fileExt = ".xlsx,";
        } else if (f === "application/vnd.ms-excel") {
          fileExt += ".xls,";
        } else if (f === "application/pdf") {
          fileExt += ".pdf,";
        } else if (f === "application/msword") {
          fileExt += ".doc,";
        } else if (
          f ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          fileExt += ".docx,";
        } else if (f === "text/csv") {
          fileExt += ".csv,";
        }
      });
    }

    if (isImgType === undefined) {
      message.error(`Please upload only ${fileExt} file...!`);
    }
    if (!isLimit5MB) {
      message.error("Please upload file smaller than 5MB...!");
    }

    return isImgType === undefined && isLimit5MB;
  };

  const handleChange = (info) => {
    let newList = [...info.fileList];

    newList = newList.filter((list) => {
      return fileType.indexOf(list.type) >= 0 && fileSizeException;
    });

    setFileList(newList);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        console.log("imgurl", imageUrl);
      });
    } else {
      setLoading(false);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getPromiseBase64(file.originFileObj);
    }
    setPreviewImage(file.thumbUrl || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadBtn = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      {showPreview ? (
        <>
          <Upload
            customRequest={({ file, onSuccess, onError }) => {
              setTimeout(() => {
                onSuccess(); // Simulate a successful upload
              }, 1000);
            }}
            name={props.name}
            listType={"picture-card"}
            fileList={needOnChange ? props.fileList : fileList}
            beforeUpload={fileType !== null ? beforeUpload : props.beforeUpload}
            onChange={fileType !== null ? handleChange : props.onChange}
            openFileDialogOnClick={props.openFileDialogOnClick}
            accept={fileType}
            maxCount={props.maxCount}
            multiple={props.multiple ? props.multiple : false}
            showUploadList={
              updatedList
                ? {
                  showPreviewIcon: true,
                  showRemoveIcon: props.showRemoveIcon,
                  showDownloadIcon: props.showDownloadIcon,
                }
                : false
            }
            action={props.action}
            onPreview={handlePreview}
            style={props.style}
            className={props.className}
          >
            {fileType !== null ? uploadBtn : props.avatar}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </>
      ) : (
        <Upload
          name={props.name}
          // listType={'picture-card'}
          fileList={needOnChange ? props.fileList : fileList}
          beforeUpload={
            fileType !== null && needOnChange
              ? props.beforeUpload
              : fileType !== null
                ? beforeUpload
                : props.beforeUpload
          }
          customRequest={props.customRequest}
          onChange={
            fileType !== null && needOnChange
              ? props.onChange
              : fileType !== null
                ? handleChange
                : props.onChange
          }
          openFileDialogOnClick={props.openFileDialogOnClick}
          accept={fileType}
          maxCount={props.maxCount}
          multiple={props.multiple ? props.multiple : false}
          showUploadList={
            updatedList
              ? {
                showPreviewIcon: props.showPreviewIcon,
                showRemoveIcon: props.showRemoveIcon,
                showDownloadIcon: props.showDownloadIcon,
              }
              : false
          }
          action={props.action}
          style={props.style}
          className={props.className}
        >
          {props.content}
        </Upload>
      )}
    </Form.Item>
  );

  // props:
  // listType: stylesheet for upload {text,picture,picture-card,picture-circle}
  // action: Upload action
  // beforeUpload: function for before image is being upload
  // showUploadList: Show list what we have uploaded
  // maxCount: file uploading maxcount
  // openFileDialogOnClick: file opening property (boolean)
  // updatedList: whether to put updatedList Icons on not
  // showProfileIcon: profile show icon
  // showRemoveIcon: Remove List icon
  // showDownloadIcon: Download icon
};

// PropTypes for validation
UploadComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  message: PropTypes.string,
  fileList: PropTypes.array,
  beforeUpload: PropTypes.func,
  onChange: PropTypes.func,
  action: PropTypes.string,
  content: PropTypes.node,
  showPreviewIcon: PropTypes.bool,
  showRemoveIcon: PropTypes.bool,
  showDownloadIcon: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,

  fileType: PropTypes.array,
  updatedList: PropTypes.bool,
  showPreview: PropTypes.bool,
  fileSizeException: PropTypes.bool,
  needOnChange: PropTypes.bool,
  multiple: PropTypes.bool,
  maxCount: PropTypes.number,
  openFileDialogOnClick: PropTypes.func,
  customRequest: PropTypes.func,
  avatar: PropTypes.node,
};

// Default props
UploadComp.defaultProps = {
  fileType: ["image/jpeg", "image/png"],
  showPreview: false,
  fileSizeException: true,
  needOnChange: true,
};

export const TableComp = ({
  props,
  conditionalProps,
  isLoading,
  recordSize,
}) => {
  const { className } = props || {};
  return isLoading ? (
    <div>
      <div className="mb-0">
        <Skeleton.Button
          active={"active"}
          block={true}
          size={"large"}
          shape={"square"}
          className="height50"
        />
      </div>

      {Array.from({ length: recordSize }).map((_, index) => (
        <div key={`${index}~${index}`} className="col-md-12 col-12">
          <h5 className="fw-bold mb-0">
            <Skeleton.Button
              active={"active"}
              block={true}
              size={"large"}
              shape={"square"}
              className="hight32"
            />
          </h5>
        </div>
      ))}
    </div>
  ) : (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      rowSelection={props.rowSelection}
      className={className}
      size={props.size}
      summary={props?.summary}
      scroll={props.scroll}
      pagination={props.pagination === false ? false : props.pagination}
      onChange={props.onChange}
      components={props.components}
      bordered={props.bordered}
      style={props.style}
      loading={props.loading}
      id={props.id}
      rowKey={props.rowKey}
      key={props?.tableKey}
      onRow={props.onRow}
      {...conditionalProps}
    />
  );

  // props:
  // columns: columns of tables. --must have key properties like (key,title,dataIndex)
  // dataSource: data to be bind in table
  // scroll: scrolling prop. Params: {x: ..., y: ...}
  // components: override table elements of given component
  // pagination: pagination tool with position values or set to "false" to not showing pagination
  // rowSelection: {type: checkbox, onSelect(), onSelectAll()}
};

// PropTypes for validation
TableComp.propTypes = {
  props: PropTypes.object,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowSelection: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.string,
  scroll: PropTypes.object,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onChange: PropTypes.func,
  components: PropTypes.object,
  bordered: PropTypes.bool,
  style: PropTypes.object,
  loading: PropTypes.bool,
  id: PropTypes.string,
  rowKey: PropTypes.string,
  tableKey: PropTypes.string,
  conditionalProps: PropTypes.object,
  summary: PropTypes.node,
  isLoading: PropTypes.bool,
  recordSize: PropTypes.number,
};

// Default props if any
TableComp.defaultProps = {
  pagination: true,
  rowSelection: null,
  loading: false,
  bordered: false,
  style: {},
  isLoading: false,
  recordSize: 5,
};

export const ImageComp = ({ props, group = "false", previewOne = "false" }) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      {group ? (
        <Image.PreviewGroup items={props.items} onChange={props.onChange}>
          {previewOne ? (
            <Image
              src={props.src}
              alt={props.alt}
              height={props.height}
              width={props.width}
              fallback={props.fallback}
              preview={props.preview}
            />
          ) : null}
        </Image.PreviewGroup>
      ) : (
        <Image
          src={props.src}
          alt={props.alt}
          height={props.height}
          width={props.width}
          fallback={props.fallback}
          className={props.className}
          style={props.style}
          preview={false}
        />
      )}
    </Form.Item>
  );

  // props:
  // group: grouping images
  // previewOne: for starting preview image
  // srcItems: items for grouping images
  // src: image src
  // fallback: fallback image
  // preview: preview image and filters/false to not show preview
  // width & height
};

// PropTypes for validation
ImageComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  message: PropTypes.string,
  items: PropTypes.array,
  src: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  fallback: PropTypes.string,
  preview: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,

  group: PropTypes.bool,
  previewOne: PropTypes.bool,
};

// Default props for optional parameters
ImageComp.defaultProps = {
  group: false,
  previewOne: false,
};

export const TimePickerComp = ({ props, minTime, maxTime }) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      initialValue={props.initialValue}
      rules={[
        {
          required: props.required,
          message: props.message,
        },
      ]}
    >
      <TimePicker
        value={props.value}
        size={props.size}
        inputReadOnly
        className={props.className}
        // disabledTime={dayjs('9:30:00','HH:mm:ss')}
        disabledHours={props.disabledHours}
        disabledMinutes={props.disabledMinutes}
        disabledSeconds={props.disabledSeconds}
        style={props.style}
        format={props.format}
        use12Hours={props.use12Hours}
        minuteStep={props.minuteStep}
        hourStep={props.hourStep}
        secondStep={props.secondStep}
        onChange={props.onChange}
        onOpenChange={props.onOpenChange}
        onSelect={props.onSelect}
        id={props.id || `textitem_${props?.name}`}
      />
    </Form.Item>
  );

  // props:
  // format: time format
  // use12Hours: 12 hours format time
  // minute,hour,second step: steps for each
};

// PropTypes for validation
TimePickerComp.propTypes = {
  props: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.object,
  size: PropTypes.string,

  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  style: PropTypes.object,
  format: PropTypes.string,
  use12Hours: PropTypes.bool,
  minuteStep: PropTypes.number,
  hourStep: PropTypes.number,
  secondStep: PropTypes.number,
  onChange: PropTypes.func,
  onOpenChange: PropTypes.func,
  onSelect: PropTypes.func,

  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  id: PropTypes.any,
};

// Default props for optional parameters
TimePickerComp.defaultProps = {
  minTime: null,
  maxTime: null,
};

export const TabsComp = ({ props, conditionalProps }) => {
  return (
    <Tabs
      items={props.items}
      defaultActiveKey="1"
      tabPosition={props.tabPosition}
      style={props.style}
      className={props.className}
      size={props.size}
      type={props.type}
      tabBarGutter={props.tabBarGutter}
      tabBarExtraContent={props.tabBarExtraContent}
      onChange={props.onChange}
      onTabClick={props.onTabClick}
      onTabScroll={props.onTabScroll}
      {...conditionalProps}
    />
  );

  // props:
  // items: items for tabs
  // tabPosition: (top,bottom,left,right)
  // size: size of tabs
  // type: type of tabs (line,card,editable-card)
  // tabBarGutter: space between tabs
};

// Prop types for validation
TabsComp.propTypes = {
  props: PropTypes.object,
  items: PropTypes.array,
  tabPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  size: PropTypes.string,
  type: PropTypes.oneOf(["line", "card", "editable-card"]),
  tabBarGutter: PropTypes.number,
  tabBarExtraContent: PropTypes.node,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  onTabScroll: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,

  conditionalProps: PropTypes.object,
};

// Default props for optional parameters
TabsComp.defaultProps = {
  conditionalProps: {},
};

export const ListComp = ({ props }) => {
  return (
    <List
      dataSource={props.dataSource}
      size={props.size}
      className={props.className}
      style={props.style}
      header={props.header}
      footer={props.footer}
      renderItem={props.renderItem}
    />
  );
};

// Prop types for validation
ListComp.propTypes = {
  props: PropTypes.object,
  dataSource: PropTypes.array,
  size: PropTypes.oneOf(["small", "middle", "large"]),
  className: PropTypes.string,
  style: PropTypes.object,
  header: PropTypes.node,
  footer: PropTypes.node,
  renderItem: PropTypes.func,
};

// Default props for optional parameters
ListComp.defaultProps = {
  size: "middle",
  className: "",
  style: {},
  header: null,
  footer: null,
};

export const SwitchComp = ({ props, conditionalProps }) => {
  return (
    <Switch
      onChange={props.onChange}
      size={props.size}
      checkedChildren={props.checkedChildren}
      unCheckedChildren={props.unCheckedChildren}
      disabled={props.disabled}
      loading={props.loading}
      {...conditionalProps}
      checked={props.checked}
      className={props.className}
    />
  );
};

// Prop types for validation
SwitchComp.propTypes = {
  props: PropTypes.object,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["small", "default", "large"]),
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  loading: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  conditionalProps: PropTypes.object,
  disabled: PropTypes.bool,
};

// Default props for optional parameters
SwitchComp.defaultProps = {
  size: "default",
  checkedChildren: null,
  unCheckedChildren: null,
  loading: false,

  conditionalProps: {},
};

export const ModalComp = ({
  props,
  setLoading = false,
  timeout = 2000,
  conditionalProps,
}) => {
  return (
    <Modal
      title={props.title}
      open={props.open}
      footer={props.footer}
      style={props.style}
      className={props.className}
      confirmLoading={props.confirmLoading}
      onOk={props.onOk}
      onCancel={props.onCancel}
      mask={props.mask || true}
      // maskStyle={{backgroundColor: 'red'}}
      centered={props.centered}
      closeIcon={props.closeIcon}
      cancelText={props.cancelText}
      {...conditionalProps}
      width={props.width}
      closable={props.closable}
      keyboard={props.keyboard}
      height={props.height}
    >
      {props.content}
    </Modal>
  );
};

// PropTypes for validation
ModalComp.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  footer: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  mask: PropTypes.bool,
  centered: PropTypes.bool,
  closeIcon: PropTypes.node,
  cancelText: PropTypes.string,
  content: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closable: PropTypes.bool,
  keyboard: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  setLoading: PropTypes.bool,
  timeout: PropTypes.number,
  conditionalProps: PropTypes.object,
};

// Default props for optional parameters
ModalComp.defaultProps = {
  open: true,
  title: "Modal Title",
  confirmLoading: false,
  mask: true,
  centered: true,
  closable: true,
  keyboard: true,
  content: "Modal Content",
  width: 520,
  height: "auto",

  setLoading: false,
  timeout: 2000,
  conditionalProps: {},
};
