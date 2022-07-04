import styled from 'styled-components';

const StyledCardDoneFav = styled.div`
  color: ${(props) => props.theme.secondaryColor};
  box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  width: 90%;
  margin: 20px auto;

  .container_recipe {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;

    .recipe_img {
      z-index: -1;
      border-radius: 10px 0 0 10px;
      width: 150px;
      margin-right: 10px;
    }

    section {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
      }
    
      p {
        font-size: 0.8rem;
        line-height: 1.3rem;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
      }

      .recipe_tags {
        display: flex;
        flex-flow: row wrap;
      }

      .recipe_tag {
        width: fit-content;
        text-align: left;
        font-size: 0.7rem;
        line-height: 1.5rem;
        background-color: ${(props) => props.theme.lightgray};
        border-radius: 5px;
        padding: 0 5px 0 5px;
        margin-top: 1px;
      }
    }
  }

  .container_copyFav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    button {
      width: 50px;
      background: #ffffff;
      box-shadow: 5px 5px 7px #d9d9d9;
      border: none;
      border-radius: 6px;
      margin: 10px 10px 10px 0;
    }

    span {
      font-size: 0.6rem;
    }
    
  }

`;

export default StyledCardDoneFav;
