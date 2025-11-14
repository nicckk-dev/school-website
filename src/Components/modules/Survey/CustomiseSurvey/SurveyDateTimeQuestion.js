// date time

import React, { useEffect } from "react";
import { Form, DatePicker, Input, Select } from "antd";
import getprocessOptions from "../../../../utils/SurveyRandomizeFun.js";

const SurveyDateTimeQuestion = ({ question, form, onQuestionChange }) => {
  console.log('questionquestion', question)
  const {
    id,
    identity,
    mainQuestion,
    selectedType,
    pageId,
    valuesData = {},
  } = question;
  // console.log(question);

  const type = valuesData?.type || "datetime";
  const format = valuesData?.Datetype || "MM/DD/YYYY";
  const message = valuesData?.errorMessage || "This field is required";
  const { showDateInfo, showTimeInfo } = valuesData;
  const opt = valuesData?.options?.map((data) => ({
    value: data.label,
  }));
  let options = getprocessOptions(opt || [], question?.valuesData);

  const handleDatePickerChange = (dataString, index) => {
    options[index].date = dataString;
    console.log("updated options", options);

    const payload = {
      id,
      identity,
      mainQuestion,
      answerData: selectedType,
      pageId: pageId,
      valuesData: {
        options,
        //   selectedOption: info.file.name,
        //   file: info.file,
      },
    };
    if (onQuestionChange) {
      onQuestionChange(identity, payload);
    }
  };

  const handleHourInputChange = (e, index) => {
    const value = e.target.value;
    options[index].hours = value;
    console.log(options);
    const payload = {
      id,
      identity,
      mainQuestion,
      answerData: selectedType,
      pageId: pageId,
      valuesData: {
        options,
        //   selectedOption: info.file.name,
        //   file: info.file,
      },
    };
    if (onQuestionChange) {
      onQuestionChange(identity, payload);
    }
  };
  const handleMinutesInputChange = (e, index) => {
    const value = e.target.value;
    options[index].mintues = value;
    console.log(options);
    const payload = {
      id,
      identity,
      mainQuestion,
      answerData: selectedType,
      pageId: pageId,
      valuesData: {
        options,
        //   selectedOption: info.file.name,
        //   file: info.file,
      },
    };
    if (onQuestionChange) {
      onQuestionChange(identity, payload);
    }
  };
  const handleSelectChange = (value, index) => {
    // Update current option's meridian
    options[index].meridian = value;

    // Get the latest values from the entire form
    const formValues = form.getFieldsValue();

    // Map back to your options array with full data
    const updatedOptions = options.map((opt, i) => ({
      ...opt,
      hours: formValues[`hh${i}`] || "",
      mintues: formValues[`mm${i}`] || "",
      meridian: formValues[`meridian${i}`] || opt.meridian,
      date: formValues?.dates?.[i] || opt.date
    }));

    const payload = {
      id,
      identity,
      mainQuestion,
      answerData: selectedType,
      pageId: pageId,
      valuesData: {
        options: updatedOptions
      }
    };

    if (onQuestionChange) {
      onQuestionChange(identity, payload);
    }
  };

  // const handleSelectChange = (value, index) => {
  //   console.log(value);
  //   options[index].meridian = value;
  //   console.log(options);
  //   const payload = {
  //     id,
  //     identity,
  //     mainQuestion,
  //     answerData: selectedType,
  //     pageId: pageId,
  //     valuesData: {
  //       options,
  //       //   selectedOption: info.file.name,
  //       //   file: info.file,
  //     },
  //   };
  //   if (onQuestionChange) {
  //     onQuestionChange(identity, payload);
  //   }
  // };
  const formData = form.getFieldValue()
  console.log('formDAta', formData)
  useEffect(() => {
    debugger
    if (showTimeInfo) {
      options = options.map((items) => ({
        value: items.value,
        date: "",
        hours: "",
        mintues: "",
        meridian: "",
      }));
      console.log("time info options", options);
    }
  }, []);

  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};
  console.log('configRequired', configRequired, configErrorMessage)
  return (
    <>
      {options?.map((data, index) => (
        <div className="d-flex flex-column mb-4">
          <p className="m-0 mb-2 p-0 fs-6">{data.value}</p>
          <div className="row">
            {showDateInfo && (
              <div className="col-12 col-md-5">
                <Form.Item
                  name={['dates', index]}
                  label="Date"
                  rules={[
                    {
                      required: configRequired ?? false,
                      message: configErrorMessage || "This field is required",
                    },
                  ]}
                >
                  <DatePicker
                    className=""
                    format={format}
                    placeholder="Select date"
                    onChange={(date, dateString) => {
                      handleDatePickerChange(dateString, index);
                    }}
                  />
                </Form.Item>
              </div>
            )}
            {showTimeInfo && (
              <div className="d-flex gap-3 col-12 col-md-7">
                {/* <Form.Item label="Time" name={`hh${index}`}>
                  <Input
                    type="number"
                    className=""
                    placeholder="hh"
                    // maxLength={2}
                    onChange={(e) => {
                      if (e.target.value.length <= 2) {
                        handleHourInputChange(e, index);
                      }
                    }}
                  // onChange={(e) => handleHourInputChange(e, index)}
                  />
                </Form.Item> */}
                <Form.Item label="Time" name={`hh${index}`}>
                  <Input
                    type="number"
                    placeholder="hh"
                    value={form.getFieldValue(`hh${index}`) || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, ""); // only digits
                      if (val.length > 2) val = val.slice(0, 2);   // limit to 2 digits

                      // Update the form field
                      form.setFieldsValue({ [`hh${index}`]: val });

                      // Call your handler with the sanitized value
                      handleHourInputChange({ target: { value: val } }, index);
                    }}
                  />
                </Form.Item>


                <Form.Item label="    " name={`mm${index}`}>
                  <Input
                    type="number"
                    className=""
                    placeholder="mm"
                    maxLength={2}
                    // onChange={(e) => handleMinutesInputChange(e, index)}
                    value={form.getFieldValue(`mm${index}`) || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, ""); // only digits
                      if (val.length > 2) val = val.slice(0, 2);   // limit to 2 digits

                      // Update the form field
                      form.setFieldsValue({ [`mm${index}`]: val });

                      // Call your handler with the sanitized value
                      handleMinutesInputChange({ target: { value: val } }, index);
                    }}
                  />
                </Form.Item>

                <Form.Item label="AM/PM">
                  <Select
                    className=""
                    placeholder="AM/PM"
                    options={[
                      { value: "AM", label: "AM" },
                      { value: "PM", label: "PM" },
                    ]}
                    onChange={(value) => handleSelectChange(value, index)}
                  />
                </Form.Item>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );

  // const getPicker = () => {
  //   if (showDateInfo) {
  //     return (
  //       <DatePicker
  //         className="w-50"
  //         format={format}
  //         placeholder="Select date"
  //       />
  //     );
  //   }
  //   if (!question) return null;

  //   // if (showTimeInfo) {
  //   //   return (
  //   //     <div className="d-flex">
  //   //       <Input className="w-40 mr-10" placeholder="hh" maxLength={2} />
  //   //       <Input className="w-40 mr-10" placeholder="mm" maxLength={2} />
  //   //       <Select
  //   //         className="w-20"
  //   //         placeholder="AM/PM"
  //   //         options={[
  //   //           { value: "AM", label: "AM" },
  //   //           { value: "PM", label: "PM" },
  //   //         ]}
  //   //       />
  //   //     </div>
  //   //   );
  //   // }

  //   // datetime
  //   // return (
  //   //   <>
  //   //     <DatePicker
  //   //       className="w-25"
  //   //       format={format}
  //   //       placeholder="Select date"
  //   //     />
  //   //     <Input className="w-25 mr-10" placeholder="hh" maxLength={2} />
  //   //     <Input className="w-25 mr-10" placeholder="mm" maxLength={2} />
  //   //     <Select
  //   //       className="w-25"
  //   //       placeholder="AM/PM"
  //   //       options={[
  //   //         { value: "AM", label: "AM" },
  //   //         { value: "PM", label: "PM" },
  //   //       ]}
  //   //     />
  //   //   </>
  //   // );
  // };

  // return (
  //   <Form.Item
  //     name={identity}
  //     label={<strong>{mainQuestion}</strong>}
  //     rules={[
  //       {
  //         required,
  //         message,
  //       },
  //     ]}
  //   >
  //     {getPicker()}
  //   </Form.Item>
  // );
};

export default SurveyDateTimeQuestion;
