import React, { useEffect, useCallback, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useDispatch } from 'react-redux'

import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { ALERT } from '../../redux/types/alertType'

interface IProps {
  setBody: (value: string) => void
}

const Quill: React.FC<IProps> = ({ setBody }) => {
  const dispatch = useDispatch()

  const quillRef = useRef<ReactQuill>(null)
  const modules = { toolbar: { container } }

  // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()

    input.onchange = async () => {
      const files = input.files
      if (!files)
        return dispatch({
          type: ALERT,
          payload: { errors: 'File does not exist.' },
        })

      const file = files[0]
      const check = checkImage(file)
      if (check) return dispatch({ type: ALERT, payload: { errors: check } })

      dispatch({ type: ALERT, payload: { loading: true } })
			const photo = await imageUpload(file)

			const quill = quillRef.current;
			const range = quill?.getEditor().getSelection()?.index
			if(range !== undefined){
				quill?.getEditor().insertEmbed(range, 'image',`${photo.url}`)
			}

      dispatch({ type: ALERT, payload: { loading: false } })
    }
  }, [dispatch])

  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return

    let toolbar = quill.getEditor().getModule('toolbar')
    toolbar.addHandler('image', handleChangeImage)
  }, [handleChangeImage])

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write something..."
        onChange={(e) => setBody(e)}
        ref={quillRef}
      />
    </div>
  )
}

let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],

  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'supper' }],

  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ align: [] }],

  ['clean', 'link', 'image', 'video'],
]

export default Quill
