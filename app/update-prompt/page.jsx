"use client";
import Form from "@components/Form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const UpdatePrompt = () => {
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});
	const searchParams = useSearchParams();
	const postId = searchParams.get('id');
	const router = useRouter();

	const getPrompt = async (id) => {
		const response =  await fetch(`/api/prompt/${id}/`);
		return await response.json();
	}

	useEffect(() => {
		if(postId) {
			getPrompt(postId).then(setPost);
		}
	}, [postId]);

	const editPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch(`/api/prompt/${postId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag
				})
			});
			if(response.ok) {
				router.push('/profile');
			}
		} catch (e) {
			console.log(e)
		} finally {
			setSubmitting(false);
		}
	}


	return (
		<Form
			type="Update"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={editPrompt}
		/>
	)
}

export default UpdatePrompt;