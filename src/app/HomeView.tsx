'use client';

// Components
import React, { useState, useCallback, useEffect } from 'react';
import PasswordFeedback from '@/components/PasswordFeedback';

// Utilities
import checkPasswordStrength from '@/lib/passwordStrength';
import { debounce } from 'lodash-es';
import { usePoptart } from 'react-poptart';

// Types
import type { ZXCVBNResult } from 'zxcvbn';

const minScore = 3;

export default function HomeView() {
	const poptart = usePoptart();

	// State
	const [password, setPassword] = useState('');
	const [zxcvbn, setZxcvbn] = useState<ZXCVBNResult | null>(null);
	const [score, setScore] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// This function checks the password strength using the CloudFlare endpoint
	const handleCheckPasswordStrength = async (password: string) => {
		setIsLoading(true);
		try {
			const result = await checkPasswordStrength(password);
			setZxcvbn(result);
			setScore(result.score);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	// This is a debounced version of the password strength checker
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedCheckPasswordStrength = useCallback(debounce(handleCheckPasswordStrength, 500), []);

	// Effects
	useEffect(() => {
		if (password) {
			debouncedCheckPasswordStrength(password);
		} else {
			setZxcvbn(null);
			setScore(0);
		}
	}, [password, debouncedCheckPasswordStrength]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setError(null);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (score < minScore) {
			const message = 'Password is too weak';
			setError(message);
			poptart.push({ message, type: 'error' });
		} else {
			setError(null);
			poptart.push({ message: 'Password is strong!', type: 'success' });
		}
	};

	// Render
	return (
		<form className="w-full max-w-lg m-auto flex flex-col gap-6 p-6 border-2 rounded-xl" onSubmit={handleSubmit}>
			<h1 className="text-2xl font-bold text-center">Password Strength Checker</h1>
			<label className="form-control w-full">
				<div className="label">
					<span className="label-text">Password</span>
				</div>
				<input
					type="password"
					placeholder="Enter password"
					className="input input-bordered w-full"
					value={password}
					onChange={handleChange}
				/>
				<div className="label">
					<span className="label-text-alt text-error">{error}</span>
				</div>
			</label>
			<PasswordFeedback zxcvbn={zxcvbn} minScore={minScore} isLoading={isLoading} />
			<button className="btn btn-primary" type="submit">
				Submit
			</button>
		</form>
	);
}
