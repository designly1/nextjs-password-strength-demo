import type { ZXCVBNResult } from 'zxcvbn';

export default async function checkPasswordStrength(password: string): Promise<ZXCVBNResult> {
	const url = process.env.NEXT_PUBLIC_CF_URL!;
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password }),
	});
	return await response.json();
}
