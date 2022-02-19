import { useTheme } from "@emotion/react";
import { Button, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { FontRender } from "./FontRender";

export const FontView = ({ fontData }) => {
	const theme = useTheme();
	return (
		<div style={{ width: "100%" }}>
			<Paper style={{ display: "flex", padding: 10, flexWrap: "wrap" }}>
				<Typography sx={{ flexGrow: 1 }}>
					Font Family: {fontData.familyName}
				</Typography>
				<Typography>Font fullName: {fontData.fullName}</Typography>
			</Paper>
			<Paper>
				<Button
					sx={{
						width: "100%",
					}}
					size="large"
					component="a"
					href={`${process.env.REACT_APP_S3_URL}/${fontData.filename}`}
				>
					<Typography variant="h6" style={{ fontWeight: 500 }}>
						Pobierz
					</Typography>
				</Button>
			</Paper>
			<FontRender fontData={fontData} />
		</div>
	);
};
