function runEditor() {
	const buttons = [];

	const setColorsButton = createButton("Set colors");
	const saveColorsButton = createButton("Save colors");
	const useSavedColorButton = createButton("Use saved color");

	buttons.push(setColorsButton, saveColorsButton, useSavedColorButton);

	const spacing = 30;
	for (let i = 0, x = width / 2; i < buttons.length; i++) {
		buttons[i].position(x + i * spacing, height);
		x += buttons[i].size().width;
	}

	saveColorsButton.hide();

	setColorsButton.mousePressed(() => {
		buttonPos = setColorsButton.position();
		setColorsButton.hide();
		saveColorsButton.show();
		const colorsData = config.assets.getChildAssetByType("Color").data;
		const colorEditors = showColors(colorsData, buttonPos, undefined, undefined, { x: 0, y: 20 });
		createCloseButton(
			{
				x: buttonPos.x,
				y: buttonPos.y,
			},
			() => {
				colorEditors.colorPickers.forEach((element) => element.colorPicker.remove());
				colorEditors.colorLabels.forEach((element) => element.remove());
				setColorsButton.show();
				saveColorsButton.hide();
			}
		);

		saveColorsButton.mousePressed(() => {
			const data = {};

			colorEditors.colorPickers.forEach((element) => {
				data[element.key] = element.colorPicker.color();
			});

			createStringDict(data).saveJSON("m_Colors");
		});
	});

	useSavedColorButton.mousePressed(() => {
		const colorAsset = config.assets.getChildAssetByType("Color").data;
		loadJSON("./Colors/m_Colors.json", (data) => {
			for (const stringColor in data) {
				const colorData = data[stringColor];
				colorAsset[stringColor].levels = colorData.levels;
			}
		});
	});
}

function showColors(colorData, labelPosition, widthSpacing = 100, lineSpacing = 5, initialOffset = { x: 0, y: 0 }) {
	const colorPickers = [];
	const colorLabels = [];

	let row = 0;
	for (const key in colorData) {
		const colorValues = colorData[key].levels;
		const colorPicker = createColorPicker(color(colorValues[0], colorValues[1], colorValues[2]));
		const colorLabel = createP(key);
		colorLabel.style("color", color(255));
		colorLabel.position(initialOffset?.x + labelPosition.x, initialOffset?.y + labelPosition.y + (lineSpacing + colorPicker.size().height) * row);
		colorPicker.position(colorLabel.position().x + widthSpacing, colorLabel.position().y);
		colorLabels.push(colorLabel);
		colorPickers.push({ key, colorPicker });
		row++;
	}
	return { colorPickers, colorLabels };
}

function createCloseButton(position, onExit) {
	const closeButton = createButton("Close").position(position.x, position.y);
	closeButton.mousePressed(() => {
		closeButton.remove();
		onExit();
	});
}
