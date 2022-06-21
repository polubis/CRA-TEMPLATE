import { ChangeEvent } from "react";
import { Observable, Subscription } from "rxjs";

export type Values = Record<string, unknown>;
export type Fn<T> = (value: T) => string;
export type Fns<V extends Values> = {
  [K in keyof V]?: Fn<V[K]>[];
};
export type Errors<V extends Values> = {
  [K in keyof V]: string;
};
export interface ValidationResult<V extends Values> {
  invalid: boolean;
  valid: boolean;
  errors: Errors<V>;
}
export interface Metadata {
  touched: boolean;
  untouched: boolean;
  confirmed: boolean;
  unconfirmed: boolean;
}
export interface OnEvent<V extends Values, K extends keyof V> {
  key: K;
  value: V[K];
}
export type FormSubmitEvent = { preventDefault: () => void };
export interface FormHandlers<V extends Values> {
  submit(e: FormSubmitEvent): void;
  confirm(): void;
  change(e: ChangeEvent<HTMLInputElement>): void;
  set<K extends keyof V>(key: K, value: V[K]): void;
  reset(): void;
  on<K extends keyof V>(
    key: K,
    filterFn?: (event: OnEvent<V, keyof V>) => boolean
  ): Observable<OnEvent<V, K>>;
}
export type Form<V extends Values> = Metadata &
  ValidationResult<V> &
  Errors<V> &
  FormHandlers<V> & {
    keys: (keyof V)[];
    values: V;
  };
