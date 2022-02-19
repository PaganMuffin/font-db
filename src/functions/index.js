export const searchFonts = async (search) => {
	const f = await fetch(`${process.env.REACT_APP_API_URL}?s=${search}`);
	if (!f.ok) return null;
	const fonts = await f.json();
	return fonts;
};

export const checkIfFontsInDB = async (fonts) => {
	const f = await fetch(`${process.env.REACT_APP_API_URL}/ass`, {
		method: "POST",
		body: JSON.stringify({ fonts: fonts }),
	});
	if (!f.ok) return null;
	const r = await f.json();
	return r;
};
