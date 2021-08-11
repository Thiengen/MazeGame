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

	loadAssets(assetType, sources, getData = undefined) {
		const sourceAssets = new assets(assetType);
		this.assetCount += Object.keys(sources).length;
		const dataGetter = getData
			? getData
			: (sources) => {
					this.readyAssetCount += Object.keys(sources).length - 1;
					this.onAssetReady();
					return sources;
			  };
		sourceAssets.insertData(dataGetter(sources));
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

class assets {
	constructor(type) {
		this.type = type;
		this.childAssets = [];
	}

	insertData(data) {
		this.data = data;
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
