import { Checkbox, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { SelectComp } from "../../common/SelectComp";

const OtherOption = ({ form, data }) => {
  const [isOtherOptionsOprn, setIsOtherOptionsOpen] = useState(false);
  const [otherOptionType, setOtherOptionType] = useState("answerChoice");
  const [textStyleOption, setTextStyleOption] = useState("");
  const [validation, setValidation] = useState("none");
  const linesOptions = [
    { label: "2 lines", value: 2 },
    { label: "3 lines", value: 3 },
    { label: "4 lines", value: 4 },
    { label: "5 lines", value: 5 },
    { label: "6 lines", value: 6 },
    { label: "7 lines", value: 7 },
    { label: "8 lines", value: 8 },
    { label: "9 lines", value: 9 },
    { label: "10 lines", value: 10 },
    { label: "11 lines", value: 11 },
    { label: "12 lines", value: 12 },
    { label: "13 lines", value: 13 },
    { label: "14 lines", value: 14 },
    { label: "15 lines", value: 15 },
    { label: "16 lines", value: 16 },
    { label: "17 lines", value: 17 },
    { label: "18 lines", value: 18 },
    { label: "19 lines", value: 19 },
    { label: "20 lines", value: 20 },
  ];
  const charactersOptions = [
    { label: "5 characters", value: 5 },
    { label: "10 characters", value: 10 },
    { label: "20 characters", value: 20 },
    { label: "30 characters", value: 30 },
    { label: "40 characters", value: 40 },
    { label: "50 characters", value: 50 },
    { label: "60 characters", value: 60 },
    { label: "70 characters", value: 70 },
    { label: "80 characters", value: 80 },
    { label: "90 characters", value: 90 },
    { label: "100 characters", value: 100 },
  ];
  const validationOptions = [
    { label: "Don't validate this answer", value: "none" },
    { label: "Make sure its's specific length", value: "length" },
    { label: "Make sure its's whole number", value: "wholeNumber" },
    { label: "Make sure its's decimal number", value: "decimalNumber" },
    { label: "Make sure its's date (MM/DD/YYYY)", value: "dateMMDDYYYY" },
    { label: "Make sure its's date (DD/MM/YYYY)", value: "dateDDMMYYYY" },
    { label: "Make sure its's email address", value: "email" },
  ];
  //   initialValue={{
  //             otherOptionType: "answerChoice",
  //             textStyle: "singleLine",
  //             lines: 3,
  //              characters: 50:,
  //              validationType: "none"
  //           }}
  useEffect(() => {
    // You can auto-reset related fields based on selected rule

    if (validation === "length") {
      form.setFieldsValue({
        min: data?.valuesData?.min || 0,
        max: data?.valuesData?.max || 5000,
      });
    }
    if (validation === "wholeNumber") {
      form.setFieldsValue({
        min: data?.valuesData?.min || 0,
        max: data?.valuesData?.max || 100,
      });
    }
    if (validation === "decimalNumber") {
      form.setFieldsValue({
        min: data?.valuesData?.min || 0,
        max: data?.valuesData?.max || 100,
      });
    }
    if (validation === "dateMMDDYYYY") {
      form.setFieldsValue({
        min: data?.valuesData?.min || "09/07/2025",
        max: data?.valuesData?.max || "12/01/2025",
      });
    }
    if (validation === "dateDDMMYYYY") {
      form.setFieldsValue({
        min: data?.valuesData?.min || "07/09/2025",
        max: data?.valuesData?.max || "01/12/2025",
      });
    }
  }, [validation]);
  useEffect(() => {
    if (data?.valuesData) {
      setIsOtherOptionsOpen(data.valuesData?.otherOption || false);
      setValidation(data.valuesData?.validationType);
      setTextStyleOption(data.valuesData?.textStyle);
      setOtherOptionType(data.valuesData?.otherOptionType || "answerChoice");
    }
  }, [data?.valuesData]);
  return (
    <div className="w-full p-2">
      <div>
        <Form.Item name="otherOption" valuePropName="checked">
          <Checkbox
            checked={isOtherOptionsOprn}
            onChange={(e) => setIsOtherOptionsOpen(e.target.checked)}
          >
            Add an "Other" answer option for comments
          </Checkbox>
        </Form.Item>
      </div>
      {isOtherOptionsOprn && (
        <div className="p-4 d-flex flex-column gap-3">
          <div className="w-50">
            <Form.Item
              name="otherOptionLabel"
              label="Label"
              rules={[{ required: true, message: "Please enter label!" }]}
            >
              <TextArea />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="otherOptionType">
              <Radio.Group
                // onChange={(e) => setOtherOptionType(e.target.value)}
                onChange={(e) => {
                  setOtherOptionType(e.target.value);

                  // ✅ Reset specific fields when radio changes
                  form.setFieldsValue({
                    emptyAnswerError: "",   // replace with your actual field names
                    textStyle: "",
                    lines: "",
                    characters:""
                  });
                }}
                value={otherOptionType}
                className="d-flex flex-column gap-2"
              >
                <Radio value="answerChoice">Display as answer choice</Radio>
                <Radio value="commentField">Display as comment field</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          {otherOptionType !== "answerChoice" && (
            <>
              <div>
                <Form.Item
                  label="When the answer is left blank, display this error message."
                  name="emptyAnswerError"
                  rules={[{ required: true, message: "Please enter comment!" }]}
                >
                  <TextArea placeholder="Please enter a comment." />
                </Form.Item>
              </div>
              <div>
                <h6>Size</h6>
                <div className="row gap-2">
                  <div className="col-md-3">
                    <SelectComp
                      props={{
                        mode: "single",
                        size: "large",
                        name: "textStyle",
                        required: true,
                        message: "Please Select Text Style",
                        options: [
                          { label: "Select", value: "", disabled: true },
                          { label: "Single line of text", value: "singleLine" },
                          { label: "Paragraph of text", value: "paragraph" },
                        ],
                        onChange: (value) => setTextStyleOption(value),
                      }}
                    />
                  </div>

                  {textStyleOption === "paragraph" && (
                    <div className="col-md-2">
                      <SelectComp
                        props={{
                          mode: "single",
                          size: "large",
                          name: "lines",
                          required: true,
                          message: "Please Select Lines",
                          options: [
                            { value: "", label: "Select", disabled: true },
                            ...linesOptions,
                          ],
                        }}
                      />
                    </div>
                  )}
                  <div className="col-md-3">
                    <SelectComp
                      props={{
                        mode: "single",
                        size: "large",
                        name: "characters",
                        defaultValue: "",
                        required: true,
                        message: "Please Select Characters",
                        options: [
                          { value: "", label: "Select", disabled: true },
                          ...charactersOptions,
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {/* <div>
            <h6>Validation</h6>
            <div className="row gap-2">
              <div className="col-md-4">
                <SelectComp
                  props={{
                    mode: "single",
                    size: "large",
                    name: "validationType",
                    options: [
                      { value: "", label: "Select", disabled: true },
                      ...validationOptions,
                    ],
                    required: true,
                    message: "Please Select Validation",
                    onChange: (value) => setValidation(value),
                  }}
                />
              </div>

              {(validation === "length" ||
                validation === "wholeNumber" ||
                validation === "decimalNumber" ||
                validation === "dateMMDDYYYY" ||
                validation === "dateDDMMYYYY") && (
                  <div className="d-flex align-items-center gap-2 col-md-4">
                    <p className="m-0">between</p>
                    <Form.Item
                      name="min"
                      rules={[
                        {
                          required: true,
                          message: "Please enter minimum range!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <p className="m-0">and</p>
                    <Form.Item
                      name="max"
                      rules={[
                        {
                          required: true,
                          message: "Please enter maximum range!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                )}
            </div>
          </div>
          {validation != "none" && (
            <div>
              <Form.Item
                label="When the answer is invalid, display this error message."
                name="validationErrorMessage"
                rules={[
                  {
                    required: true,
                    message: "Please enter validation error message!",
                  },
                ]}
              >
                <TextArea placeholder="The comment you entered is in an invalid format." />
              </Form.Item>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default OtherOption;

