'use client';

import React from 'react';
import { PoptartProvider } from 'react-poptart';

interface Props {
	children: React.ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
	return <PoptartProvider>{children}</PoptartProvider>;
}
