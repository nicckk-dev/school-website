// rate comp
import {
  HeartFilled,
  LikeFilled,
  SmileFilled,
  StarFilled,
} from "@ant-design/icons";
import { Form, Rate } from "antd";
import React, { useRef, useState } from "react";
import getprocessOptions from "../../../../utils/SurveyRandomizeFun.js";
import SurveyOtherOption from "./SurveyOtherOption.js";

const getRatingIcon = (shape) => {
  switch (shape) {
    case "heart":
      return <HeartFilled />;
    case "smile":
    case "smiley":
      return <SmileFilled />;
    case "thumb":
      return <LikeFilled />;
    case "star":
    default:
      return <StarFilled />;
  }
};

const SurveyRateQuestion = ({ question, form, onQuestionChange }) => {
  const previousRatingsRef = useRef({});
  const [optionData, setOptionData] = useState([]);
  if (!question) return null;

  const {
    id,
    identity,
    required,
    isSaved,
    valuesData = {},
    // mainQuestion, // label is commented in your original, you can uncomment if needed
  } = question;

  const {
    required: configRequired,
    errorMessage: configErrorMessage
  } = question.optionConfig || {};

  // Final rule values (priority to optionConfig if present)
  // const isRequired = configRequired ?? false;
  // const validationMsg = configErrorMessage || "This field is required";

  const { otherOption } = valuesData;

  const options = question?.valuesData?.ratings?.map((data) => ({
    ...data,
    value: data.label,
  }));

  const customizeOptions = getprocessOptions(
    options || [],
    question?.valuesData
  );
  const ratingScale = valuesData?.ratingScale || customizeOptions.length;

  //  const handleRateChange = (val) => {
  //   // Update the form value
  //   form.setFieldsValue({
  //     [identity]: val,
  //   });

  //   // Prepare full option list with selected flags
  //   const optionList = [];

  //   for (let i = 1; i <= ratingScale; i++) {
  //     const label = customizeOptions[i - 1]?.label || `Rating ${i}`;
  //     optionList.push({
  //       value: i,
  //       label: label,
  //       selected: i === val,
  //     });
  //   }

  //   const payload = {
  //     identity: question?.identity,
  //     mainQuestion: question?.mainQuestion,
  //     options: optionList,
  //     pageId: question?.pageId,
  //     answerData: question?.selectedType,
  //   };

  //   if (onQuestionChange) {
  //     onQuestionChange(identity, payload);
  //   }
  // };

  const handleRateChange = (val) => {
    form.setFieldsValue({ [identity]: val });

    const optionList = [];

    for (let i = 1; i <= ratingScale; i++) {
      const label = customizeOptions[i - 1]?.label || `Rating ${i}`;
      optionList.push({
        value: i,
        label,
        selected: i <= val, // ✅ selected if less than or equal to chosen value
      });
    }

    setOptionData(optionList);
    const payload = {
      id,
      identity,
      mainQuestion: question?.mainQuestion,
      pageId: question?.pageId,
      answerData: question?.selectedType,
      valuesData: {
        options: optionList,
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

  return (
    <Form.Item
      // label={question.mainQuestion} // uncomment this if you want label
      name={identity}
      initialValue={valuesData?.initialValue ?? null}
      rules={[
        {
          required: configRequired ?? false,
          message:
            configErrorMessage || "This field is required",
        },
      ]}
    // rules={[
    //   {
    //     required: required,
    //     message: valuesData?.validationErrorMessage || "Please rate",
    //   },
    // ]}
    >
      <Rate
        count={valuesData?.ratingScale}
        tooltips={customizeOptions.map((r) => r.label) || []}
        allowHalf={valuesData?.allowHalf}
        disabled={isSaved === false}
        character={getRatingIcon(valuesData?.ratingShape || "star")}
        onChange={handleRateChange}
        className="fs-4"
      />

      {otherOption && (
        <SurveyOtherOption
          question={question}
          handleOtherInputChange={handleOtherInputChange}
        />
      )}
    </Form.Item>
  );
};

export default SurveyRateQuestion;
