export const searchFonts = async (search) => {
	const f = await fetch(`${process.env.REACT_APP_API_URL}?s=${search}`);
	if (!f.ok) return null;
	const fonts = await f.json();
	return fonts;
};
