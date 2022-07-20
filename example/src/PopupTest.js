import { Input, Modal } from 'antd'
import React, { useImperativeHandle, useRef, useState } from 'React'

const PopupTest = React.forwardRef(({}, ref) => {
  const popupRef = useRef({})
  const [open, setOpen] = useState(false)

  useImperativeHandle(
    ref,
    () => {
      return {
        open: async () => {
          setOpen(true)
          popupRef.current = {}
          return new Promise((resolve, reject) => {
            popupRef.current.resolve = resolve
            popupRef.current.reject = reject
          }).finally(() => setOpen(false))
        }
      }
    },
    []
  )

  // TODO Modal 동작하도록 수정
  return (
    <Modal
      open={open}
      onOk={() => {
        popupRef.current.resolve(popupRef.current.result)
      }}
      onCancel={() => {
        popupRef.current.reject()
      }}
    >
      <Input
        onChange={(e) => {
          popupRef.current.result = e.target.value
        }}
      />
    </Modal>
  )
})

export default PopupTest

// usage

function SomeComp(params) {
  const ref = useRef()

  const handleClick = async () => {
    const result = await ref.current.open()
    console.log(result)
  }
  return (
    <>
      <button onClick={handleClick}>click</button>
      <PopupTest ref={ref} />
    </>
  )
}
