import Head from 'next/head'
import { useState } from 'react'

export default function Home({  }) {
	const [copyText, setCopyText] = useState(`Copy`)

	const copiedText = (e) => {
		navigator.clipboard.writeText(`npm i ${packageData.name}`)
		setCopyText('Copied!')
	}

	return (
		<>
			<Head>
				<title>{`The ${packageData.properName} Project`}</title>
				<meta name='description' content={packageData.description} />
				<link rel='icon' href='/favicon.ico' />
				<link rel='stylesheet' href='/style.css' />
			</Head>
			<header>
				<nav>
					<h3 className='logo'>
						<a href="/">
							{packageData.name}
						</a>
					</h3>
					<ul>
						{/* <li>
							<a href='/docs'>docs</a>
						</li> */}
						{(packageData.repo) ? (
							<li>
							<a href={packageData.repo.url}>{packageData.repo.source}</a>
							</li>
						) : (
							<></>
						)}
						{(packageData.donate) ? (
							<li>
							<a href={packageData.donate.url}>Donate</a>
							</li>
						) : (
							<></>
						)}
					</ul>
				</nav>
			</header>
			<main>
				<h1>{ packageData.description }</h1>
				<div className='command-content'>
					<h3>Install {packageData.properName} Version {packageData.version}</h3>
					<p>
						To download the project from NPM, just use one of the two commands below. This
						will include {packageData.properName} as a package in your dependency tree.
					</p>
					<button
						className='copy-command'
						data-copy-option={copyText}
						onClick={copiedText}
					>
						&gt; npm i {packageData.name}
					</button>
					<p>
						<a href={`https://www.npmjs.com/package/${packageData.name}`}>Check it out on NPM</a>
					</p>
				</div>
			</main>
		</>
	)
}
