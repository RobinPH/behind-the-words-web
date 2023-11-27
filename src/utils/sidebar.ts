const getSidebarInput = () => {
	return document.getElementById('my-drawer-3');
};

export const openSidebar = () => {
	const siderBarInput = getSidebarInput();

	if (siderBarInput) {
		siderBarInput.checked = true;
	}
};

export const closeSidebar = () => {
	const siderBarInput = getSidebarInput();

	if (siderBarInput) {
		siderBarInput.checked = false;
	}
};
