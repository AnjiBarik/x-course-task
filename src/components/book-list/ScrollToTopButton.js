import React, { useState, useEffect } from 'react';
import './scrollToTopButton.css';
export default function ScrollToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 200) {
				setBackToTopButton(true);
			} else {
				setBackToTopButton(false);
			}
		});
	}, []);

	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			{backToTopButton && (
				<button className="btn-up" onClick={scrollUp}>
					🔼
				</button>
			)}
		</>
	);
}