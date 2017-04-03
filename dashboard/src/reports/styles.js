import styled from 'styled-components'

export const Jumbo = styled.div`
  background-color: rgb(216, 218, 219);
  text-align: center;
  padding-bottom: 50px;
`

export const UserReportsContainer = styled.div`
  padding: 20px;
  h1 { text-align: center }
`

export const AverageHappinessText = styled.h3`
  color: ${(props) => props.color}
`
