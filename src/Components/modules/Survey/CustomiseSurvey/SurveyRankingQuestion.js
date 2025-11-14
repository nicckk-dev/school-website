import { DownOutlined, DragOutlined, UpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

const SurveyRankingQuestion = ({ question, form, onQuestionChange }) => {
  const {
    id,
    identity,
    mainQuestion,
    selectedType,
    pageId,
    valuesData = {},
    logicData = [],
  } = question;
  const { options } = valuesData;
  console.log("ranking", question);
  const initialItems = options?.map((opt) => opt.value) || [];
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

    // Build options from the updated array
    const updatedOptions = newItems.map((item) => ({ value: item.toString() }));

    const payload = {
      id,
      identity,
      mainQuestion,
      answerData: selectedType,
      pageId,
      valuesData: {
        options: updatedOptions
      }
    };

    if (onQuestionChange) {
      onQuestionChange(identity, payload);
    }
  };


  // const moveItem = (index, direction) => {
  //   const newItems = [...rankingItems];
  //   const targetIndex = index + direction;
  //   if (targetIndex < 0 || targetIndex >= newItems.length) return;
  //   [newItems[index], newItems[targetIndex]] = [
  //     newItems[targetIndex],
  //     newItems[index],
  //   ];
  //   setRankingItems(newItems);
  //   const options = rankingItems.map((item) => ({ value: item.toString() }));

  //   const payload = {
  //     id,
  //     identity,
  //     mainQuestion: mainQuestion,
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
  // useEffect(() => {
  //   console.log(rankingItems);
  //   const options = rankingItems.map((item) => ({ value: item.toString() }));
  //   console.log("option", options);
  //   const payload = {
  //     id:id,
  //     questionId: identity,
  //     mainQuestion: mainQuestion,
  //     answerData: selectedType,
  //     pageId: pageId,
  //     valuesData: {
  //       options: options,
  //       //   selectedOption: info.file.name,
  //       //   file: info.file,
  //     },
  //   };
  //   if (onQuestionChange) {
  //     onQuestionChange(identity, payload);
  //   }
  // }, [rankingItems]);

  console.log("ranking changes", rankingItems);
  if (!question) return null;
  return (
    <div>
      {/* <h4>{question.label}</h4> */}
      <ReactSortable
        tag="ul"
        list={rankingItems}
        setList={setRankingItems}
        animation={200}
        className="list-group"
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
                disabled={index === 0}
                onClick={() => moveItem(index, -1)}
              />
              <Button
                icon={<DownOutlined />}
                disabled={index === rankingItems.length - 1}
                onClick={() => moveItem(index, 1)}
              />
            </div>
          </li>
        ))}
      </ReactSortable>
    </div>
  );
};

export default SurveyRankingQuestion;
