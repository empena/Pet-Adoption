import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button, Dropdown, Header } from 'semantic-ui-react'
import Pets from './Pets'
import { Link } from 'react-router-dom'
import styled from "styled-components";


const FindYourPet = () => {

  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    axios.get('/api/organizations')
      .then(res => setOrganizations(res.data))
  }, []
  )

  const deleteOrganization = (id) => {
    axios.delete(`/api/organizations/${id}`)
      .catch((e) => console.log(e))
  };

  // const organizationsOptions = [
  //   {
  //     key: 'Jenny Hess',
  //     text: 'Jenny Hess',
  //     value: 'Jenny Hess',
  //   },
  // ]

  // const dropdownOrganization = () => (
  //   <Dropdown
  //   placeholder='Select Organization'
  //   fluid
  //   selection
  //   options={organizationsOptions}
  //   />
  //   )

  const renderOrganizations = (id) => {
    return organizations.map(organization => (
      <StyledCon>
        <Card key={`organization-${id}`}>
          <Card.Content>
            <Card.Header>{organization.name}</Card.Header>
            <Card.Description>{organization.contact_email}</Card.Description>
            <Card.Description>{organization.contact_phone}</Card.Description>
            <Card.Description>{organization.zipcode}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Link to={{ pathname: `/organization/${organization.id}/edit`, organization: { ...organization } }}>
                <Button basic color="blue">Edit</Button>
              </Link>
              <Button onClick={() => deleteOrganization(organization.id)}> Delete organization </Button>
            </div>
          </Card.Content>
          <Link to={{pathname:'/pet/create', organization_id: organization.id }}>
           <Button> Add a Pet </Button>
          </Link>
          <Pets organization_id={organization.id} />
        </Card>
      </StyledCon>
    ))
  }

  return (
    <>
      {/* {dropdownOrganization()} */}
      <Link to={{ pathname: `/organization/create` }}>
        <Button>Create an Organization</Button>
      </Link>
      <Header> Find Your Pet </Header>
    
      <br />
      {renderOrganizations()}
    </>
  )
}

const StyledCon = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;
export default FindYourPet