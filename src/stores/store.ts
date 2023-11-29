import { getResult, getUserResults, predict, predictFromFile } from '$lib/BackendUtils';
import { getLocalStorageItem } from '$lib/LocalStorageUtils';
import { get, writable } from 'svelte/store';
import type { PartialResult, PredictionResult, PredictionTask } from '../types/types';

export const userResults = writable<PredictionResult[]>([]);

export const updateUserResults = async () => {
	const results = await getUserResults(getLocalStorageItem('user-id'));
	userResults.set(results.reverse());
};

export const viewingResult = writable();

export const setViewingResultId = (id: string) => {
	viewingResult.set(null);
	isFetchingResult.set(true);

	getResult(id)
		.then((result) => {
			viewingResult.set(result);
		})
		.finally(() => {
			isFetchingResult.set(false);
		});
};

viewingResult.subscribe((result) => {
	if (!result) {
		return;
	}

	userResults.update((results) =>
		results.map((res) => {
			if (res._new) {
				if (res.id === result.id) {
					res._new = false;
				}
			}

			return res;
		})
	);
});

export const isFetchingResult = writable(false);

export const predictionTaskQueue = writable<PredictionTask[]>([]);

export const processingPredictionTasks = writable<PredictionTask[]>([]);

export const queuePredictionTasks = (...predictionTasks: PredictionTask[]) => {
	predictionTaskQueue.update((queue) => [...queue, ...predictionTasks]);
};

const processPredictionTask = (predictionTask: PredictionTask) => {
	processingPredictionTasks.update((tasks) => [...tasks, predictionTask]);

	let promise: Promise<PredictionResult> | undefined;

	if (predictionTask.type === 'text') {
		promise = predict(
			predictionTask.input.text,
			predictionTask.includeCNN,
			(data: PartialResult) => {
				predictionTask.partialResult = data;
				refreshProcessingPredictionTasks();
			}
		);
	} else if (predictionTask.type === 'file') {
		promise = predictFromFile(
			predictionTask.input.file,
			predictionTask.includeCNN,
			(data: PartialResult) => {
				predictionTask.partialResult = data;
				refreshProcessingPredictionTasks();
			}
		);
	}

	if (promise) {
		predictionTask.isProcessing = true;
		promise
			.then((result: PredictionResult) => {
				predictionTask.callback?.(result);

				nextPredictionTask();
				completePredictionTask(predictionTask);

				userResults.update((results) => [{ ...result, _new: true }, ...results]);
			})
			.catch((e) => {
				console.log(e);
				nextPredictionTask();
			})
			.finally(() => {});
	}
};

export const nextPredictionTask = () => {
	const queue = get(predictionTaskQueue);
	const predictionTask = queue.shift();

	if (!predictionTask) {
		return;
	}

	predictionTaskQueue.set([...queue]);
	processPredictionTask(predictionTask);
};

export const completePredictionTask = (predictionTask: PredictionTask) => {
	processingPredictionTasks.update((tasks) =>
		tasks.filter((task) => task.id !== predictionTask.id)
	);
};

export const refreshProcessingPredictionTasks = () => {
	processingPredictionTasks.update((tasks) => tasks);
};

predictionTaskQueue.subscribe(() => {
	if (get(processingPredictionTasks).length === 0) {
		nextPredictionTask();
	}
});
