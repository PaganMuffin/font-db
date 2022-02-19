import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import { FontSearch } from "./pages/FontSearch";
import { SubtitleScan } from "./pages/SubtitleScan";

export const App = () => {
	return (
		<div>
			<AppBar position="static" style={{ padding: 5 }}>
				<Toolbar>
					<Link
						to={"/"}
						style={{ flexGrow: 1, textDecoration: "none", color: "white" }}
					>
						<Typography variant="h4">F-DB</Typography>
					</Link>
					<Link to={"/scan"} style={{ textDecoration: "none" }}>
						<Button sx={{ padding: 1 }}>
							<Typography variant="h6">Skanuj napisy</Typography>
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
			<div
				style={{
					maxWidth: "1024px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignContent: "center",
					margin: "0 auto",
				}}
			>
				<Routes>
					<Route path="/scan" element={<SubtitleScan />} />
					<Route path="/" element={<FontSearch />} />
				</Routes>
			</div>
		</div>
	);
};
