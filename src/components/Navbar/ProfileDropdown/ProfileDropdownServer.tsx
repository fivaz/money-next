import ProfileDropdown from '@/components/Navbar/ProfileDropdown/ProfileDropdown';
import { getUser } from '@/lib/auth2/utils.actions';

export default async function ProfileDropdownServer() {
	const user = await getUser();
	return <ProfileDropdown user={user} />;
}
