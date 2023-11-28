export type PredictionTask = {
	id: string;
	type: 'text' | 'file';
	input: any;
	includeCNN: boolean;
	callback?: (res: any) => void;
	partialResult?: PartialResult;
} & { [key: string]: any };

export type PartialResult = {
	current_task: string;
	current_task_index: number;
	total_tasks: number;
};

export type PredictionResult = {
	result: {
		probability: number;
	};
};

export type PartialResultCallback = (partialResult: PartialResult) => void;
