import React from 'react'
import {Table, Button, Segment, Form} from 'semantic-ui-react'

const UserAccountInfo = props => {
  return (
    <div>
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
                <Table.Cell>
                  {props.user.name ? props.user.name : ''}
                </Table.Cell>
                <Table.Cell>
                  <Form onSubmit={props.updateName}>
                    <Form.Input name="name" type="text" />
                    <Button color="orange" type="submit">
                      Update Name
                    </Button>
                  </Form>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Email</Table.Cell>
                <Table.Cell>{props.user.email}</Table.Cell>
                <Table.Cell>
                  <Form onSubmit={props.updateEmail}>
                    <Form.Input name="email" type="text" />
                    <Button color="yellow" type="submit">
                      Update Email
                    </Button>
                  </Form>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Occupation</Table.Cell>
                <Table.Cell>
                  {props.user.occupation ? props.user.occupation : ''}
                </Table.Cell>
                <Table.Cell>
                  <Form onSubmit={props.updateOccupation}>
                    <Form.Input name="occupation" type="text" />
                    <Button color="purple" type="submit">
                      Update Occupation
                    </Button>
                  </Form>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </div>
      <div>
        <Segment raised padded>
          {props.videos.length > 0 ? (
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Video Archive Id</Table.HeaderCell>
                  <Table.HeaderCell>Video Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {props.videos.map(video => (
                  <Table.Row key={video.id}>
                    <Table.Cell>{video.archiveId}</Table.Cell>
                    <Table.Cell>{video.name}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => props.selectVideo(video.archiveId)}
                      >
                        Replay
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <h3 style={{color: 'black'}}>No video history available</h3>
          )}
        </Segment>
      </div>
    </div>
  )
}

export default UserAccountInfo
