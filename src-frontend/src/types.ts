import type AppError from "./lib/AppError";

export type Dictionary<T> = { [key: string]: T }

export type LoadingObject<T> = { error?: AppError, data?: T };
