import RichTextEditor from './RichTextEditor'
import '../../assets/scss/inputs/richtext-editor-wrapper.scss'

type Props = {
  value: string;
  onChange: (value: string) => void;
}

function PostEditorTest({onChange,value}: Props) {
  return (
    <div className='quill-wrapper'>
        <RichTextEditor txtValue={value} onChange={onChange}/>
    </div>
  )
}

export default PostEditorTest