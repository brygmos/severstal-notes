import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import textEditorCls from '../TextEditor/TextEditor.module.css'

type Props = {
    value: string,
    onChange: (value: string) => void,
    className: string
}

function Quill(props: Props) {
    const {onChange, value, className} = props

    return <ReactQuill bounds={textEditorCls.editor} theme="snow" value={value} onChange={onChange} className={className} placeholder='Текст'/>;
}

export default Quill
