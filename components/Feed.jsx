"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const fetchPrompts = async () => {
	const response = await fetch("/api/prompt/");
	return await response.json();
}

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((prompt) => (
				<PromptCard
					key={prompt._id}
					prompt={prompt}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [prompts, setPrompts] = useState([]);

	const handleTagClick = () => {}

	useEffect(() => {
		fetchPrompts().then(setPrompts);
	}, [])

	if(!prompts.length) {
		return null;
	}

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					required
					className='search_input peer'
				/>
			</form>
			<PromptCardList data={prompts} handleTagClick={handleTagClick} />
		</section>
	)
};

export default Feed;