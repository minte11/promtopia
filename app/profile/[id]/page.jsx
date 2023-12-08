"use client";

import { useState, useEffect } from "react";

import Profile from "@components/profile";
import {useSearchParams} from "next/navigation";

const fetchPrompts = async (userId) => {
	const response = await fetch(`/api/users/${userId}/posts/`);
	return await response.json();
}


const UserProfile = ({ params }) => {
	const [prompts, setPrompts] = useState([]);
	const {id: userId } = params;
	const userName = useSearchParams().get('name');

	useEffect(() => {
		if(userId) {
			fetchPrompts(userId).then(setPrompts);
		}
	}, [userId])

	return (
		<Profile
			name={userName}
			description={`${userName}'s personal profile page`}
			data={prompts}
		/>
	)
};

export default UserProfile;