/**
 * Steem URI Signing Protocol
 * @author Johan Nordberg <johan@steemit.com>
 */
import { Operation, Transaction } from 'dsteem';
/**
 * Protocol parameters.
 */
export interface Parameters {
    /** Requested signer. */
    signer?: string;
    /** Redurect uri. */
    callback?: string;
    /** Whether to just sign the transaction. */
    no_broadcast?: boolean;
}
/**
 * A transactions that may contain placeholders.
 */
export interface UnresolvedTransaction extends Transaction {
    ref_block_num: any;
    ref_block_prefix: any;
    expiration: any;
    operations: any[];
}
/**
 * Decoding result.
 */
export interface DecodeResult {
    /**
     * Decoded transaction. May have placeholders, use {@link resolve} to
     * resolve them into a signable transaction.
     */
    tx: UnresolvedTransaction;
    /**
     * Decoded protocol parameters.
     */
    params: Parameters;
}
/**
 * Parse a steem:// protocol link.
 * @param steemUrl The `steem:` url to parse.
 * @throws If the url can not be parsed.
 * @returns The resolved transaction and parameters.
 */
export declare function decode(steemUrl: string): DecodeResult;
/**
 * Transaction resolving options.
 */
export interface ResolveOptions {
    /** The ref block number used to fill in the `__ref_block_num` placeholder. */
    ref_block_num: number;
    /** The ref block prefix used to fill in the `__ref_block_prefix` placeholder. */
    ref_block_prefix: number;
    /** The date string used to fill in the `__expiration` placeholder. */
    expiration: string;
    /** List of account names avialable as signers. */
    signers: string[];
    /** Preferred signer if none is explicitly set in params. */
    preferred_signer: string;
}
/**
 * Transaction resolving result.
 */
export interface ResolveResult {
    /** The resolved transaction ready to be signed. */
    tx: Transaction;
    /** The account that should sign the transaction. */
    signer: string;
}
/**
 * Resolves placeholders in a transaction.
 * @param utx Unresolved transaction data.
 * @param params Protocol parameters.
 * @param options Values to use when resolving.
 * @returns The resolved transaction and signer.
 */
export declare function resolveTransaction(utx: UnresolvedTransaction, params: Parameters, options: ResolveOptions): ResolveResult;
/**
 * Transaction confirmation including signature.
 */
export interface TransactionConfirmation {
    /** Transaction signature. */
    sig: string;
    /** Transaction hash. */
    id?: string;
    /** Block number transaction was included in. */
    block?: number;
    /** Transaction index in block. */
    txn?: number;
}
/**
 * Resolves template vars in a callback url.
 * @param url The callback url.
 * @param ctx Values to use when resolving.
 * @returns The resolved url.
 */
export declare function resolveCallback(url: string, ctx: TransactionConfirmation): string;
/** Encodes a Steem transaction to a steem: URI. */
export declare function encodeTx(tx: Transaction, params?: Parameters): string;
/** Encodes a Steem operation to a steem: URI. */
export declare function encodeOp(op: Operation, params?: Parameters): string;
/** Encodes several Steem operations to a steem: URI. */
export declare function encodeOps(ops: Operation, params?: Parameters): string;
