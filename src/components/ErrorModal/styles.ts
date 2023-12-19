import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: #e9e9e9;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  color: #000;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 3em;
  }

  .middle-section {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    text-align: center;

    h2 {
      font-weight: 600;
      margin-bottom: 10px;
      font-size: 2rem;
    }

    p {
      margin-top: 10px;
      font-weight: 400;
      font-size: 1.5rem;
    }

    a {
      color: #000;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  .bottom-section {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
      border: 0;
      border-radius: 0 0 20px 20px;
      text-decoration: none;
      color: #7482a2;
      font-weight: 500;
      text-transform: uppercase;
      padding: 1em 0;
      outline: 0;
      cursor: pointer;
    }
  }
`;

