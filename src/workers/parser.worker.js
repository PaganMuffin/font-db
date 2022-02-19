import parseAss from "ass-parser";
onmessage = function ({ data }) {
	//const startDate = new Date().getTime();
	//console.log(data);
	const file = data.file;
	const reader = new FileReader();
	reader.onloadend = (e) => {
		const data = e.target.result;
		//console.log(data.length);
		const parsedASS = parseAss(data);
		//console.log(parsedASS);

		//Getting fonts from styles
		let stylesFonts = parsedASS
			.find((x) => x.section === "V4+ Styles")
			?.body?.map((x) => {
				if (x.key === "Style") {
					return x.value.Fontname;
				}
			});

		//Getting fotns from dialogues
		let dialogueFonts = parsedASS
			.find((x) => x.section === "Events")
			?.body?.map((x) => {
				if (x.key === "Dialogue") {
					try {
						const firstPart = x.value.Text.split("\\fn")[1];
						const firstSpecial = firstPart.match(/[}\\]/);
						const final = firstPart.slice(0, firstSpecial.index).trim();
						return final;
					} catch (e) {}
				}
			});

		stylesFonts = [...new Set(stylesFonts)].filter((x) => x);
		dialogueFonts = [...new Set(dialogueFonts)].filter((x) => x);
		const fonts = [...stylesFonts, ...dialogueFonts];
		//console.log(fonts);
		//console.log(new Date().getTime() - startDate);
		postMessage({ fonts });
	};

	reader.readAsText(file);
};
