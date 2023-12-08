"use client";
import { useState, useEffect, useRef } from "react";
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
	const [filteredPrompts, setFilteredPrompts] = useState([]);
	const timeOutRef = useRef(null);
	const [searchInput, setSearchInput] = useState("");

	const filterResults = (inputValue) => {
		const filteredPrompts = prompts.filter(prompt => {
			return prompt.creator.username.includes(inputValue)
			 	|| prompt.prompt.includes(inputValue)
				|| prompt.tag.includes(inputValue)
			}
		)
		setFilteredPrompts(filteredPrompts);
	}

	const onSearchChange = (e) => {
		if(timeOutRef.current) {
			clearTimeout(timeOutRef.current);
		}
		timeOutRef.current = setTimeout(() => {
			timeOutRef.current = null;
			filterResults(e.target.value)
		}, 350)
		setSearchInput(e.target.value);
	}

	const handleTagClick = (tag) => {
		setSearchInput(tag);
		filterResults(tag);
	}

	useEffect(() => {
		fetchPrompts().then(setPrompts);
	}, [])

	const promptsToRender =  searchInput.length > 0 ? filteredPrompts : prompts;

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					required
					className='search_input peer'
					value={searchInput}
					onChange={onSearchChange}
				/>
			</form>
			<PromptCardList data={promptsToRender} handleTagClick={handleTagClick} />
		</section>
	)
};

export default Feed;