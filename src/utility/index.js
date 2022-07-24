export function cleanNPMData({ globalData, latestData }) {

	let properName = latestData.name;

	properName = `${properName[0].toUpperCase()}${properName.slice(1).toLowerCase()}`;
	
	let donate = false;
	if (latestData.funding) {

		let fundingUrl = "";

		if (typeof latestData.funding === 'string') fundingUrl = latestData.funding;
		if (typeof latestData.funding === 'object') fundingUrl = latestData.funding.url;
		if (typeof latestData.funding === 'array') {
			
			if (typeof latestData.funding[0] === 'string') fundingUrl = latestData.funding[0];
			if (typeof latestData.funding[0] === 'object') fundingUrl = latestData.funding[0].url;
		
		}

		donate = { url: fundingUrl };

	}

	let repo = false;
	if (latestData.repository) {

		let repoUrl = "";
		let repoSource = "Sourcecode";

		if (typeof latestData.repository === 'string') repoUrl = latestData.repository;
		if (typeof latestData.repository === 'object') repoUrl = latestData.repository.url;
		if (typeof latestData.repository === 'array') {

			if (typeof latestData.repository[0] === 'string') repoUrl = latestData.repository[0];
			if (typeof latestData.repository[0] === 'object') repoUrl = latestData.repository[0].url;

		}

		let testUrl = repoUrl.replace(/(https|http|git\+)|(\:)|(\/\/)/g, '').toLowerCase();
		if (repoUrl.startsWith('git+')) repoUrl = repoUrl.slice(4);
		if (repoUrl.endsWith('.git')) repoUrl = repoUrl.slice(0, repoUrl.length - 4);

		if (testUrl.startsWith("github")) repoSource = "Github";
		if (testUrl.startsWith("npm")) repoSource = "NPM";
		if (testUrl.startsWith("gist")) repoSource = "Gist";
		if (testUrl.startsWith("bitbucket")) repoSource = "bitbucket";
		if (testUrl.startsWith("gitlab")) repoSource = "gitlab";

		repo = {
			source: repoSource,
			url: repoUrl
		};

	}

	return {
		properName,
		donate,
		repo,
		...latestData,
		...globalData
	};

}
