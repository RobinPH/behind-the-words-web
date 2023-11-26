import { getResult } from '$lib/BackendUtils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const result = await getResult(params.id);

	return result;
};
