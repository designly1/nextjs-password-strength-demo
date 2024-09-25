import React from 'react';
import { FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import type { ZXCVBNResult } from 'zxcvbn';

interface Props {
	zxcvbn: ZXCVBNResult | null;
	className?: string;
}

// Define color stops for each score level
const colors = ['#FF0000', '#FF4400', '#FFA200', '#FFFF00', '#37FF00'];
const words = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const minScore = 3;

export default function PasswordFeedback({ zxcvbn, className = '' }: Props) {
	// Calculate the score index (0-4)
	const score = zxcvbn ? Math.min(zxcvbn.score, 4) : 0;

	// Create gradient stops based on score
	const gradientStops = colors
		.map((color, index) => `${color} ${(index / 4) * 100}%`)
		.slice(0, score + 1)
		.join(', ');

	// Width of the filled portion of the bar
	const widthPercentage = (score / 4) * 100;

	const feedbackDisplay = zxcvbn ? zxcvbn.crack_times_display.offline_slow_hashing_1e4_per_second : '_______';

	return (
		<div className={`flex flex-col ${className}`}>
			<div className="text-sm">
				<span className="font-bold">Password Strength:</span> {words[score]}
			</div>
			<div className="flex items-center gap-2 w-full mt-1">
				<div className="w-full h-4 bg-gray-200 rounded overflow-hidden relative">
					<div
						className="h-full"
						style={{
							width: `${widthPercentage}%`,
							background: `linear-gradient(to right, ${gradientStops})`,
						}}
					></div>
				</div>
				<div className="text-xl">
					{score < minScore ? (
						<FaRegTimesCircle className="text-red-500" />
					) : (
						<FaRegCheckCircle className="text-green-500" />
					)}
				</div>
			</div>
			<div className="text-xs text-gray-500 mt-1">
				Your password would take&nbsp;
				<span className="font-bold">{feedbackDisplay}</span>
				&nbsp;to crack.
			</div>
			{zxcvbn && zxcvbn.feedback.suggestions.length > 0 ? (
				<div className="text-xs text-gray-800 mt-4">
					<span className="font-bold">Suggestions:</span>
					<ul className="list-disc list-inside mt-2">
						{zxcvbn.feedback.suggestions.map((suggestion, index) => (
							<li key={index}>{suggestion}</li>
						))}
					</ul>
				</div>
			) : (
				<div className="h-12" />
			)}
		</div>
	);
}
