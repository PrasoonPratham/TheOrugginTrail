const cssString = `
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  .wallet {
    color: forestgreen;
    background: black;
    border: 1px solid chartreuse;
    border-radius: 4px;
    font-family: 'Courier', sans-serif;
    font-size: 16px;
    padding: 20px;
    height: calc(100% - 42px);
    min-height: 300px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .wallet-history {
    margin-bottom: 20px;
  }

  .output {
    margin: 8px 0;
    white-space: pre-wrap;
    line-height: 1.4;
  }

  input {
    width: 100%;
    background: black;
    border: none;
    outline: none;
    color: forestgreen;
    font-family: 'Courier', sans-serif;
    font-size: 16px;
    padding: 8px 0;
  }
`;

export default cssString;
