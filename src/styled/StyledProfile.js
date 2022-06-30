import styled from 'styled-components';

const StyledProfile = styled.div`
  &, .profile-links{
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .profile-links {
    gap: 30px;
    max-width: 300px;
    width: 80%;
  }

  .profile-links-button {
    /* background-color: ${({ theme }) => theme.recipeItems};
    border: unset;
    border-radius: 10px;
    box-shadow: 5px 5px 15px -5px rgba(0,0,0,0.27);
    color: ${({ theme }) => theme.dark};
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem;
    width: 100%; */


    padding: 1.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 10px;
    color: ${(props) => props.theme.mainColor};
    width: 100%;
    border: none;
  }

  .logout {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.6),
    rgb(0, 0, 0, 0.6)), url('https://greatpeopleinside.com/wp-content/uploads/2018/04/why-employees-leave.png');
    background-size: 100% auto;
    background-position: 0% 55%;
  }

  .done {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.6),
    rgb(0, 0, 0, 0.6)), url('https://www.pngitem.com/pimgs/m/575-5755078_checked-and-done-finally-i-am-done-hd.png');
    background-size: 100% auto;
    background-position: 0% 40%;
  }

  .favorites {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.6),
    rgb(0, 0, 0, 0.6)), url('https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/hand%20pointing%20to%20five%20gold%20stars-8213-e5f70188dfc5073b13c6a1b06b19ea58@1x.jpg');
    background-size: 100% auto;
    background-position: 0% 30%;
  }

  .profile-user {
    padding: 5rem 2rem;
    text-align: center;
  }

  .profile-user-email {
    font-size: 1.3rem;
    font-style: italic;
    font-weight: 800;
  }

  .profile-user-icon {
    margin-bottom: 1rem;
    width: 20%;
  }
`;

export default StyledProfile;
