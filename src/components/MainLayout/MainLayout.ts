import styled from 'styled-components'

export const MainLayout = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 1;
  }

  main {
    flex: 2;
    padding: 0 32px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`
