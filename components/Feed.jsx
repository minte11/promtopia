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
		<PromptCardList data={prompts} handleTagClick={handleTagClick} />
	)
};

export default Feed;