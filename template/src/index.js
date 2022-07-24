import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home({ documentation }) {
	const [copyText, setCopyText] = useState(`Copy`)

	const copiedText = (e) => {
		navigator.clipboard.writeText(`npm i ${documentation.name}`)
		setCopyText('Copied!')
	}

	return (
		<>
			<Head>
				<title>{`The ${documentation.properName} Project`}</title>
				<meta name='description' content={documentation.description} />
				<link rel='icon' href='/favicon.ico' />
				<link rel='stylesheet' href='/globals.css' />
			</Head>
			<header>
				<nav>
					<h3 className='logo'>
						<a href="/">
							{documentation.name}
						</a>
					</h3>
					<ul>
						{/* <li>
							<a href='/docs'>docs</a>
						</li> */}
						{(documentation.repo) ? (
							<li>
							<a href={documentation.repo.url}>{documentation.repo.source}</a>
							</li>
						) : (
							<></>
						)}
						{(documentation.donate) ? (
							<li>
							<a href={documentation.donate.url}>Donate</a>
							</li>
						) : (
							<></>
						)}
					</ul>
				</nav>
			</header>
			<main>
				<h1>{ documentation.description }</h1>
				<div className='command-content'>
					<h3>Install {documentation.properName} Version {documentation.version}</h3>
					<p>
						To download the project from NPM, just use one of the two commands below. This
						will include {documentation.properName} as a package in your dependency tree.
					</p>
					<button
						className='copy-command'
						data-copy-option={copyText}
						onClick={copiedText}
					>
						&gt; npm i {documentation.name}
					</button>
					<p>
						<a href={`https://www.npmjs.com/package/${documentation.name}`}>Check it out on NPM</a>
					</p>
				</div>
			</main>
		</>
	)
}

function cleanNPMData({ globalData, latestData }) {

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

export const getStaticProps = async () => {
	// const res = await fetch('https://registry.npmjs.com/@atlaskit%2Fbutton/latest')
	// const res = await fetch('https://registry.npmjs.com/core-js/latest')

	const latestRes = await fetch('https://registry.npmjs.com/burm/latest')
	const latestData = await latestRes.json()

	const globalRes = await fetch('https://registry.npmjs.com/burm')
	const globalData = await globalRes.json()

	return {
		props: {
			documentation: cleanNPMData({ latestData, globalData })
		},
	}
}
