import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontView } from "../components/FontView";
import useDebounce from "../components/useDebounce";
import { searchFonts } from "../functions";

export const FontSearch = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState(null);
	const debounceSearchTerm = useDebounce(search, 500);
	const location = useLocation();
	const nav = useNavigate();
	useEffect(() => {
		const s = new URLSearchParams(location.search).get("s");
		if (s) {
			setSearch(s);
		}
	}, []);

	useEffect(() => {
		if (search) {
			nav(`/?s=${search}`);
			searchFonts(search)
				.then((fonts) => {
					setResults(fonts);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [debounceSearchTerm]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "80%",
				gap: "50px",
				marginTop: 50,
			}}
		>
			<TextField
				label="Podaj nazwę czcionki"
				fullWidth
				type="text"
				variant="standard"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			></TextField>
			{!results ? null : (
				<>
					{results.map((e) => (
						<FontView key={e._id} fontData={e}></FontView>
					))}
				</>
			)}
		</div>
	);
};
