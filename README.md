# async-popup

After calling a sub-procedure, the subsequent logic is often different depending on the processing details.
To implement in React, such logic is inconsistent and must be implemented separately.
This library is not called 'reactive', but you can implement your logic within a function using asynchronous processing.

## Usage

```jsx
import { SimplePopup, Popup, AsyncPopup } from 'async-popup'

// optional
const AntdPopup = new AsyncPopup({
  Component: Modal,
  Button,
  open: 'visible',
  content: 'children',
  onClose: 'onCancel'
})

// optional
const AntdDrawer = new AsyncPopup({
  Component: Drawer,
  Button,
  open: 'visible',
  content: 'children'
})

const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div>
        <button onClick={() => setOpen((prev) => !prev)}>
          open simple popup
        </button>
        <button
          onClick={async () => {
            const result = await Popup.alert({
              title: 'alert',
              content: 'alert content'
            })
            console.log(result)
            alert('done')
          }}
        >
          alert
        </button>
        <button
          onClick={async () => {
            const result = await Popup.confirm({
              title: 'confirm',
              content: 'alert content'
            })
            console.log(result)
            alert('done')
          }}
        >
          confirm
        </button>
        <button
          onClick={async () => {
            const result = await Popup.confirm({
              title: 'confirm input',
              ContentComp: ({ api }) => {
                const [value, setValue] = useState('')
                api.onValidate = () => {
                  if (!value) return { message: 'not allowed Blank' }
                  return null
                }
                api.onConfirm = () => {
                  return value
                }

                return (
                  <input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                )
              }
            })
            console.log(result)
            alert(result)
          }}
        >
          confirm Input
        </button>
        <button
          onClick={async () => {
            const apps = ['service', 'node', 'homepage']
            const result = await Popup.confirm({
              title: 'confirm input',
              ContentComp: ({ api }) => {
                const [selected, setSelected] = useState([])

                api.onConfirm = () => {
                  return selected
                }
                api.onCancel = () => {
                  return null
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {apps.map((app) => (
                      <span key={app}>
                        <input
                          type='checkbox'
                          value={app}
                          checked={selected.includes(app)}
                          onChange={({ target: { value, checked } }) =>
                            setSelected((prev) => {
                              if (!checked)
                                return prev.filter((app) => app !== value)
                              return [...prev, value]
                            })
                          }
                        />
                        {app}
                      </span>
                    ))}
                  </div>
                )
              }
            })
            console.log(result)
            alert(result)
          }}
        >
          confirm select app
        </button>
        <SimplePopup
          open={open}
          onClose={() => setOpen((prev) => !prev)}
          title='title'
          content='content'
          footer='footer'
        />
      </div>
      <div>
        <button
          onClick={async () => {
            const result = await AntdPopup.alert({
              title: 'alert',
              children: 'alert content'
            })
            console.log(result)
            alert('done')
          }}
        >
          Antd alert
        </button>
        <button
          onClick={async () => {
            const result = await AntdPopup.confirm({
              title: 'confirm',
              children: 'alert content'
            })
            console.log(result)
            alert('done')
          }}
        >
          Antd confirm
        </button>
        <button
          onClick={async () => {
            const result = await AntdPopup.confirm({
              title: 'confirm input',
              ContentComp: ({ api }) => {
                const [value, setValue] = useState('')
                api.onValidate = () => {
                  if (!value) return { message: 'not allowed Blank' }
                  return null
                }
                api.onConfirm = () => {
                  return value
                }

                return (
                  <Input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                )
              }
            })
            console.log(result)
            alert(result)
          }}
        >
          Antd confirm Input
        </button>
        <button
          onClick={async () => {
            const apps = ['service', 'node', 'homepage']
            const result = await AntdPopup.confirm({
              title: 'select app',
              ContentComp: ({ api }) => {
                const [selected, setSelected] = useState([])

                api.onConfirm = () => {
                  return selected
                }
                api.onCancel = () => {
                  return null
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {apps.map((app) => (
                      <span key={app}>
                        <Checkbox
                          value={app}
                          checked={selected.includes(app)}
                          onChange={({ target: { value, checked } }) =>
                            setSelected((prev) => {
                              if (!checked)
                                return prev.filter((app) => app !== value)
                              return [...prev, value]
                            })
                          }
                        >
                          {app}
                        </Checkbox>
                      </span>
                    ))}
                  </div>
                )
              }
            })
            console.log(result)
            alert(result)
          }}
        >
          Antd confirm select app
        </button>
        <SimplePopup
          open={open}
          onClose={() => setOpen((prev) => !prev)}
          title='title'
          content='content'
          footer='footer'
        />
      </div>
      <div>
        <button
          onClick={async () => {
            const apps = ['service', 'node', 'homepage']
            const result = await AntdDrawer.confirm({
              title: 'select app',
              ContentComp: ({ api }) => {
                const [selected, setSelected] = useState([])

                api.onConfirm = () => {
                  return selected
                }
                api.onCancel = () => {
                  return null
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {apps.map((app) => (
                      <span key={app}>
                        <Checkbox
                          value={app}
                          checked={selected.includes(app)}
                          onChange={({ target: { value, checked } }) =>
                            setSelected((prev) => {
                              if (!checked)
                                return prev.filter((app) => app !== value)
                              return [...prev, value]
                            })
                          }
                        >
                          {app}
                        </Checkbox>
                      </span>
                    ))}
                  </div>
                )
              }
            })
            console.log(result)
            alert(result)
          }}
        >
          Antd Drawer select app
        </button>
        <SimplePopup
          open={open}
          onClose={() => setOpen((prev) => !prev)}
          title='title'
          content='content'
          footer='footer'
        />
      </div>
    </div>
  )
}
```

## License

MIT © [](https://github.com/)
