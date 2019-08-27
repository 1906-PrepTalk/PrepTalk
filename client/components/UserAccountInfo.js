import React from 'react'
import {Table, Button, Segment} from 'semantic-ui-react'

const UserAccountInfo = props => {
  return (
    <div className="userInfoTable">
      <Segment raised padded>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User Information</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>insert name</Table.Cell>
              <Table.Cell>
                <Button color="orange">Update Name</Button>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>{props.user.email}</Table.Cell>
              <Table.Cell>
                <Button color="yellow">Update Email</Button>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Occupation</Table.Cell>
              <Table.Cell>insert occupation</Table.Cell>
              <Table.Cell>
                <Button color="purple">Update Occupation</Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </div>
  )
}

export default UserAccountInfo
