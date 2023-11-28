export const truncate = (text: string, maxLength = 100) => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}

	return text;
};
