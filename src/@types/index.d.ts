declare type Replace<T, R> = Omit<T, keyof R> & R;

declare namespace Express {
	export interface Request {
		userId: string;
	}
}
