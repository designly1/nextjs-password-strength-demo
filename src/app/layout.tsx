import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Link from 'next/link';

import LayoutWrapper from './LayoutWrapper';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
});

export const metadata: Metadata = {
	title: 'Password Strength Meter',
	description: 'This is a demo app that uses zxcvbn to score passwords.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<main className="min-h-screen bg-base-100 text-base-content font-sans text-lg flex flex-col">
					<LayoutWrapper>
						{children}
						<footer className="mt-auto flex items-center justify-between py-2 px-4">
							<div className="">
								Notifications by{' '}
								<Link
									className="link-primary"
									href="https://react-poptart.vercel.app/"
									target="_blank"
									rel="noopener noreferrer"
								>
									React-Poptart
								</Link>
							</div>
							<div>
								&copy; {new Date().getFullYear()} -{' '}
								<Link
									className="link-primary"
									href="https://designly.biz"
									target="_blank"
									rel="noopener noreferrer"
								>
									Designly
								</Link>
							</div>
						</footer>
					</LayoutWrapper>
				</main>
			</body>
		</html>
	);
}
