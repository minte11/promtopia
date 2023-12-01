"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const fetchPrompts = async (userId) => {
	const response = await fetch(`/api/users/${userId}/posts/`);
	return await response.json();
}


const MyProfile = () => {
	const [prompts, setPrompts] = useState([]);
	const {data: session } = useSession();
	const userId = session?.user.id;

	const handleEdit = () => {}
	const handleDelete = () => {}

	useEffect(() => {
		if(userId) {
			fetchPrompts(userId).then(setPrompts);
		}
	}, [userId])

	return (
		<Profile
			name="My Profile"
			description="Welcome to your personal profile page"
			data={prompts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
};

export default MyProfile;