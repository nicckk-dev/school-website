import React from "react";
import { Form, Select } from "antd";
import { Asterisk } from "../../constants/AsteriskConstant";
import { CaretDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export const SelectComp = ({
  props,
  conditionalProps,
  validator = false,
  optionWise = false,
  selectAll = false,
  fieldLabel = null,
}) => {
  const { Option } = Select;
  const validationRules = [
    {
      required: props?.required,
      message: props?.message,
    },
  ];

  const suffixIconValue =
    props.suffixIcon === undefined ? (
      <CaretDownOutlined style={{ pointerEvents: "none" }} />
    ) : (
      props.suffixIcon
    );

  if (validator) {
    validationRules.push({
      validator: (_, value) => {
        if (
          props?.required &&
          (value == "0" || value === undefined || value === "")
        ) {
          return Promise.reject(new Error(props?.message));
        }
        return Promise.resolve();
      },
    });
  }

  const handleMultipleChange = (value, option) => {
    const { form, optArray, setOptArray, name } = props;
    console.log("props", props, optArray);
    if (selectAll && selectAll === true) {
      if (value[0] == "0") {
        value = Array.isArray(value) ? value.filter((x) => x != "0") : "0";
      }
      if (value?.length === 0) {
        value = "0";
      } else if (value.includes("-1")) {
        const allValues = optArray?.map((obj) => obj.value);
        value = allValues?.filter((x) => x != "-1");
        let updatedOptArray = optArray?.map((item) => {
          if (item.value == "-1") {
            return { ...item, value: "-2" };
          }
          return item;
        });
        setOptArray(updatedOptArray);
      } else if (value.includes("-2")) {
        value = "0";
        let updatedOptArray = optArray.map((item) => {
          if (item.value == "-2") {
            return { ...item, value: "-1" };
          }
          return item;
        });
        setOptArray(updatedOptArray);
      } else {
        const allSelectedValues = optArray
          .map((obj) => obj.value)
          .filter((x) => x != "-1" && x != "-2");
        const allSelected = allSelectedValues.every((item) =>
          value.includes(item)
        );

        if (!allSelected) {
          const role = optArray.filter(
            (x) => x.value != "-1" && x.value != "-2"
          );
          role.unshift({ value: "-1", label: "Select All" });
          setOptArray(role);
        }
        value = value.filter((v) => v != "-1" && v != "-2");
      }

      form?.setFieldsValue({ [name]: value });
    }

    if (props?.onChange) {
      props?.onChange(value, option);
    }
  };

  return (
    <Form.Item
      initialValue={props.initialvalues}
      label={props.label}
      name={props.name}
      rules={validationRules}
    >
      {optionWise ? (
        <>
          {fieldLabel && (
            <label htmlFor={props.name} className="FormLabel">
              {fieldLabel} {props.required ? <Asterisk /> : null}
            </label>
          )}
          <Select
            defaultValue={props.defaultValue}
            style={props.style}
            size={props.size}
            value={props.value}
            className={props.className}
            filterOption={
              props?.allowSearch
                ? (input, option) => {
                    if (option?.label && input) {
                      return option.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }
                    return false;
                  }
                : props?.filterOption
            }
            mode={props.mode}
            tokenSeparators={props.seperator}
            onChange={props.onChange}
            maxTagCount={props.maxTagCount}
            onBlur={props.onBlur}
            showSearch={props?.allowSearch || props.showSearch}
            placeholder={props?.placeholder}
            disabled={props.disabled}
            allowClear={props.allowClear}
            maxTagTextLength={props.maxTagTextLength}
            maxCount={props.maxCount}
            dropdownRender={props.dropdownRender}
            suffixIcon={suffixIconValue}
            id={ props.id || `textitem_${props?.name}`}
            onSelect={props.onSelect}
            {...conditionalProps}
          >
            {props?.options?.map((item, index) => (
              <Option
                value={item?.value}
                key={index}
                className={item?.optClassName}
                disabled={item?.disabled}
              >
                {item?.label}
              </Option>
            ))}
          </Select>
        </>
      ) : (
        <>
          {fieldLabel && (
            <label htmlFor={props.name} className="FormLabel">
              {fieldLabel} {props.required ? <Asterisk /> : null}
            </label>
          )}
          <Select
            defaultValue={props.defaultValue}
            options={props.options}
            style={props.style}
            size={props.size}
            value={props.value}
            className={props.className}
            filterOption={(input, option) => {
              if (option?.label && input) {
                return option.label.toLowerCase().includes(input.toLowerCase());
              }
              return false;
            }}
            mode={props.mode}
            tokenSeparators={props.seperator}
            onChange={
              props?.mode == "multiple" && !!selectAll
                ? handleMultipleChange
                : props?.onChange
            }
            maxTagCount={props.maxTagCount || 1}
            onBlur={props.onBlur}
            onSearch={props.onSearch}
            showSearch={true}
            placeholder={props.placeholder}
            disabled={props.disabled}
            allowClear={props.allowClear}
            maxTagTextLength={props.maxTagTextLength}
            maxCount={props.maxCount}
            dropdownRender={props.dropdownRender}
            suffixIcon={suffixIconValue}
            id={props.id || `textitem_${props?.name}`}
            onSelect={props.onSelect}
            {...conditionalProps}
          />
        </>
      )}
    </Form.Item>
  );

  // mode: {single,multiple,tags}
  // seperator: Seperate multiple values while searching
  // showSearch: Search from options {true/false}
  // loading: loading props {true/false}
};

SelectComp.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  message: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  conditionalProps: PropTypes.object,
  fieldLabel: PropTypes.any,
  validator: PropTypes.bool,
  optionWise: PropTypes.bool,
  selectAll: PropTypes.bool,
  allowSearch: PropTypes.bool,
  showSearch: PropTypes.bool,
  initialvalues: PropTypes.any,
  size: PropTypes.string,
  optArray: PropTypes.array,
  setOptArray: PropTypes.func,
  mode: PropTypes.string,
  filterOption: PropTypes.func,
  maxTagCount: PropTypes.number,
  seperator: PropTypes.any,
  placeholder: PropTypes.any,
  maxTagTextLength: PropTypes.number,
  maxCount: PropTypes.number,
  dropdownRender: PropTypes.func,
  suffixIcon: PropTypes.node,
  options: PropTypes.array,
  form: PropTypes.object,
  id: PropTypes.any,
};
