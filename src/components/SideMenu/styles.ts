import styled from 'styled-components';
interface isActiveLink {
  active: boolean;
}
export const Layout = styled.div`
  height: 100vh;
  width: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BottomItems = styled.footer`
  display: flex;
  flex-direction: column;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1em;
  list-style-type: none;
`;

export const MenuListItem = styled.li<isActiveLink>`
  display: flex;
  align-items: center;
  //padding: 10px;
  margin-bottom: 1em;
  width: 100%;
  transition-duration: 200ms;
  border-radius: 0.4rem;

  &:hover {
    background: #f4f6fb;

    * {
      color: #47a7f6;
    }
  }

  &.disabled {
    cursor: not-allowed;
    color: #999;

    :hover {
      background: #fff;

      * {
        color: #999;
      }
    }
  }

  a {
    padding: 7px;
    display: flex;
    align-items: center;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-decoration: none;
    width: 100%;

    background: ${(props) => (props.active ? '#f4f6fb' : '')};
    color: ${(props) => (props.active ? '#47a7f6' : '#6e6f73')};
    font-weight: ${(props) => (props.active ? '600' : '500')};

    svg {
      margin-right: 0.5em;
    }
    &.disabled {
      cursor: not-allowed;
      color: #999;

      :hover {
        background: #fff;

        * {
          color: #999;
        }
      }
    }
  }
`;

export const ChangeSession = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 1em;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1rem;

  .online-circle {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: aquamarine;
    margin-right: 0.5em;
  }

  div {
    display: flex;
    align-items: center;
  }

  a {
    color: #47a7f6;
    text-decoration: none;
  }
`;

export const InfoSession = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 10px;
  font-size: 1rem;
  cursor: default;

  div {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  a {
    font-size: 1rem;
    margin-top: 10px;
    color: #f64747;
  }
`;

export const LogoutButton = styled.p`
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  background: #f64747;
  text-align: center;
  padding: 10px;
  transition-duration: 200ms;

  :hover {
    background: red;
  }
`;

