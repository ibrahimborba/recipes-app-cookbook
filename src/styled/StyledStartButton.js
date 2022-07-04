import styled from 'styled-components';

const StyledStartButton = styled.div`
  background: linear-gradient(
    0deg,
    rgba(255,255,255,1) 40%,
    rgba(255,255,255,0.7) 60%,
    rgba(255,255,255,0.5) 70%,
    rgba(255,255,255,0.3) 80%,
    rgba(0,0,0,0) 100%
  );
  bottom: 0;
  padding: 1.5rem 0;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 2;

  .button {
    background-color: ${({ theme }) => theme.dark};
    border: none;
    border-radius: 8px;
    bottom: 0;
    color: ${({ theme }) => theme.mainColor};
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem;
    transition: 0.4s;

    &:hover {
      cursor: pointer;
    }
  }

  .button:disabled {
    background-color: ${({ theme }) => theme.disabled};
    bottom: 0;
    color: ${({ theme }) => theme.typography.secondary};
    transition: 0.4s;
  }
`;

export default StyledStartButton;
