const cssString: string = `:host {
          display: block;
          margin: 0;
      }

      textarea {
          color: forestgreen;
          background: black;
          outline: none;
          border: black;
          font-family: 'Courier', sans-serif;
          font-size: 16px;
          width: 100%;
          box-sizing: border-box;
      }

      input {
          color: forestgreen;
          width: 90%;
          background: black;
          outline: none;
          border: black;
          font-family: 'Courier', sans-serif;
          font-size: 16px;
          box-sizing: border-box;
          margin-bottom: 8px;
          margin-left: 4px;
          margin-right: 4px;
      }

      .bastard {
          color: forestgreen;
          font-family: 'Courier', sans-serif;
          font-size: 12px;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 16px;
          text-align: center;
          white-space: pre-wrap;
      }

      .terminal {
          color: forestgreen;
          background: black;
          border: 1px solid chartreuse;
          border-radius: 4px;
          font-family: 'Courier', sans-serif;
          font-size: 16px;
          margin-top: 4px;
          margin-bottom: 4px;
          height: calc(100% - 8px);
          overflow-y: auto;
          scroll-behavior: smooth;
          padding: 20px;
      }

      .output {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 8px;
          margin-bottom: 8px;
          text-align: left;
          white-space: pre-wrap;
      }

      .headerOutput {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          white-space: pre-wrap;
      }

      .input-line {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
      }

      span {
          color: forestgreen;
          font-family: 'Courier', sans-serif;
          font-size: 16px;
          margin-right: 8px;
      }

      input {
          color: forestgreen;
          background: black;
          outline: none;
          border: none;
          font-family: 'Courier', sans-serif;
          font-size: 16px;
          flex: 1;
          padding: 0;
      }
`;
export default cssString;
