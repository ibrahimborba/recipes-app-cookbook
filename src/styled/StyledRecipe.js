import styled from 'styled-components';

const StyledRecipe = styled.div`
  height: 100%;
  width: 100vw;
  margin-bottom: 5rem;

  .recipe-container {
    width: 100%;
    padding: 1rem;
  }

  .recice-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: 0% 30%;
  }

  .recipe-img-container {
    display: flex;
    justify-content: center;
  }

  .recipe-video {
    border: none;
    border-radius: 20px;
    box-shadow:  15px 15px 35px #b3b3b3, -15px 0px 35px #ffffff;
    margin-bottom: 3rem;
    width: 100%;
    height: 200px;
  }

  .recipe-video-title {
    padding-left: 20px;
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: .5rem;
  }

  @media (min-width: 540px) {
    .recipe-video {
      height: 300px;
    }    
  }

  @media (min-width: 820px) {
    .recice-img {
      display: inline-block;
      height: 400px;
      object-fit: cover;
      object-position: 0% 30%;
    }

    .recipe-video {
      height: 400px;
    }    
  }

  @media (min-width: 1280px) {
    .recice-img, .recipe-container {
      margin: 0 auto;
      width: 60%;
    }

    .recice-img {
      border-radius: 0 0 20px 20px;
      display: inline-block;
      height: 400px;
    }

    .recipe-video {
      height: 600px;
    }
  }
`;

export default StyledRecipe;
