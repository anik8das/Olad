import React from 'react'
import { Container, Table, Button } from 'react-bootstrap'

export default function Account() {
  return (
    <Container className="w-50 mt-5">
        <div className="h2 mb-4">Account information</div>
        <Table hover className='mb-3'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>Nature</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>admin@nature.com</td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>nature.com</td>
                </tr>
            </tbody>
        </Table>
        <Button variant='secondary'>Edit Information</Button> {" "}
        <Button variant='secondary'>Change password</Button>

    </Container>
    )
}