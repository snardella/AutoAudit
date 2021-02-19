import React from "react";
const TagsInput = (props) => {
  const [tags, setTags] = React.useState([]);
  const removeTags = async (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    props.handleTagChange(props.name, tags);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
      props.handleTagChange(props.name, tags);
    }
  };

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
        name={props.name}
      />
    </div>
  );
};
export default TagsInput;
