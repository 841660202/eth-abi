export interface AbiParameter {
  name: string;
  type: string;
  internalType: string;
  indexed?: boolean;
  components?: AbiParameter[];
}

export interface AbiFunction {
  type: "function";
  name: string;
  inputs: AbiParameter[];
  outputs: AbiParameter[];
  stateMutability?: "pure" | "view" | "nonpayable" | "payable";
}

export interface AbiEvent {
  type: "event";
  name: string;
  inputs: AbiParameter[];
  anonymous: boolean;
}
export interface AbiError {
  type: "error";
  name?: string;
  inputs: AbiParameter[];
}

export interface AbiConstructor {
  type: "constructor";
  inputs: AbiParameter[];
  stateMutability: "nonpayable" | "payable";
}

export interface AbiFallback {
  type: "fallback";
  stateMutability: "nonpayable" | "payable";
}

export interface AbiReceive {
  type: "receive";
  stateMutability: "payable";
}

export type AbiItem =
  | AbiFunction
  | AbiEvent
  | AbiConstructor
  | AbiFallback
  | AbiReceive
  | AbiError;

export type Abi = AbiItem[];

export type AbiForm = {
  id: string;
  desc: string;
  address: string;
  abi: string;
};
