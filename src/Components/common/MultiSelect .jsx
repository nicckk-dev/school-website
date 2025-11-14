import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Select } from "antd";

const MultiSelect = ({
  options,
  onChange,
  placeholder,
  size,
  maxTagCount,
  name,
  required,
  value,
  seff,
  suffixIcon
}) => {
  const [selectedValues, setSelectedValues] = useState(value);

  const handleChange = (values) => {
    if (values.includes("all")) {
      if (selectedValues?.length === options?.length) {
        setSelectedValues([]);
        onChange?.([]);
      } else {
        const allOptionValues = options.map((opt) => opt.value);
        setSelectedValues(allOptionValues);
        onChange?.(allOptionValues);
      }
    } else {
      setSelectedValues(values);
      onChange?.(values);
    }
  };

  return (
    <Form.Item name={name}>
      <Select
        mode="multiple"
        size={size}
        placeholder={placeholder}
        className="w-100"
        value={selectedValues}
        onChange={handleChange}
        options={[{ value: "all", label: "Select All" }, ...options]}
        showSearch={true}
        filterOption={(input,option) => {
          return option.label
            .toLowerCase()
            .includes(input.toLowerCase());
        }
        }
        required={required}
        // showArrow // Keeps the dropdown arrow visible
        maxTagCount={maxTagCount} // Hides the tags and only shows selected count
        //tagRender={() => null} // Removes individual tags from the input
        allowClear={false}
        suffixIcon={suffixIcon}
      />
    </Form.Item>
  );
};

// ✅ Adding PropTypes Validation
MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  maxTagCount: PropTypes.number,
};

// ✅ Default Props
MultiSelect.defaultProps = {
  onChange: () => { },
  placeholder: "Select",
  size: "middle",
  maxTagCount: 1,
};

export default MultiSelect;
