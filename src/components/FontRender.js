import { ExpandCircleDown } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";

export const FontRender = ({ fontData }) => {
	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				expandIcon={<ExpandCircleDown />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>Podgląd</Typography>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					backgroundColor: "white",
					color: "black",
					fontSize: "2.5rem",
				}}
			>
				<div>
					<div
						dangerouslySetInnerHTML={{
							__html: `
                            <style>
                                @font-face {
                                    font-family: '${fontData.familyName}';
                                    src:  url('${process.env.REACT_APP_S3_URL}/${fontData.filename}');
                                }
                            </style>
                            `,
						}}
					/>
					<div style={{ fontFamily: fontData.familyName }}>
						Zażółć gęślą jaźń
						<br />
						1234567890
					</div>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};
