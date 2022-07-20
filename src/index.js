import React, { useEffect, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import { StyledAsyncPopup } from './StyledAsyncPopup'

function SimpleButton({ ...props }) {
  return <button {...props} />
}

export const SimplePopup = ({ open, title, footer, content, onClose }) => {
  const container = useRef()

  useEffect(() => {
    if (!open) {
      container.current = null
    } else {
      const div = document.createElement('div')
      document.body.append(div)
      container.current = div
    }

    return () => {
      if (container.current) container.current.remove()
    }
  })

  if (!open) return null

  return (
    open && container.currnet ? (
      ReactDOM.createPortal(
        <StyledAsyncPopup>
          <div className='async-popup__backdrop'>
            <div className='async-popup__container'>
              <div className='async-popup__header'>
                {title && <div className='async-popup__title'>{title}</div>}
                <SimpleButton
                  className='async-popup__close-btn'
                  onClick={onClose}
                >
                  X
                </SimpleButton>
              </div>
              <div className='async-popup__body'>{content}</div>
              {footer && <div className='async-popup__footer'>{footer}</div>}
            </div>
          </div>
        </StyledAsyncPopup>
      )
    ) : (
      <React.Fragment> </React.Fragment>
    ),
    container
  )
}

export class AsyncPopup {
  Component
  Button
  openName = 'open'
  onCloseName = 'onClose'
  contentName = 'content'
  footerName = 'footer'

  constructor({
    Component = SimplePopup,
    Button = SimpleButton,
    open = 'open',
    onClose = 'onClose',
    content = 'content',
    footer = 'footer'
  } = {}) {
    this.Component = Component
    this.Button = Button
    this.openName = open
    this.onCloseName = onClose
    this.contentName = content
    this.footerName = footer
  }

  createPopup({ ContentComp, api = {}, ...props }) {
    return new Promise((resolve) => {
      const div = document.createElement('div')
      document.body.append(div)

      api.ok = async () => {
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

      const popupProps = {
        [this.openName]: true,
        [this.onCloseName]: api.cancel,
        [this.contentName]: ContentComp ? <ContentComp api={api} /> : null
      }

      ReactDOM.render(<this.Component {...popupProps} {...props} />, div)
    })
  }

  open({ ...props }) {
    const api = {}

    return this.createPopup({ api, ...props })
  }

  confirm({ ...props }) {
    if (!this.footerName) return null
    const api = {}
    const footer = (
      <React.Fragment>
        <this.Button onClick={() => api.ok()}>OK</this.Button>
        <this.Button onClick={() => api.cancel()}>Cancel</this.Button>
      </React.Fragment>
    )
    return this.createPopup({ [this.footerName]: footer, api, ...props })
  }

  alert({ ...props }) {
    if (!this.footerName) return null
    const api = {}
    const footer = <this.Button onClick={() => api.cancel()}>OK</this.Button>
    return this.createPopup({ [this.footerName]: footer, api, ...props })
  }
}

export function usePopup({
  open = 'open',
  onClose = 'onClose',
  content = 'content',
  footer = 'footer'
}) {
  return ({ Component = SimplePopup, api = {}, ...props }) =>
    new Promise((resolve) => {
      const div = document.createElement('div')
      document.body.append(div)

      api.ok = async () => {
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

      const popupProps = {
        [openName]: true,
        [onCloseName]: api.cancel,
        [contentName]: ContentComp ? <ContentComp api={api} /> : null
      }

      ReactDOM.render(<Component {...popupProps} {...props} />, div)
    })
}

export function useConfirm({
  footerName = 'footer',
  Button = SimpleButton,
  ...props
}) {
  if (!footerName) return null
  const api = {}
  const footer = (
    <React.Fragment>
      <Button onClick={() => api.ok()}>OK</Button>
      <Button onClick={() => api.cancel()}>Cancel</Button>
    </React.Fragment>
  )
  return usePopup({ [footerName]: footer, api, ...props })
}

export function useAlert({
  footerName = 'footer',
  Button = SimpleButton,
  ...props
}) {
  if (!footerName) return null
  const api = {}
  const footer = <Button onClick={() => api.cancel()}>OK</Button>
  return this.createPopup({ [this.footerName]: footer, api, ...props })
}

export const Popup = new AsyncPopup()
