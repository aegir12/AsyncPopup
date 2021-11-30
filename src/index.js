import React, { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { StyledAsyncPopup } from './StyledAsyncPopup'

export const SimplePopup = ({ open, title, footer, content, onClose }) => {
  const container = useMemo(() => {
    if (!open) return null
    const div = document.createElement('div')
    document.body.append(div)
    return div
  }, [open])

  useEffect(() => {
    return () => {}
  })

  if (!open) return null

  return ReactDOM.createPortal(
    open ? (
      <StyledAsyncPopup>
        <div className='async-popup__backdrop'>
          <div className='async-popup__container'>
            <div className='async-popup__header'>
              {title && <div className='async-popup__title'>{title}</div>}
              <button className='async-popup__close-btn' onClick={onClose}>
                X
              </button>
            </div>
            <div className='async-popup__body'>{content}</div>
            {footer && <div className='async-popup__footer'>{footer}</div>}
          </div>
        </div>
      </StyledAsyncPopup>
    ) : (
      <React.Fragment> </React.Fragment>
    ),
    container
  )
}

export const createPopup = ({ ContentComp, api = {}, ...props }) => {
  return new Promise((resolve) => {
    const div = document.createElement('div')
    document.body.append(div)

    api.ok = async () => {
      console.log('🚀 ~ file: index.js ~ line 53 ~ api.ok= ~ api', api)
      if (api.onValidate) {
        const invalid = await api.onValidate()
        if (invalid) return
      }
      if (api.onConfirm) {
        resolve(await api.onConfirm())
      } else {
        resolve(true)
      }
      ReactDOM.unmountComponentAtNode(div)
    }

    api.cancel = async () => {
      if (api.onCancel) {
        resolve(await api.onCancel())
      } else {
        resolve(false)
      }
      ReactDOM.unmountComponentAtNode(div)
    }

    ReactDOM.render(
      <SimplePopup
        open
        onClose={api.cancel}
        content={ContentComp ? <ContentComp api={api} /> : null}
        {...props}
      />,
      div
    )
  })
}

const confirm = ({ ...props }) => {
  const api = {}
  const footer = (
    <React.Fragment>
      <button onClick={() => api.ok()}>OK</button>
      <button onClick={() => api.cancel()}>Cancel</button>
    </React.Fragment>
  )
  return createPopup({ footer, api, ...props })
}

const alert = ({ ...props }) => {
  const api = {}
  const footer = <button onClick={() => api.cancel()}>OK</button>
  return createPopup({ footer, api, ...props })
}

export const Popup = { confirm, alert }
