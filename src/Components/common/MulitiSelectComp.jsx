import React from "react";
import { AutoComplete, Form, Select } from "antd";
import { Asterisk } from "../../constants/AsteriskConstant";
import { CaretDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export const MultiSelectComp = ({
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
    props?.suffixIcon === undefined ? (
      <CaretDownOutlined style={{ pointerEvents: "none" }} />
    ) : (
      props?.suffixIcon
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

  const handleCityChange = (value, option) => {
    debugger
    const { form, optArray, setOptArray, objname, isCity } = props;
      if (selectAll && selectAll === true) {
        if (value[0] == "0") {
          value = Array.isArray(value) ? value.filter((x) => x != "0") : "0";
        }
        if (value?.length === 0) {
          value = "0";
        } else if (value.includes("-1")) {
          if(optArray[objname]?.length > 2){
            const allValues = optArray[objname]?.map((obj) => obj.value);
            value = allValues?.filter((x) => x != "-1");
            if(isCity){
              value = allValues?.filter((x) => x != "-1" && x != "0")
            }
            let updatedOptArray = optArray[objname]?.map((item) => {
              if (item.value == "-1") {
                return { ...item, value: "-2" };
              }
              return item;
            });
            setOptArray((prev) => ({
              ...prev,
              [objname]: updatedOptArray,
            }));
          } else {
            value = ['-1']
          }
        } else if (value.includes("-2")) {
          value = "0";
          let updatedOptArray = optArray[objname]?.map((item) => {
            if (item.value == "-2") {
              return { ...item, value: "-1" };
            }
            return item;
          });
          setOptArray((prev) => ({
            ...prev,
            [objname]: updatedOptArray,
          }));
        } else {
          const allSelectedValues = optArray[objname]
            .map((obj) => obj.value)
            .filter((x) => x != "-1" && x != "-2");
          const allSelected = allSelectedValues.every((item) =>
            value.includes(item)
          );
  
          if (!allSelected) {
            const role = optArray[objname].filter(
              (x) => x.value != "-1" && x.value != "-2"
            );
            role?.unshift({ value: "-1", label: "Select All" });
            setOptArray((prev) => ({
              ...prev,
              [objname]: role,
            }));
          }
          value = value.filter((v) => v != "-1" && v != "-2");
        }
  
        form?.setFieldsValue({ [objname]: value });
      } else {
        if(value[0] == 0 || value.length == 0){
          value = Array.isArray(value) ? value.filter((x) => x != "0") : "0";
          if(value?.length === 0) {
            value = "0";
          } else {
            const role = optArray[objname]
            if(value?.length > 0){
              setOptArray((prev) => ({
                ...prev,
                [objname]: role,
              }))
            }
          }
        }
        form?.setFieldsValue({ [objname]: value} );
      }
    if (props?.onChange) {
      props?.onChange(value, option);
    }
  };

  const handleMultipleChange = (value, option) => {
    debugger;
    const { form, optArray, setOptArray, name, objname } = props;
    console.log("props data", props, optArray);
    if (selectAll && selectAll === true) {
      if (value[0] == "0") {
        value = Array.isArray(value) ? value.filter((x) => x != "0") : "0";
      }
      if (value?.length === 0) {
        value = "0";
      } else if (value.includes("-1")) {
        const allValues = optArray[objname]?.map((obj) => obj.value);
        value = allValues?.filter((x) => x != "-1");
        let updatedOptArray = optArray[objname]?.map((item) => {
          if (item.value == "-1") {
            return { ...item, value: "-2" };
          }
          return item;
        });
        // setOptArray(updatedOptArray);
        setOptArray((prev) => ({
          ...prev,
          [objname]: updatedOptArray,
        }));
      } else if (value.includes("-2")) {
        value = "0";
        let updatedOptArray = optArray[objname]?.map((item) => {
          if (item.value == "-2") {
            return { ...item, value: "-1" };
          }
          return item;
        });
        // setOptArray(updatedOptArray);
        setOptArray((prev) => ({
          ...prev,
          [objname]: updatedOptArray,
        }));
      } else {
        const allSelectedValues = optArray[objname]
          .map((obj) => obj.value)
          .filter((x) => x != "-1" && x != "-2");
        const allSelected = allSelectedValues.every((item) =>
          value.includes(item)
        );

        if (!allSelected) {
          const role = optArray[objname].filter(
            (x) => x.value != "-1" && x.value != "-2"
          );
          role?.unshift({ value: "-1", label: "Select All" });
          // setOptArray(role);
          setOptArray((prev) => ({
            ...prev,
            [objname]: role,
          }));
        }
        value = value.filter((v) => v != "-1" && v != "-2");
      }

      form?.setFieldsValue({ [objname]: value });
    } else {
      if(value[0] == 0 || value.length == 0){
        value = Array.isArray(value) ? value.filter((x) => x != "0") : "0";
        if(value?.length === 0) {
          value = "0";
        } else {
          const role = optArray[objname]
          if(value?.length > 0){
            setOptArray((prev) => ({
              ...prev,
              [objname]: role,
            }))
          }
        }
      }
      form?.setFieldsValue({ [objname]: value} );
    }

    if (props?.onChange) {
      props?.onChange(value, option);
    }
  };

  console.log(props, 'Props');

  return (
    <Form.Item
      initialValue={props?.initialvalues}
      label={props?.label}
      name={props?.name}
      rules={validationRules}
    >
      {optionWise ? (
        <>
          {fieldLabel && (
            <label htmlFor={props?.name} className="FormLabel">
              {fieldLabel} {props?.required ? <Asterisk /> : null}
            </label>
          )}
          <Select
            defaultValue={props?.defaultValue}
            style={props?.style}
            size={props?.size}
            value={props?.value}
            className={props?.className}
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
            mode={props?.mode}
            tokenSeparators={props?.seperator}
            onChange={props?.onChange}
            maxTagCount={props?.maxTagCount}
            onBlur={props?.onBlur}
            showSearch={props?.allowSearch || props?.showSearch}
            placeholder={props?.placeholder}
            disabled={props?.disabled}
            allowClear={props?.allowClear}
            maxTagTextLength={props?.maxTagTextLength}
            maxCount={props?.maxCount}
            dropdownRender={props?.dropdownRender}
            suffixIcon={suffixIconValue}
            id={props?.id || `textitem_${props?.name}`}
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
            <label htmlFor={props?.name} className="FormLabel">
              {fieldLabel} {props?.required ? <Asterisk /> : null}
            </label>
          )}
          <Select
            defaultValue={props?.defaultValue}
            options={props?.options}
            style={props?.style}
            size={props?.size}
            value={props?.value}
            className={props?.className}
            filterOption={(input, option) => {
              if (option?.label && input) {
                return option.label.toLowerCase().includes(input.toLowerCase());
              }
              return false;
            }}
            mode={props?.mode}
            tokenSeparators={props?.seperator}
            onChange={
              props?.mode == "multiple" 
                ? props?.isCity ? handleCityChange : handleMultipleChange
                // ? props?.objname == "citycode" ? handleCityChange : handleMultipleChange
                : props?.onChange
            }
            maxTagCount={props?.maxTagCount || 1}
            onBlur={props?.onBlur}
            onSearch={props?.onSearch}
            showSearch={true}
            placeholder={props?.placeholder}
            disabled={props?.disabled}
            allowClear={props?.allowClear}
            maxTagTextLength={props?.maxTagTextLength}
            maxCount={props?.maxCount}
            dropdownRender={props?.dropdownRender}
            objname={props?.objname}
            isCity={props?.isCity}
            suffixIcon={suffixIconValue}
            id={props?.id || `textitem_${props?.name}`}
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

MultiSelectComp.propTypes = {
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
  objname: PropTypes.string,
  isCity : PropTypes.string
};
