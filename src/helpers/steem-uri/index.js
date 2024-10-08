"use strict";
/**
 * Steem URI Signing Protocol
 * @author Johan Nordberg <johan@steemit.com>
 */
// Object.defineProperty(exports, "__esModule", { value: true });
// Assumes node.js if any of the utils needed are missing.
if (typeof URL === 'undefined') {
    global['URL'] = require('url').URL;
}
if (typeof URLSearchParams === 'undefined') {
    global['URLSearchParams'] = require('url').URLSearchParams;
}
if (typeof btoa === 'undefined') {
    global['btoa'] = function (str) { return new Buffer(str, 'binary').toString('base64'); };
}
if (typeof atob === 'undefined') {
    global['atob'] = function (str) { return new Buffer(str, 'base64').toString('binary'); };
}
/// URL-safe Base64 encoding and decoding.
var B64U_LOOKUP = { '/': '_', '_': '/', '+': '-', '-': '+', '=': '.', '.': '=' };
var b64uEnc = function (str) { return btoa(str).replace(/(\+|\/|=)/g, function (m) { return B64U_LOOKUP[m]; }); };
var b64uDec = function (str) { return atob(str.replace(/(-|_|\.)/g, function (m) { return B64U_LOOKUP[m]; })); };
/**
 * Parse a steem:// protocol link.
 * @param steemUrl The `steem:` url to parse.
 * @throws If the url can not be parsed.
 * @returns The resolved transaction and parameters.
 */
export function decode(steemUrl) {
    var protocol = steemUrl.slice(0, 6);
    // workaround for chrome not parsing custom protocols correctly
    var url = new URL(steemUrl.replace(/^steem:/, 'http:'));
    if (protocol !== 'steem:') {
        throw new Error("Invalid protocol, expected 'steem:' got '" + protocol + "'");
    }
    if (url.host !== 'sign') {
        throw new Error("Invalid action, expected 'sign' got '" + url.host + "'");
    }
    var _a = url.pathname.split('/').slice(1), type = _a[0], rawPayload = _a[1];
    var payload;
    try {
        payload = JSON.parse(b64uDec(rawPayload));
    }
    catch (error) {
        error.message = "Invalid payload: " + error.message;
        throw error;
    }
    var tx;
    switch (type) {
        case 'tx':
            tx = payload;
            break;
        case 'op':
        case 'ops':
            var operations = type === 'ops' ? payload : [payload];
            tx = {
                ref_block_num: '__ref_block_num',
                ref_block_prefix: '__ref_block_prefix',
                expiration: '__expiration',
                extensions: [],
                operations: operations,
            };
            break;
        // case 'transfer':
        // case 'follow':
        default:
            throw new Error("Invalid signing action '" + type + "'");
    }
    var params = {};
    if (url.searchParams.has('cb')) {
        params.callback = b64uDec(url.searchParams.get('cb'));
    }
    if (url.searchParams.has('nb')) {
        params.no_broadcast = true;
    }
    if (url.searchParams.has('s')) {
        params.signer = url.searchParams.get('s');
    }
    return { tx: tx, params: params };
}
// exports.decode = decode;
var RESOLVE_PATTERN = /(__(ref_block_(num|prefix)|expiration|signer))/g;
/**
 * Resolves placeholders in a transaction.
 * @param utx Unresolved transaction data.
 * @param params Protocol parameters.
 * @param options Values to use when resolving.
 * @returns The resolved transaction and signer.
 */
export function resolveTransaction(utx, params, options) {
    var signer = params.signer || options.preferred_signer;
    if (!options.signers.includes(signer)) {
        throw new Error("Signer '" + signer + "' not available");
    }
    var ctx = {
        __ref_block_num: options.ref_block_num,
        __ref_block_prefix: options.ref_block_prefix,
        __expiration: options.expiration,
        __signer: signer,
    };
    var walk = function (val) {
        var type = typeof val;
        if (type === 'object' && Array.isArray(val)) {
            type = 'array';
        }
        else if (val === null) {
            type = 'null';
        }
        switch (type) {
            case 'string':
                return val.replace(RESOLVE_PATTERN, function (m) { return ctx[m]; });
            case 'array':
                return val.map(walk);
            case 'object': {
                var rv = {};
                for (var _i = 0, _a = Object.entries(val); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    rv[k] = walk(v);
                }
                return rv;
            }
            default:
                return val;
        }
    };
    var tx = walk(utx);
    return { signer: signer, tx: tx };
}
// exports.resolveTransaction = resolveTransaction;
var CALLBACK_RESOLVE_PATTERN = /({{(sig|id|block|txn)}})/g;
/**
 * Resolves template vars in a callback url.
 * @param url The callback url.
 * @param ctx Values to use when resolving.
 * @returns The resolved url.
 */
export function resolveCallback(url, ctx) {
    return url.replace(CALLBACK_RESOLVE_PATTERN, function (_1, _2, m) { return ctx[m] || ''; });
}
// exports.resolveCallback = resolveCallback;
/*** Internal helper to encode Parameters to a querystring. */
export function encodeParameters(params) {
    var out = new URLSearchParams();
    if (params.no_broadcast === true) {
        out.set('nb', '');
    }
    if (params.signer) {
        out.set('s', params.signer);
    }
    if (params.callback) {
        out.set('cb', b64uEnc(params.callback));
    }
    var qs = out.toString();
    if (qs.length > 0) {
        qs = '?' + qs;
    }
    return qs;
}
/** Internal helper to encode a tx or op to a b64u+json payload. */
export function encodeJson(data) {
    return b64uEnc(JSON.stringify(data, null, 0));
}
/** Encodes a Steem transaction to a steem: URI. */
export function encodeTx(tx, params) {
    if (params === void 0) { params = {}; }
    return "steem://sign/tx/" + encodeJson(tx) + encodeParameters(params);
}
// exports.encodeTx = encodeTx;
/** Encodes a Steem operation to a steem: URI. */
export function encodeOp(op, params) {
    if (params === void 0) { params = {}; }
    return "steem://sign/op/" + encodeJson(op) + encodeParameters(params);
}
// exports.encodeOp = encodeOp;
/** Encodes several Steem operations to a steem: URI. */
export function encodeOps(ops, params) {
    if (params === void 0) { params = {}; }
    return "steem://sign/ops/" + encodeJson(ops) + encodeParameters(params);
}
// exports.encodeOps = encodeOps;

