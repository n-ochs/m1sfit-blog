export async function asyncForEach<T>(arr: T[], cb: (value: T, i: number, arr: T[]) => Promise<void>): Promise<void> {
	for (let i: number = 0; i < arr.length; i++) {
		await cb(arr[i], i, arr);
	}
}
