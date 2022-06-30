import styled from 'styled-components';

const StyledLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 36%;
  
  /* From uiverse.io by @G4b413l */
  .dot-wave {
    --uib-size: 60px;
    --uib-speed: 1s;
    --uib-color: #0d0909;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: var(--uib-size);
    height: calc(var(--uib-size) * 0.17);
    padding-top: calc(var(--uib-size) * 0.34);
  }

  .dot-wave__dot {
    flex-shrink: 0;
    color: ${(props) => props.theme.secondaryColor};
    width: calc(var(--uib-size) * 0.17);
    height: calc(var(--uib-size) * 0.17);
    margin-right: 20px;
    will-change: transform;
  }

  .dot-wave__dot:nth-child(1) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.45) infinite;
  }

  .dot-wave__dot:nth-child(2) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.3) infinite;
  }

  .dot-wave__dot:nth-child(3) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.15) infinite;
  }

  .dot-wave__dot:nth-child(4) {
    animation: jump824 var(--uib-speed) ease-in-out infinite;
  }

  @keyframes jump824 {
    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-200%);
    }
  }
`;

export default StyledLoading;
