import React from 'react';
import { getIcon } from './service';

interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
	name?: string;
}

export default function IconView({ name, ...props }: IconProps) {
	const IconComponent = getIcon(name);
	return <IconComponent {...props} />;
}
