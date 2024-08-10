import RichTextEditor from './RichTextEditor'
import '../../assets/scss/inputs/richtext-editor-wrapper.scss'

type Props = {
  value: string;
  onChange: (value: string) => void;
}

function PostEditorTest({onChange,value}: Props) {
    // const [value, setValue] = useState<string>('');

    const handleChange = (content: string) => {
        onChange(content);
    }
  return (
    <div className='quill-wrapper'>
        <RichTextEditor txtValue={value} onChange={handleChange}/>
    </div>
  )
}

export default PostEditorTest