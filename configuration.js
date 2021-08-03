class configuration {
	assetCount = 0;
	readyAssetCount = 0;

	constructor() {
		this.assets = new assets("General");
		this.onAllAssetReadyEvent = new Event("OnAllAssetsReady");
		this.loadedResource = 0;
	}

	onAssetReady() {
		this.readyAssetCount++;
		this.loadedResource = floor((this.readyAssetCount / this.assetCount) * 100);
		// console.log("Ready");
		if (this.readyAssetCount >= this.assetCount) {
			console.log("All assets are ready to use !!!");
			document.dispatchEvent(this.onAllAssetReadyEvent);
		}
	}

	loadAssets(assetType, sources, getData) {
		const sourceAssets = new assets(assetType);
		for (const source of sources) {
			getData ? sourceAssets.push(getData(source)) : sourceAssets.push(source);
		}
		this.assetCount += sourceAssets.length;
		this.assets.childAssets.push(sourceAssets);
	}

	getResourceAssets() {
		if (this.assets.length <= 0 && this.assets.childAssets.length <= 0) {
			console.log("No data in asset");
			return;
		}
		return this.assets;
	}
}

class assets extends Array {
	constructor(type) {
		super();
		this.type = type;
		this.childAssets = [];
	}

	getChildAssetByType(type) {
		for (const childAsset of this.childAssets) {
			if (childAsset.type === type) {
				return childAsset;
			}
		}
		return undefined;
	}
}
