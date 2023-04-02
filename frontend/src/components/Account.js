import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { roleMap } from "./Constants";

export default function Account() {
	const { user } = useContext(UserContext);
	console.log(user);
	return (
		<Container className="w-50 mt-5">
			<div className="h2 mb-4">Account information</div>
			<Table hover className="mb-3">
				<tbody>
					<tr>
						<th>Account ID</th>
						<td>{user.userInfo.id}</td>
					</tr>
					<tr>
						<th>Role</th>
						<td>{roleMap[user.userRole]}</td>
					</tr>
					<tr>
						<th>Name</th>
						<td>{user.userInfo.name}</td>
					</tr>
					<tr>
						<th>Email</th>
						<td>{user.userInfo.email}</td>
					</tr>
					<tr>
						<th>Website</th>
						<td>{user.userInfo.website}</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
}
