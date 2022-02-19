import {
	Button,
	CircularProgress,
	Dialog,
	IconButton,
	DialogContent,
	Typography,
	Paper,
} from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { checkIfFontsInDB } from "../functions";

const workerParser = new Worker(
	new URL("../workers/parser.worker.js", import.meta.url)
);

export const SubtitleScan = () => {
	const [filename, setFilename] = useState("Nie wybrano pliku");
	const [isFilenameSet, setIsFilenameSet] = useState(false);
	const [fonts, setFonts] = useState([]);
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isWorkerDone, setIsWorkerDone] = useState(false);
	const [open, setOpen] = useState(false);
	const [foundFonts, setFoundFonts] = useState([]);
	const [notfoundFonts, setNotFoundFonts] = useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const setFileInfo = (e) => {
		const f = e.target.files[0];
		setFilename(f.name);
		setIsFilenameSet(true);
		setFile(f);
	};

	workerParser.onmessage = (e) => {
		setFonts(e.data.fonts);
		setIsWorkerDone(true);
		setIsLoading(false);
	};

	const clearFile = () => {
		const doc = document.getElementById("fileInput");
		if (doc) doc.value = "";
		setFilename("Nie wybrano pliku");
		setIsFilenameSet(false);
		setFonts([]);
		setIsLoading(false);
		setIsWorkerDone(false);
	};

	const checkIfInDB = () => {
		checkIfFontsInDB(fonts).then((res) => {
			setFoundFonts(res["find"]);
			setNotFoundFonts(res["unfind"]);
			handleClickOpen();
		});
	};

	const SimpleDialog = () => {
		return (
			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 20,
						}}
					>
						Znalezione czcionki:
						<div
							style={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							{foundFonts.map((font) => (
								<span>
									{font.fullName}{" "}
									<Button
										component="a"
										href={`${process.env.REACT_APP_S3_URL}/${font.filename}`}
									>
										Pobierz
									</Button>
								</span>
							))}
						</div>
						Nie znalezione (możliwe, że wystepują w bazie pod lekko zmianioną
						nazwą (brak spacji, myślnika itp.))
						<div
							style={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							{notfoundFonts.map((font) => (
								<span>{font}</span>
							))}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	};

	const UploadButton = () => {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 10,
					width: "100%",
					marginTop: 50,
				}}
			>
				<Paper>
					<Button component="label">
						Wybierz plik
						<input
							id="fileInput"
							type="file"
							accept=".ass"
							hidden
							onChange={setFileInfo}
						/>
					</Button>
				</Paper>
				<span style={{ flexGrow: 1 }}>{filename}</span>
				<span>
					{isFilenameSet ? (
						<IconButton onClick={clearFile}>
							<ClearIcon />
						</IconButton>
					) : null}
				</span>
			</div>
		);
	};

	const ResultUI = () => {
		return (
			<div>
				<Paper>
					<Button onClick={checkIfInDB} style={{ width: "100%" }} size="large">
						Wyszukaj czcionki w bazie
					</Button>
				</Paper>
				<SimpleDialog />
				<div style={{ marginTop: 15 }}>
					<Typography variant="h6">Czcionki użyte w napisach</Typography>
					<ul>
						{fonts.map((e) => (
							<li>{e}</li>
						))}
					</ul>
				</div>
			</div>
		);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 10,
				width: "100%",
				justifyContent: "center",
				marginTop: 50,
			}}
		>
			<Typography variant="h4" align="center">
				Wybierz plik do przetworzenia
			</Typography>
			<UploadButton />
			{!isFilenameSet ? null : (
				<Paper>
					<Button
						onClick={() => {
							workerParser.postMessage({ file });
							setIsLoading(true);
						}}
						style={{ width: "100%" }}
					>
						Przetwarzaj plik
					</Button>
				</Paper>
			)}
			{isLoading ? (
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						marginTop: 200,
					}}
				>
					<CircularProgress color="primary" />
				</div>
			) : isWorkerDone ? (
				<ResultUI />
			) : null}
		</div>
	);
};
