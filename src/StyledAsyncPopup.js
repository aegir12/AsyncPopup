import styled from 'styled-components'

export const StyledAsyncPopup = styled.div`
  .async-popup__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .async-popup__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    min-width: 400px;
    min-height: 100px;
    max-width: 80vw;
    max-height: 80vh;
    border-radius: 5px;
    border: 1px solid #9e9e9e;

    display: flex;
    flex-direction: column;
  }
  .async-popup__body {
    flex: 1;
    padding: 6px;
    white-space: normal;
    word-break: break-all;
    min-height: 30px;
    line-height: 30px;
  }
  .async-popup__footer {
    min-height: 30px;
    padding: 6px;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: end;

    > button {
      margin-left: 5px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 6px;
      left: 6px;
      border-top: 1px solid #e0e0e0;
    }
  }
  .async-popup__close-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    height: 25px;
    width: 25px;
  }
  .async-popup__header {
    background: #c9c9c9;
  }
  .async-popup__title {
    line-height: 30px;
    padding: 6px 25px 6px 6px;
    color: #fff;
    font-weight: bold;
  }
`
