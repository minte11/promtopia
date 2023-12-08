"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const fetchPrompts = async (userId) => {
	const response = await fetch(`/api/users/${userId}/posts/`);
	return await response.json();
}


const MyProfile = () => {
	const [prompts, setPrompts] = useState([]);
	const {data: session } = useSession();
	const userId = session?.user.id;
	const router = useRouter();

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	}
	const handleDelete = async (post) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

		if(!hasConfirmed) {
			return;
		}

		try {
			const response = await fetch(`/api/prompt/${post._id}`,{
				method: "DELETE",
			});
			await response.json();
			return await fetchPrompts(userId).then(setPrompts);
		} catch (e) {
			console.log(e);
		}
	}

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