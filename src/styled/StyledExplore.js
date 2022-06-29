import styled from 'styled-components';

const StyledForm = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.lightgray};
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;


  button {
    color: ${(props) => props.theme.mainColor};
    height: 30%;
    border-radius: 13px;
    border: none;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 3rem;
    width: 80%;
  }

  .foods-btn{
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    background-size: cover;
  }

  .drinks-btn{
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80");
    background-size: cover;
  }
`;

export default StyledForm;
