import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill-new';
import "../../assets/scss/quill/RichTextEditor.scss";
// Define custom formats if needed
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'indent',
  'link',
  'image',
  'color',
];

// Custom toolbar component
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1">Heading</option>
      <option value="2">Subheading</option>
      <option value="">Normal</option>
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option value="#00ffff" />
    </select>
    <button className="ql-link" />
    <button className="ql-image" />
  </div>
);

interface RichTextEditorProps {
  txtValue: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange,txtValue }) => {
  // const [value, setValue] = useState<string>(txtValue);

  // const handleChange = useCallback((content: string) => {

  //   setValue(content);
  //   onChange(content);

  // }, [onChange]);

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={txtValue}
        placeholder='Write something...'
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;