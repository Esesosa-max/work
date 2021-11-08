(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~notes_new~topics_new"],{

/***/ "./node_modules/@firebase/storage/dist/index.esm2017.js":
/*!**************************************************************!*\
  !*** ./node_modules/@firebase/storage/dist/index.esm2017.js ***!
  \**************************************************************/
/*! exports provided: StringFormat, _FbsBlob, _Location, _TaskEvent, _TaskState, _UploadTask, _dataFromString, _getChild, _invalidArgument, _invalidRootOperation, connectStorageEmulator, deleteObject, getDownloadURL, getMetadata, getStorage, list, listAll, ref, updateMetadata, uploadBytes, uploadBytesResumable, uploadString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringFormat", function() { return StringFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FbsBlob", function() { return FbsBlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_TaskEvent", function() { return TaskEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_TaskState", function() { return TaskState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_UploadTask", function() { return UploadTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_dataFromString", function() { return dataFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getChild", function() { return _getChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_invalidArgument", function() { return invalidArgument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_invalidRootOperation", function() { return invalidRootOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectStorageEmulator", function() { return connectStorageEmulator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteObject", function() { return deleteObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDownloadURL", function() { return getDownloadURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMetadata", function() { return getMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return getStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "list", function() { return list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listAll", function() { return listAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ref", function() { return ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMetadata", function() { return updateMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadBytes", function() { return uploadBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadBytesResumable", function() { return uploadBytesResumable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadString", function() { return uploadString; });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/index.esm2017.js");
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/component */ "./node_modules/@firebase/component/dist/index.esm.js");




/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Error codes for requests made by the the XhrIo wrapper.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
    ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Constants used in the Firebase Storage library.
 */
/**
 * Domain name for firebase storage.
 */
const DEFAULT_HOST = 'firebasestorage.googleapis.com';
/**
 * The key in Firebase config json for the storage bucket.
 */
const CONFIG_STORAGE_BUCKET_KEY = 'storageBucket';
/**
 * 2 minutes
 *
 * The timeout for all operations except upload.
 */
const DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1000;
/**
 * 10 minutes
 *
 * The timeout for upload.
 */
const DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1000;

/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */
class StorageError extends _firebase_util__WEBPACK_IMPORTED_MODULE_1__["FirebaseError"] {
    /**
     * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
     *  added to the end of the message.
     * @param message  - Error message.
     */
    constructor(code, message) {
        super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
        /**
         * Stores custom error data unque to StorageError.
         */
        this.customData = { serverResponse: null };
        this._baseMessage = this.message;
        // Without this, `instanceof StorageError`, in tests for example,
        // returns false.
        Object.setPrototypeOf(this, StorageError.prototype);
    }
    /**
     * Compares a StorageErrorCode against this error's code, filtering out the prefix.
     */
    _codeEquals(code) {
        return prependCode(code) === this.code;
    }
    /**
     * Optional response message that was added by the server.
     */
    get serverResponse() {
        return this.customData.serverResponse;
    }
    set serverResponse(serverResponse) {
        this.customData.serverResponse = serverResponse;
        if (this.customData.serverResponse) {
            this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
        }
        else {
            this.message = this._baseMessage;
        }
    }
}
function prependCode(code) {
    return 'storage/' + code;
}
function unknown() {
    const message = 'An unknown error occurred, please check the error payload for ' +
        'server response.';
    return new StorageError("unknown" /* UNKNOWN */, message);
}
function objectNotFound(path) {
    return new StorageError("object-not-found" /* OBJECT_NOT_FOUND */, "Object '" + path + "' does not exist.");
}
function quotaExceeded(bucket) {
    return new StorageError("quota-exceeded" /* QUOTA_EXCEEDED */, "Quota for bucket '" +
        bucket +
        "' exceeded, please view quota on " +
        'https://firebase.google.com/pricing/.');
}
function unauthenticated() {
    const message = 'User is not authenticated, please authenticate using Firebase ' +
        'Authentication and try again.';
    return new StorageError("unauthenticated" /* UNAUTHENTICATED */, message);
}
function unauthorizedApp() {
    return new StorageError("unauthorized-app" /* UNAUTHORIZED_APP */, 'This app does not have permission to access Firebase Storage on this project.');
}
function unauthorized(path) {
    return new StorageError("unauthorized" /* UNAUTHORIZED */, "User does not have permission to access '" + path + "'.");
}
function retryLimitExceeded() {
    return new StorageError("retry-limit-exceeded" /* RETRY_LIMIT_EXCEEDED */, 'Max retry time for operation exceeded, please try again.');
}
function canceled() {
    return new StorageError("canceled" /* CANCELED */, 'User canceled the upload/download.');
}
function invalidUrl(url) {
    return new StorageError("invalid-url" /* INVALID_URL */, "Invalid URL '" + url + "'.");
}
function invalidDefaultBucket(bucket) {
    return new StorageError("invalid-default-bucket" /* INVALID_DEFAULT_BUCKET */, "Invalid default bucket '" + bucket + "'.");
}
function noDefaultBucket() {
    return new StorageError("no-default-bucket" /* NO_DEFAULT_BUCKET */, 'No default bucket ' +
        "found. Did you set the '" +
        CONFIG_STORAGE_BUCKET_KEY +
        "' property when initializing the app?");
}
function cannotSliceBlob() {
    return new StorageError("cannot-slice-blob" /* CANNOT_SLICE_BLOB */, 'Cannot slice blob for upload. Please retry the upload.');
}
function serverFileWrongSize() {
    return new StorageError("server-file-wrong-size" /* SERVER_FILE_WRONG_SIZE */, 'Server recorded incorrect upload file size, please retry the upload.');
}
function noDownloadURL() {
    return new StorageError("no-download-url" /* NO_DOWNLOAD_URL */, 'The given file does not have any download URLs.');
}
/**
 * @internal
 */
function invalidArgument(message) {
    return new StorageError("invalid-argument" /* INVALID_ARGUMENT */, message);
}
function appDeleted() {
    return new StorageError("app-deleted" /* APP_DELETED */, 'The Firebase app was deleted.');
}
/**
 * @param name - The name of the operation that was invalid.
 *
 * @internal
 */
function invalidRootOperation(name) {
    return new StorageError("invalid-root-operation" /* INVALID_ROOT_OPERATION */, "The operation '" +
        name +
        "' cannot be performed on a root reference, create a non-root " +
        "reference using child, such as .child('file.png').");
}
/**
 * @param format - The format that was not valid.
 * @param message - A message describing the format violation.
 */
function invalidFormat(format, message) {
    return new StorageError("invalid-format" /* INVALID_FORMAT */, "String does not match format '" + format + "': " + message);
}
/**
 * @param message - A message describing the internal error.
 */
function internalError(message) {
    throw new StorageError("internal-error" /* INTERNAL_ERROR */, 'Internal error: ' + message);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Network layer for browsers. We use this instead of goog.net.XhrIo because
 * goog.net.XhrIo is hyuuuuge and doesn't work in React Native on Android.
 */
class XhrConnection {
    constructor() {
        this.sent_ = false;
        this.xhr_ = new XMLHttpRequest();
        this.errorCode_ = ErrorCode.NO_ERROR;
        this.sendPromise_ = new Promise(resolve => {
            this.xhr_.addEventListener('abort', () => {
                this.errorCode_ = ErrorCode.ABORT;
                resolve();
            });
            this.xhr_.addEventListener('error', () => {
                this.errorCode_ = ErrorCode.NETWORK_ERROR;
                resolve();
            });
            this.xhr_.addEventListener('load', () => {
                resolve();
            });
        });
    }
    send(url, method, body, headers) {
        if (this.sent_) {
            throw internalError('cannot .send() more than once');
        }
        this.sent_ = true;
        this.xhr_.open(method, url, true);
        if (headers !== undefined) {
            for (const key in headers) {
                if (headers.hasOwnProperty(key)) {
                    this.xhr_.setRequestHeader(key, headers[key].toString());
                }
            }
        }
        if (body !== undefined) {
            this.xhr_.send(body);
        }
        else {
            this.xhr_.send();
        }
        return this.sendPromise_;
    }
    getErrorCode() {
        if (!this.sent_) {
            throw internalError('cannot .getErrorCode() before sending');
        }
        return this.errorCode_;
    }
    getStatus() {
        if (!this.sent_) {
            throw internalError('cannot .getStatus() before sending');
        }
        try {
            return this.xhr_.status;
        }
        catch (e) {
            return -1;
        }
    }
    getResponseText() {
        if (!this.sent_) {
            throw internalError('cannot .getResponseText() before sending');
        }
        return this.xhr_.responseText;
    }
    /** Aborts the request. */
    abort() {
        this.xhr_.abort();
    }
    getResponseHeader(header) {
        return this.xhr_.getResponseHeader(header);
    }
    addUploadProgressListener(listener) {
        if (this.xhr_.upload != null) {
            this.xhr_.upload.addEventListener('progress', listener);
        }
    }
    removeUploadProgressListener(listener) {
        if (this.xhr_.upload != null) {
            this.xhr_.upload.removeEventListener('progress', listener);
        }
    }
}
function newConnection() {
    return new XhrConnection();
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Factory-like class for creating XhrIo instances.
 */
class ConnectionPool {
    createConnection() {
        return newConnection();
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Firebase Storage location data.
 *
 * @internal
 */
class Location {
    constructor(bucket, path) {
        this.bucket = bucket;
        this.path_ = path;
    }
    get path() {
        return this.path_;
    }
    get isRoot() {
        return this.path.length === 0;
    }
    fullServerUrl() {
        const encode = encodeURIComponent;
        return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
    }
    bucketOnlyServerUrl() {
        const encode = encodeURIComponent;
        return '/b/' + encode(this.bucket) + '/o';
    }
    static makeFromBucketSpec(bucketString, host) {
        let bucketLocation;
        try {
            bucketLocation = Location.makeFromUrl(bucketString, host);
        }
        catch (e) {
            // Not valid URL, use as-is. This lets you put bare bucket names in
            // config.
            return new Location(bucketString, '');
        }
        if (bucketLocation.path === '') {
            return bucketLocation;
        }
        else {
            throw invalidDefaultBucket(bucketString);
        }
    }
    static makeFromUrl(url, host) {
        let location = null;
        const bucketDomain = '([A-Za-z0-9.\\-_]+)';
        function gsModify(loc) {
            if (loc.path.charAt(loc.path.length - 1) === '/') {
                loc.path_ = loc.path_.slice(0, -1);
            }
        }
        const gsPath = '(/(.*))?$';
        const gsRegex = new RegExp('^gs://' + bucketDomain + gsPath, 'i');
        const gsIndices = { bucket: 1, path: 3 };
        function httpModify(loc) {
            loc.path_ = decodeURIComponent(loc.path);
        }
        const version = 'v[A-Za-z0-9_]+';
        const firebaseStorageHost = host.replace(/[.]/g, '\\.');
        const firebaseStoragePath = '(/([^?#]*).*)?$';
        const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o${firebaseStoragePath}`, 'i');
        const firebaseStorageIndices = { bucket: 1, path: 3 };
        const cloudStorageHost = host === DEFAULT_HOST
            ? '(?:storage.googleapis.com|storage.cloud.google.com)'
            : host;
        const cloudStoragePath = '([^?#]*)';
        const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`, 'i');
        const cloudStorageIndices = { bucket: 1, path: 2 };
        const groups = [
            { regex: gsRegex, indices: gsIndices, postModify: gsModify },
            {
                regex: firebaseStorageRegExp,
                indices: firebaseStorageIndices,
                postModify: httpModify
            },
            {
                regex: cloudStorageRegExp,
                indices: cloudStorageIndices,
                postModify: httpModify
            }
        ];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const captures = group.regex.exec(url);
            if (captures) {
                const bucketValue = captures[group.indices.bucket];
                let pathValue = captures[group.indices.path];
                if (!pathValue) {
                    pathValue = '';
                }
                location = new Location(bucketValue, pathValue);
                group.postModify(location);
                break;
            }
        }
        if (location == null) {
            throw invalidUrl(url);
        }
        return location;
    }
}

/**
 * A request whose promise always fails.
 */
class FailRequest {
    constructor(error) {
        this.promise_ = Promise.reject(error);
    }
    /** @inheritDoc */
    getPromise() {
        return this.promise_;
    }
    /** @inheritDoc */
    cancel(_appDelete = false) { }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @param f May be invoked
 *     before the function returns.
 * @param callback Get all the arguments passed to the function
 *     passed to f, including the initial boolean.
 */
function start(f, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
callback, timeout) {
    // TODO(andysoto): make this code cleaner (probably refactor into an actual
    // type instead of a bunch of functions with state shared in the closure)
    let waitSeconds = 1;
    // Would type this as "number" but that doesn't work for Node so ¯\_(ツ)_/¯
    // TODO: find a way to exclude Node type definition for storage because storage only works in browser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeoutId = null;
    let hitTimeout = false;
    let cancelState = 0;
    function canceled() {
        return cancelState === 2;
    }
    let triggeredCallback = false;
    function triggerCallback(...args) {
        if (!triggeredCallback) {
            triggeredCallback = true;
            callback.apply(null, args);
        }
    }
    function callWithDelay(millis) {
        timeoutId = setTimeout(() => {
            timeoutId = null;
            f(handler, canceled());
        }, millis);
    }
    function handler(success, ...args) {
        if (triggeredCallback) {
            return;
        }
        if (success) {
            triggerCallback.call(null, success, ...args);
            return;
        }
        const mustStop = canceled() || hitTimeout;
        if (mustStop) {
            triggerCallback.call(null, success, ...args);
            return;
        }
        if (waitSeconds < 64) {
            /* TODO(andysoto): don't back off so quickly if we know we're offline. */
            waitSeconds *= 2;
        }
        let waitMillis;
        if (cancelState === 1) {
            cancelState = 2;
            waitMillis = 0;
        }
        else {
            waitMillis = (waitSeconds + Math.random()) * 1000;
        }
        callWithDelay(waitMillis);
    }
    let stopped = false;
    function stop(wasTimeout) {
        if (stopped) {
            return;
        }
        stopped = true;
        if (triggeredCallback) {
            return;
        }
        if (timeoutId !== null) {
            if (!wasTimeout) {
                cancelState = 2;
            }
            clearTimeout(timeoutId);
            callWithDelay(0);
        }
        else {
            if (!wasTimeout) {
                cancelState = 1;
            }
        }
    }
    callWithDelay(0);
    setTimeout(() => {
        hitTimeout = true;
        stop(true);
    }, timeout);
    return stop;
}
/**
 * Stops the retry loop from repeating.
 * If the function is currently "in between" retries, it is invoked immediately
 * with the second parameter as "true". Otherwise, it will be invoked once more
 * after the current invocation finishes iff the current invocation would have
 * triggered another retry.
 */
function stop(id) {
    id(false);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isJustDef(p) {
    return p !== void 0;
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(p) {
    return typeof p === 'function';
}
function isNonArrayObject(p) {
    return typeof p === 'object' && !Array.isArray(p);
}
function isString(p) {
    return typeof p === 'string' || p instanceof String;
}
function isNativeBlob(p) {
    return isNativeBlobDefined() && p instanceof Blob;
}
function isNativeBlobDefined() {
    return typeof Blob !== 'undefined';
}
function validateNumber(argument, minValue, maxValue, value) {
    if (value < minValue) {
        throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
    }
    if (value > maxValue) {
        throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function makeUrl(urlPart, host, protocol) {
    let origin = host;
    if (protocol == null) {
        origin = `https://${host}`;
    }
    return `${protocol}://${origin}/v0${urlPart}`;
}
function makeQueryString(params) {
    const encode = encodeURIComponent;
    let queryPart = '?';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const nextPart = encode(key) + '=' + encode(params[key]);
            queryPart = queryPart + nextPart + '&';
        }
    }
    // Chop off the extra '&' or '?' on the end
    queryPart = queryPart.slice(0, -1);
    return queryPart;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class NetworkRequest {
    constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, pool_) {
        this.url_ = url_;
        this.method_ = method_;
        this.headers_ = headers_;
        this.body_ = body_;
        this.successCodes_ = successCodes_;
        this.additionalRetryCodes_ = additionalRetryCodes_;
        this.callback_ = callback_;
        this.errorCallback_ = errorCallback_;
        this.timeout_ = timeout_;
        this.progressCallback_ = progressCallback_;
        this.pool_ = pool_;
        this.pendingConnection_ = null;
        this.backoffId_ = null;
        this.canceled_ = false;
        this.appDelete_ = false;
        this.promise_ = new Promise((resolve, reject) => {
            this.resolve_ = resolve;
            this.reject_ = reject;
            this.start_();
        });
    }
    /**
     * Actually starts the retry loop.
     */
    start_() {
        const doTheRequest = (backoffCallback, canceled) => {
            if (canceled) {
                backoffCallback(false, new RequestEndStatus(false, null, true));
                return;
            }
            const connection = this.pool_.createConnection();
            this.pendingConnection_ = connection;
            const progressListener = progressEvent => {
                const loaded = progressEvent.loaded;
                const total = progressEvent.lengthComputable
                    ? progressEvent.total
                    : -1;
                if (this.progressCallback_ !== null) {
                    this.progressCallback_(loaded, total);
                }
            };
            if (this.progressCallback_ !== null) {
                connection.addUploadProgressListener(progressListener);
            }
            // connection.send() never rejects, so we don't need to have a error handler or use catch on the returned promise.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            connection
                .send(this.url_, this.method_, this.body_, this.headers_)
                .then(() => {
                if (this.progressCallback_ !== null) {
                    connection.removeUploadProgressListener(progressListener);
                }
                this.pendingConnection_ = null;
                const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
                const status = connection.getStatus();
                if (!hitServer || this.isRetryStatusCode_(status)) {
                    const wasCanceled = connection.getErrorCode() === ErrorCode.ABORT;
                    backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
                    return;
                }
                const successCode = this.successCodes_.indexOf(status) !== -1;
                backoffCallback(true, new RequestEndStatus(successCode, connection));
            });
        };
        /**
         * @param requestWentThrough - True if the request eventually went
         *     through, false if it hit the retry limit or was canceled.
         */
        const backoffDone = (requestWentThrough, status) => {
            const resolve = this.resolve_;
            const reject = this.reject_;
            const connection = status.connection;
            if (status.wasSuccessCode) {
                try {
                    const result = this.callback_(connection, connection.getResponseText());
                    if (isJustDef(result)) {
                        resolve(result);
                    }
                    else {
                        resolve();
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            else {
                if (connection !== null) {
                    const err = unknown();
                    err.serverResponse = connection.getResponseText();
                    if (this.errorCallback_) {
                        reject(this.errorCallback_(connection, err));
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    if (status.canceled) {
                        const err = this.appDelete_ ? appDeleted() : canceled();
                        reject(err);
                    }
                    else {
                        const err = retryLimitExceeded();
                        reject(err);
                    }
                }
            }
        };
        if (this.canceled_) {
            backoffDone(false, new RequestEndStatus(false, null, true));
        }
        else {
            this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
        }
    }
    /** @inheritDoc */
    getPromise() {
        return this.promise_;
    }
    /** @inheritDoc */
    cancel(appDelete) {
        this.canceled_ = true;
        this.appDelete_ = appDelete || false;
        if (this.backoffId_ !== null) {
            stop(this.backoffId_);
        }
        if (this.pendingConnection_ !== null) {
            this.pendingConnection_.abort();
        }
    }
    isRetryStatusCode_(status) {
        // The codes for which to retry came from this page:
        // https://cloud.google.com/storage/docs/exponential-backoff
        const isFiveHundredCode = status >= 500 && status < 600;
        const extraRetryCodes = [
            // Request Timeout: web server didn't receive full request in time.
            408,
            // Too Many Requests: you're getting rate-limited, basically.
            429
        ];
        const isExtraRetryCode = extraRetryCodes.indexOf(status) !== -1;
        const isRequestSpecificRetryCode = this.additionalRetryCodes_.indexOf(status) !== -1;
        return isFiveHundredCode || isExtraRetryCode || isRequestSpecificRetryCode;
    }
}
/**
 * A collection of information about the result of a network request.
 * @param opt_canceled - Defaults to false.
 */
class RequestEndStatus {
    constructor(wasSuccessCode, connection, canceled) {
        this.wasSuccessCode = wasSuccessCode;
        this.connection = connection;
        this.canceled = !!canceled;
    }
}
function addAuthHeader_(headers, authToken) {
    if (authToken !== null && authToken.length > 0) {
        headers['Authorization'] = 'Firebase ' + authToken;
    }
}
function addVersionHeader_(headers, firebaseVersion) {
    headers['X-Firebase-Storage-Version'] =
        'webjs/' + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : 'AppManager');
}
function addGmpidHeader_(headers, appId) {
    if (appId) {
        headers['X-Firebase-GMPID'] = appId;
    }
}
function addAppCheckHeader_(headers, appCheckToken) {
    if (appCheckToken !== null) {
        headers['X-Firebase-AppCheck'] = appCheckToken;
    }
}
function makeRequest(requestInfo, appId, authToken, appCheckToken, pool, firebaseVersion) {
    const queryPart = makeQueryString(requestInfo.urlParams);
    const url = requestInfo.url + queryPart;
    const headers = Object.assign({}, requestInfo.headers);
    addGmpidHeader_(headers, appId);
    addAuthHeader_(headers, authToken);
    addVersionHeader_(headers, firebaseVersion);
    addAppCheckHeader_(headers, appCheckToken);
    return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, pool);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getBlobBuilder() {
    if (typeof BlobBuilder !== 'undefined') {
        return BlobBuilder;
    }
    else if (typeof WebKitBlobBuilder !== 'undefined') {
        return WebKitBlobBuilder;
    }
    else {
        return undefined;
    }
}
/**
 * Concatenates one or more values together and converts them to a Blob.
 *
 * @param args The values that will make up the resulting blob.
 * @return The blob.
 */
function getBlob(...args) {
    const BlobBuilder = getBlobBuilder();
    if (BlobBuilder !== undefined) {
        const bb = new BlobBuilder();
        for (let i = 0; i < args.length; i++) {
            bb.append(args[i]);
        }
        return bb.getBlob();
    }
    else {
        if (isNativeBlobDefined()) {
            return new Blob(args);
        }
        else {
            throw new StorageError("unsupported-environment" /* UNSUPPORTED_ENVIRONMENT */, "This browser doesn't seem to support creating Blobs");
        }
    }
}
/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices cannot be used.
 *
 * @param blob The blob to be sliced.
 * @param start Index of the starting byte.
 * @param end Index of the ending byte.
 * @return The blob slice or null if not supported.
 */
function sliceBlob(blob, start, end) {
    if (blob.webkitSlice) {
        return blob.webkitSlice(start, end);
    }
    else if (blob.mozSlice) {
        return blob.mozSlice(start, end);
    }
    else if (blob.slice) {
        return blob.slice(start, end);
    }
    return null;
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Converts a Base64 encoded string to a binary string. */
function decodeBase64(encoded) {
    return atob(encoded);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An enumeration of the possible string formats for upload.
 * @public
 */
const StringFormat = {
    /**
     * Indicates the string should be interpreted "raw", that is, as normal text.
     * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
     * sequence.
     * Example: The string 'Hello! \\ud83d\\ude0a' becomes the byte sequence
     * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
     */
    RAW: 'raw',
    /**
     * Indicates the string should be interpreted as base64-encoded data.
     * Padding characters (trailing '='s) are optional.
     * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
     * ad 69 8e fb e1 3a b7 bf eb 97
     */
    BASE64: 'base64',
    /**
     * Indicates the string should be interpreted as base64url-encoded data.
     * Padding characters (trailing '='s) are optional.
     * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
     * ad 69 8e fb e1 3a b7 bf eb 97
     */
    BASE64URL: 'base64url',
    /**
     * Indicates the string is a data URL, such as one obtained from
     * canvas.toDataURL().
     * Example: the string 'data:application/octet-stream;base64,aaaa'
     * becomes the byte sequence
     * 69 a6 9a
     * (the content-type "application/octet-stream" is also applied, but can
     * be overridden in the metadata object).
     */
    DATA_URL: 'data_url'
};
class StringData {
    constructor(data, contentType) {
        this.data = data;
        this.contentType = contentType || null;
    }
}
/**
 * @internal
 */
function dataFromString(format, stringData) {
    switch (format) {
        case StringFormat.RAW:
            return new StringData(utf8Bytes_(stringData));
        case StringFormat.BASE64:
        case StringFormat.BASE64URL:
            return new StringData(base64Bytes_(format, stringData));
        case StringFormat.DATA_URL:
            return new StringData(dataURLBytes_(stringData), dataURLContentType_(stringData));
        // do nothing
    }
    // assert(false);
    throw unknown();
}
function utf8Bytes_(value) {
    const b = [];
    for (let i = 0; i < value.length; i++) {
        let c = value.charCodeAt(i);
        if (c <= 127) {
            b.push(c);
        }
        else {
            if (c <= 2047) {
                b.push(192 | (c >> 6), 128 | (c & 63));
            }
            else {
                if ((c & 64512) === 55296) {
                    // The start of a surrogate pair.
                    const valid = i < value.length - 1 && (value.charCodeAt(i + 1) & 64512) === 56320;
                    if (!valid) {
                        // The second surrogate wasn't there.
                        b.push(239, 191, 189);
                    }
                    else {
                        const hi = c;
                        const lo = value.charCodeAt(++i);
                        c = 65536 | ((hi & 1023) << 10) | (lo & 1023);
                        b.push(240 | (c >> 18), 128 | ((c >> 12) & 63), 128 | ((c >> 6) & 63), 128 | (c & 63));
                    }
                }
                else {
                    if ((c & 64512) === 56320) {
                        // Invalid low surrogate.
                        b.push(239, 191, 189);
                    }
                    else {
                        b.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
                    }
                }
            }
        }
    }
    return new Uint8Array(b);
}
function percentEncodedBytes_(value) {
    let decoded;
    try {
        decoded = decodeURIComponent(value);
    }
    catch (e) {
        throw invalidFormat(StringFormat.DATA_URL, 'Malformed data URL.');
    }
    return utf8Bytes_(decoded);
}
function base64Bytes_(format, value) {
    switch (format) {
        case StringFormat.BASE64: {
            const hasMinus = value.indexOf('-') !== -1;
            const hasUnder = value.indexOf('_') !== -1;
            if (hasMinus || hasUnder) {
                const invalidChar = hasMinus ? '-' : '_';
                throw invalidFormat(format, "Invalid character '" +
                    invalidChar +
                    "' found: is it base64url encoded?");
            }
            break;
        }
        case StringFormat.BASE64URL: {
            const hasPlus = value.indexOf('+') !== -1;
            const hasSlash = value.indexOf('/') !== -1;
            if (hasPlus || hasSlash) {
                const invalidChar = hasPlus ? '+' : '/';
                throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64 encoded?");
            }
            value = value.replace(/-/g, '+').replace(/_/g, '/');
            break;
        }
        // do nothing
    }
    let bytes;
    try {
        bytes = decodeBase64(value);
    }
    catch (e) {
        throw invalidFormat(format, 'Invalid character found');
    }
    const array = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        array[i] = bytes.charCodeAt(i);
    }
    return array;
}
class DataURLParts {
    constructor(dataURL) {
        this.base64 = false;
        this.contentType = null;
        const matches = dataURL.match(/^data:([^,]+)?,/);
        if (matches === null) {
            throw invalidFormat(StringFormat.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
        }
        const middle = matches[1] || null;
        if (middle != null) {
            this.base64 = endsWith(middle, ';base64');
            this.contentType = this.base64
                ? middle.substring(0, middle.length - ';base64'.length)
                : middle;
        }
        this.rest = dataURL.substring(dataURL.indexOf(',') + 1);
    }
}
function dataURLBytes_(dataUrl) {
    const parts = new DataURLParts(dataUrl);
    if (parts.base64) {
        return base64Bytes_(StringFormat.BASE64, parts.rest);
    }
    else {
        return percentEncodedBytes_(parts.rest);
    }
}
function dataURLContentType_(dataUrl) {
    const parts = new DataURLParts(dataUrl);
    return parts.contentType;
}
function endsWith(s, end) {
    const longEnough = s.length >= end.length;
    if (!longEnough) {
        return false;
    }
    return s.substring(s.length - end.length) === end;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @param opt_elideCopy - If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 *
 * @internal
 */
class FbsBlob {
    constructor(data, elideCopy) {
        let size = 0;
        let blobType = '';
        if (isNativeBlob(data)) {
            this.data_ = data;
            size = data.size;
            blobType = data.type;
        }
        else if (data instanceof ArrayBuffer) {
            if (elideCopy) {
                this.data_ = new Uint8Array(data);
            }
            else {
                this.data_ = new Uint8Array(data.byteLength);
                this.data_.set(new Uint8Array(data));
            }
            size = this.data_.length;
        }
        else if (data instanceof Uint8Array) {
            if (elideCopy) {
                this.data_ = data;
            }
            else {
                this.data_ = new Uint8Array(data.length);
                this.data_.set(data);
            }
            size = data.length;
        }
        this.size_ = size;
        this.type_ = blobType;
    }
    size() {
        return this.size_;
    }
    type() {
        return this.type_;
    }
    slice(startByte, endByte) {
        if (isNativeBlob(this.data_)) {
            const realBlob = this.data_;
            const sliced = sliceBlob(realBlob, startByte, endByte);
            if (sliced === null) {
                return null;
            }
            return new FbsBlob(sliced);
        }
        else {
            const slice = new Uint8Array(this.data_.buffer, startByte, endByte - startByte);
            return new FbsBlob(slice, true);
        }
    }
    static getBlob(...args) {
        if (isNativeBlobDefined()) {
            const blobby = args.map((val) => {
                if (val instanceof FbsBlob) {
                    return val.data_;
                }
                else {
                    return val;
                }
            });
            return new FbsBlob(getBlob.apply(null, blobby));
        }
        else {
            const uint8Arrays = args.map((val) => {
                if (isString(val)) {
                    return dataFromString(StringFormat.RAW, val).data;
                }
                else {
                    // Blobs don't exist, so this has to be a Uint8Array.
                    return val.data_;
                }
            });
            let finalLength = 0;
            uint8Arrays.forEach((array) => {
                finalLength += array.byteLength;
            });
            const merged = new Uint8Array(finalLength);
            let index = 0;
            uint8Arrays.forEach((array) => {
                for (let i = 0; i < array.length; i++) {
                    merged[index++] = array[i];
                }
            });
            return new FbsBlob(merged, true);
        }
    }
    uploadData() {
        return this.data_;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns the Object resulting from parsing the given JSON, or null if the
 * given string does not represent a JSON object.
 */
function jsonObjectOrNull(s) {
    let obj;
    try {
        obj = JSON.parse(s);
    }
    catch (e) {
        return null;
    }
    if (isNonArrayObject(obj)) {
        return obj;
    }
    else {
        return null;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Contains helper methods for manipulating paths.
 */
/**
 * @return Null if the path is already at the root.
 */
function parent(path) {
    if (path.length === 0) {
        return null;
    }
    const index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    const newPath = path.slice(0, index);
    return newPath;
}
function child(path, childPath) {
    const canonicalChildPath = childPath
        .split('/')
        .filter(component => component.length > 0)
        .join('/');
    if (path.length === 0) {
        return canonicalChildPath;
    }
    else {
        return path + '/' + canonicalChildPath;
    }
}
/**
 * Returns the last component of a path.
 * '/foo/bar' -> 'bar'
 * '/foo/bar/baz/' -> 'baz/'
 * '/a' -> 'a'
 */
function lastComponent(path) {
    const index = path.lastIndexOf('/', path.length - 2);
    if (index === -1) {
        return path;
    }
    else {
        return path.slice(index + 1);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function noXform_(metadata, value) {
    return value;
}
class Mapping {
    constructor(server, local, writable, xform) {
        this.server = server;
        this.local = local || server;
        this.writable = !!writable;
        this.xform = xform || noXform_;
    }
}
let mappings_ = null;
function xformPath(fullPath) {
    if (!isString(fullPath) || fullPath.length < 2) {
        return fullPath;
    }
    else {
        return lastComponent(fullPath);
    }
}
function getMappings() {
    if (mappings_) {
        return mappings_;
    }
    const mappings = [];
    mappings.push(new Mapping('bucket'));
    mappings.push(new Mapping('generation'));
    mappings.push(new Mapping('metageneration'));
    mappings.push(new Mapping('name', 'fullPath', true));
    function mappingsXformPath(_metadata, fullPath) {
        return xformPath(fullPath);
    }
    const nameMapping = new Mapping('name');
    nameMapping.xform = mappingsXformPath;
    mappings.push(nameMapping);
    /**
     * Coerces the second param to a number, if it is defined.
     */
    function xformSize(_metadata, size) {
        if (size !== undefined) {
            return Number(size);
        }
        else {
            return size;
        }
    }
    const sizeMapping = new Mapping('size');
    sizeMapping.xform = xformSize;
    mappings.push(sizeMapping);
    mappings.push(new Mapping('timeCreated'));
    mappings.push(new Mapping('updated'));
    mappings.push(new Mapping('md5Hash', null, true));
    mappings.push(new Mapping('cacheControl', null, true));
    mappings.push(new Mapping('contentDisposition', null, true));
    mappings.push(new Mapping('contentEncoding', null, true));
    mappings.push(new Mapping('contentLanguage', null, true));
    mappings.push(new Mapping('contentType', null, true));
    mappings.push(new Mapping('metadata', 'customMetadata', true));
    mappings_ = mappings;
    return mappings_;
}
function addRef(metadata, service) {
    function generateRef() {
        const bucket = metadata['bucket'];
        const path = metadata['fullPath'];
        const loc = new Location(bucket, path);
        return service._makeStorageReference(loc);
    }
    Object.defineProperty(metadata, 'ref', { get: generateRef });
}
function fromResource(service, resource, mappings) {
    const metadata = {};
    metadata['type'] = 'file';
    const len = mappings.length;
    for (let i = 0; i < len; i++) {
        const mapping = mappings[i];
        metadata[mapping.local] = mapping.xform(metadata, resource[mapping.server]);
    }
    addRef(metadata, service);
    return metadata;
}
function fromResourceString(service, resourceString, mappings) {
    const obj = jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }
    const resource = obj;
    return fromResource(service, resource, mappings);
}
function downloadUrlFromResourceString(metadata, resourceString, host, protocol) {
    const obj = jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }
    if (!isString(obj['downloadTokens'])) {
        // This can happen if objects are uploaded through GCS and retrieved
        // through list, so we don't want to throw an Error.
        return null;
    }
    const tokens = obj['downloadTokens'];
    if (tokens.length === 0) {
        return null;
    }
    const encode = encodeURIComponent;
    const tokensList = tokens.split(',');
    const urls = tokensList.map((token) => {
        const bucket = metadata['bucket'];
        const path = metadata['fullPath'];
        const urlPart = '/b/' + encode(bucket) + '/o/' + encode(path);
        const base = makeUrl(urlPart, host, protocol);
        const queryString = makeQueryString({
            alt: 'media',
            token
        });
        return base + queryString;
    });
    return urls[0];
}
function toResourceString(metadata, mappings) {
    const resource = {};
    const len = mappings.length;
    for (let i = 0; i < len; i++) {
        const mapping = mappings[i];
        if (mapping.writable) {
            resource[mapping.server] = metadata[mapping.local];
        }
    }
    return JSON.stringify(resource);
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PREFIXES_KEY = 'prefixes';
const ITEMS_KEY = 'items';
function fromBackendResponse(service, bucket, resource) {
    const listResult = {
        prefixes: [],
        items: [],
        nextPageToken: resource['nextPageToken']
    };
    if (resource[PREFIXES_KEY]) {
        for (const path of resource[PREFIXES_KEY]) {
            const pathWithoutTrailingSlash = path.replace(/\/$/, '');
            const reference = service._makeStorageReference(new Location(bucket, pathWithoutTrailingSlash));
            listResult.prefixes.push(reference);
        }
    }
    if (resource[ITEMS_KEY]) {
        for (const item of resource[ITEMS_KEY]) {
            const reference = service._makeStorageReference(new Location(bucket, item['name']));
            listResult.items.push(reference);
        }
    }
    return listResult;
}
function fromResponseString(service, bucket, resourceString) {
    const obj = jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }
    const resource = obj;
    return fromBackendResponse(service, bucket, resource);
}

class RequestInfo {
    constructor(url, method, 
    /**
     * Returns the value with which to resolve the request's promise. Only called
     * if the request is successful. Throw from this function to reject the
     * returned Request's promise with the thrown error.
     * Note: The XhrIo passed to this function may be reused after this callback
     * returns. Do not keep a reference to it in any way.
     */
    handler, timeout) {
        this.url = url;
        this.method = method;
        this.handler = handler;
        this.timeout = timeout;
        this.urlParams = {};
        this.headers = {};
        this.body = null;
        this.errorHandler = null;
        /**
         * Called with the current number of bytes uploaded and total size (-1 if not
         * computable) of the request body (i.e. used to report upload progress).
         */
        this.progressCallback = null;
        this.successCodes = [200];
        this.additionalRetryCodes = [];
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws the UNKNOWN StorageError if cndn is false.
 */
function handlerCheck(cndn) {
    if (!cndn) {
        throw unknown();
    }
}
function metadataHandler(service, mappings) {
    function handler(xhr, text) {
        const metadata = fromResourceString(service, text, mappings);
        handlerCheck(metadata !== null);
        return metadata;
    }
    return handler;
}
function listHandler(service, bucket) {
    function handler(xhr, text) {
        const listResult = fromResponseString(service, bucket, text);
        handlerCheck(listResult !== null);
        return listResult;
    }
    return handler;
}
function downloadUrlHandler(service, mappings) {
    function handler(xhr, text) {
        const metadata = fromResourceString(service, text, mappings);
        handlerCheck(metadata !== null);
        return downloadUrlFromResourceString(metadata, text, service.host, service._protocol);
    }
    return handler;
}
function sharedErrorHandler(location) {
    function errorHandler(xhr, err) {
        let newErr;
        if (xhr.getStatus() === 401) {
            if (
            // This exact message string is the only consistent part of the
            // server's error response that identifies it as an App Check error.
            xhr.getResponseText().includes('Firebase App Check token is invalid')) {
                newErr = unauthorizedApp();
            }
            else {
                newErr = unauthenticated();
            }
        }
        else {
            if (xhr.getStatus() === 402) {
                newErr = quotaExceeded(location.bucket);
            }
            else {
                if (xhr.getStatus() === 403) {
                    newErr = unauthorized(location.path);
                }
                else {
                    newErr = err;
                }
            }
        }
        newErr.serverResponse = err.serverResponse;
        return newErr;
    }
    return errorHandler;
}
function objectErrorHandler(location) {
    const shared = sharedErrorHandler(location);
    function errorHandler(xhr, err) {
        let newErr = shared(xhr, err);
        if (xhr.getStatus() === 404) {
            newErr = objectNotFound(location.path);
        }
        newErr.serverResponse = err.serverResponse;
        return newErr;
    }
    return errorHandler;
}
function getMetadata$2(service, location, mappings) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function list$2(service, location, delimiter, pageToken, maxResults) {
    const urlParams = {};
    if (location.isRoot) {
        urlParams['prefix'] = '';
    }
    else {
        urlParams['prefix'] = location.path + '/';
    }
    if (delimiter && delimiter.length > 0) {
        urlParams['delimiter'] = delimiter;
    }
    if (pageToken) {
        urlParams['pageToken'] = pageToken;
    }
    if (maxResults) {
        urlParams['maxResults'] = maxResults;
    }
    const urlPart = location.bucketOnlyServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, listHandler(service, location.bucket), timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
function getDownloadUrl(service, location, mappings) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, downloadUrlHandler(service, mappings), timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function updateMetadata$2(service, location, metadata, mappings) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'PATCH';
    const body = toResourceString(metadata, mappings);
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function deleteObject$2(service, location) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'DELETE';
    const timeout = service.maxOperationRetryTime;
    function handler(_xhr, _text) { }
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.successCodes = [200, 204];
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function determineContentType_(metadata, blob) {
    return ((metadata && metadata['contentType']) ||
        (blob && blob.type()) ||
        'application/octet-stream');
}
function metadataForUpload_(location, blob, metadata) {
    const metadataClone = Object.assign({}, metadata);
    metadataClone['fullPath'] = location.path;
    metadataClone['size'] = blob.size();
    if (!metadataClone['contentType']) {
        metadataClone['contentType'] = determineContentType_(null, blob);
    }
    return metadataClone;
}
/**
 * Prepare RequestInfo for uploads as Content-Type: multipart.
 */
function multipartUpload(service, location, mappings, blob, metadata) {
    const urlPart = location.bucketOnlyServerUrl();
    const headers = {
        'X-Goog-Upload-Protocol': 'multipart'
    };
    function genBoundary() {
        let str = '';
        for (let i = 0; i < 2; i++) {
            str = str + Math.random().toString().slice(2);
        }
        return str;
    }
    const boundary = genBoundary();
    headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
    const metadata_ = metadataForUpload_(location, blob, metadata);
    const metadataString = toResourceString(metadata_, mappings);
    const preBlobPart = '--' +
        boundary +
        '\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n\r\n' +
        metadataString +
        '\r\n--' +
        boundary +
        '\r\n' +
        'Content-Type: ' +
        metadata_['contentType'] +
        '\r\n\r\n';
    const postBlobPart = '\r\n--' + boundary + '--';
    const body = FbsBlob.getBlob(preBlobPart, blob, postBlobPart);
    if (body === null) {
        throw cannotSliceBlob();
    }
    const urlParams = { name: metadata_['fullPath'] };
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'POST';
    const timeout = service.maxUploadRetryTime;
    const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 */
class ResumableUploadStatus {
    constructor(current, total, finalized, metadata) {
        this.current = current;
        this.total = total;
        this.finalized = !!finalized;
        this.metadata = metadata || null;
    }
}
function checkResumeHeader_(xhr, allowed) {
    let status = null;
    try {
        status = xhr.getResponseHeader('X-Goog-Upload-Status');
    }
    catch (e) {
        handlerCheck(false);
    }
    const allowedStatus = allowed || ['active'];
    handlerCheck(!!status && allowedStatus.indexOf(status) !== -1);
    return status;
}
function createResumableUpload(service, location, mappings, blob, metadata) {
    const urlPart = location.bucketOnlyServerUrl();
    const metadataForUpload = metadataForUpload_(location, blob, metadata);
    const urlParams = { name: metadataForUpload['fullPath'] };
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'POST';
    const headers = {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': `${blob.size()}`,
        'X-Goog-Upload-Header-Content-Type': metadataForUpload['contentType'],
        'Content-Type': 'application/json; charset=utf-8'
    };
    const body = toResourceString(metadataForUpload, mappings);
    const timeout = service.maxUploadRetryTime;
    function handler(xhr) {
        checkResumeHeader_(xhr);
        let url;
        try {
            url = xhr.getResponseHeader('X-Goog-Upload-URL');
        }
        catch (e) {
            handlerCheck(false);
        }
        handlerCheck(isString(url));
        return url;
    }
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */
function getResumableUploadStatus(service, location, url, blob) {
    const headers = { 'X-Goog-Upload-Command': 'query' };
    function handler(xhr) {
        const status = checkResumeHeader_(xhr, ['active', 'final']);
        let sizeString = null;
        try {
            sizeString = xhr.getResponseHeader('X-Goog-Upload-Size-Received');
        }
        catch (e) {
            handlerCheck(false);
        }
        if (!sizeString) {
            // null or empty string
            handlerCheck(false);
        }
        const size = Number(sizeString);
        handlerCheck(!isNaN(size));
        return new ResumableUploadStatus(size, blob.size(), status === 'final');
    }
    const method = 'POST';
    const timeout = service.maxUploadRetryTime;
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.headers = headers;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */
const RESUMABLE_UPLOAD_CHUNK_SIZE = 256 * 1024;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */
function continueResumableUpload(location, service, url, blob, chunkSize, mappings, status, progressCallback) {
    // TODO(andysoto): standardize on internal asserts
    // assert(!(opt_status && opt_status.finalized));
    const status_ = new ResumableUploadStatus(0, 0);
    if (status) {
        status_.current = status.current;
        status_.total = status.total;
    }
    else {
        status_.current = 0;
        status_.total = blob.size();
    }
    if (blob.size() !== status_.total) {
        throw serverFileWrongSize();
    }
    const bytesLeft = status_.total - status_.current;
    let bytesToUpload = bytesLeft;
    if (chunkSize > 0) {
        bytesToUpload = Math.min(bytesToUpload, chunkSize);
    }
    const startByte = status_.current;
    const endByte = startByte + bytesToUpload;
    const uploadCommand = bytesToUpload === bytesLeft ? 'upload, finalize' : 'upload';
    const headers = {
        'X-Goog-Upload-Command': uploadCommand,
        'X-Goog-Upload-Offset': `${status_.current}`
    };
    const body = blob.slice(startByte, endByte);
    if (body === null) {
        throw cannotSliceBlob();
    }
    function handler(xhr, text) {
        // TODO(andysoto): Verify the MD5 of each uploaded range:
        // the 'x-range-md5' header comes back with status code 308 responses.
        // We'll only be able to bail out though, because you can't re-upload a
        // range that you previously uploaded.
        const uploadStatus = checkResumeHeader_(xhr, ['active', 'final']);
        const newCurrent = status_.current + bytesToUpload;
        const size = blob.size();
        let metadata;
        if (uploadStatus === 'final') {
            metadata = metadataHandler(service, mappings)(xhr, text);
        }
        else {
            metadata = null;
        }
        return new ResumableUploadStatus(newCurrent, size, uploadStatus === 'final', metadata);
    }
    const method = 'POST';
    const timeout = service.maxUploadRetryTime;
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.progressCallback = progressCallback || null;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An event that is triggered on a task.
 * @internal
 */
const TaskEvent = {
    /**
     * For this event,
     * <ul>
     *   <li>The `next` function is triggered on progress updates and when the
     *       task is paused/resumed with an `UploadTaskSnapshot` as the first
     *       argument.</li>
     *   <li>The `error` function is triggered if the upload is canceled or fails
     *       for another reason.</li>
     *   <li>The `complete` function is triggered if the upload completes
     *       successfully.</li>
     * </ul>
     */
    STATE_CHANGED: 'state_changed'
};
// type keys = keyof TaskState
/**
 * Represents the current state of a running upload.
 * @internal
 */
const TaskState = {
    /** The task is currently transferring data. */
    RUNNING: 'running',
    /** The task was paused by the user. */
    PAUSED: 'paused',
    /** The task completed successfully. */
    SUCCESS: 'success',
    /** The task was canceled. */
    CANCELED: 'canceled',
    /** The task failed with an error. */
    ERROR: 'error'
};
function taskStateFromInternalTaskState(state) {
    switch (state) {
        case "running" /* RUNNING */:
        case "pausing" /* PAUSING */:
        case "canceling" /* CANCELING */:
            return TaskState.RUNNING;
        case "paused" /* PAUSED */:
            return TaskState.PAUSED;
        case "success" /* SUCCESS */:
            return TaskState.SUCCESS;
        case "canceled" /* CANCELED */:
            return TaskState.CANCELED;
        case "error" /* ERROR */:
            return TaskState.ERROR;
        default:
            // TODO(andysoto): assert(false);
            return TaskState.ERROR;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Observer {
    constructor(nextOrObserver, error, complete) {
        const asFunctions = isFunction(nextOrObserver) || error != null || complete != null;
        if (asFunctions) {
            this.next = nextOrObserver;
            this.error = error !== null && error !== void 0 ? error : undefined;
            this.complete = complete !== null && complete !== void 0 ? complete : undefined;
        }
        else {
            const observer = nextOrObserver;
            this.next = observer.next;
            this.error = observer.error;
            this.complete = observer.complete;
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a function that invokes f with its arguments asynchronously as a
 * microtask, i.e. as soon as possible after the current script returns back
 * into browser code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(f) {
    return (...argsToForward) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Promise.resolve().then(() => f(...argsToForward));
    };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 * @internal
 */
class UploadTask {
    /**
     * @param ref - The firebaseStorage.Reference object this task came
     *     from, untyped to avoid cyclic dependencies.
     * @param blob - The blob to upload.
     */
    constructor(ref, blob, metadata = null) {
        /**
         * Number of bytes transferred so far.
         */
        this._transferred = 0;
        this._needToFetchStatus = false;
        this._needToFetchMetadata = false;
        this._observers = [];
        this._error = undefined;
        this._uploadUrl = undefined;
        this._request = undefined;
        this._chunkMultiplier = 1;
        this._resolve = undefined;
        this._reject = undefined;
        this._ref = ref;
        this._blob = blob;
        this._metadata = metadata;
        this._mappings = getMappings();
        this._resumable = this._shouldDoResumable(this._blob);
        this._state = "running" /* RUNNING */;
        this._errorHandler = error => {
            this._request = undefined;
            this._chunkMultiplier = 1;
            if (error._codeEquals("canceled" /* CANCELED */)) {
                this._needToFetchStatus = true;
                this.completeTransitions_();
            }
            else {
                this._error = error;
                this._transition("error" /* ERROR */);
            }
        };
        this._metadataErrorHandler = error => {
            this._request = undefined;
            if (error._codeEquals("canceled" /* CANCELED */)) {
                this.completeTransitions_();
            }
            else {
                this._error = error;
                this._transition("error" /* ERROR */);
            }
        };
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            this._start();
        });
        // Prevent uncaught rejections on the internal promise from bubbling out
        // to the top level with a dummy handler.
        this._promise.then(null, () => { });
    }
    _makeProgressCallback() {
        const sizeBefore = this._transferred;
        return loaded => this._updateProgress(sizeBefore + loaded);
    }
    _shouldDoResumable(blob) {
        return blob.size() > 256 * 1024;
    }
    _start() {
        if (this._state !== "running" /* RUNNING */) {
            // This can happen if someone pauses us in a resume callback, for example.
            return;
        }
        if (this._request !== undefined) {
            return;
        }
        if (this._resumable) {
            if (this._uploadUrl === undefined) {
                this._createResumable();
            }
            else {
                if (this._needToFetchStatus) {
                    this._fetchStatus();
                }
                else {
                    if (this._needToFetchMetadata) {
                        // Happens if we miss the metadata on upload completion.
                        this._fetchMetadata();
                    }
                    else {
                        this._continueUpload();
                    }
                }
            }
        }
        else {
            this._oneShotUpload();
        }
    }
    _resolveToken(callback) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Promise.all([
            this._ref.storage._getAuthToken(),
            this._ref.storage._getAppCheckToken()
        ]).then(([authToken, appCheckToken]) => {
            switch (this._state) {
                case "running" /* RUNNING */:
                    callback(authToken, appCheckToken);
                    break;
                case "canceling" /* CANCELING */:
                    this._transition("canceled" /* CANCELED */);
                    break;
                case "pausing" /* PAUSING */:
                    this._transition("paused" /* PAUSED */);
                    break;
            }
        });
    }
    // TODO(andysoto): assert false
    _createResumable() {
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = createResumableUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);
            const createRequest = this._ref.storage._makeRequest(requestInfo, authToken, appCheckToken);
            this._request = createRequest;
            createRequest.getPromise().then((url) => {
                this._request = undefined;
                this._uploadUrl = url;
                this._needToFetchStatus = false;
                this.completeTransitions_();
            }, this._errorHandler);
        });
    }
    _fetchStatus() {
        // TODO(andysoto): assert(this.uploadUrl_ !== null);
        const url = this._uploadUrl;
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = getResumableUploadStatus(this._ref.storage, this._ref._location, url, this._blob);
            const statusRequest = this._ref.storage._makeRequest(requestInfo, authToken, appCheckToken);
            this._request = statusRequest;
            statusRequest.getPromise().then(status => {
                status = status;
                this._request = undefined;
                this._updateProgress(status.current);
                this._needToFetchStatus = false;
                if (status.finalized) {
                    this._needToFetchMetadata = true;
                }
                this.completeTransitions_();
            }, this._errorHandler);
        });
    }
    _continueUpload() {
        const chunkSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier;
        const status = new ResumableUploadStatus(this._transferred, this._blob.size());
        // TODO(andysoto): assert(this.uploadUrl_ !== null);
        const url = this._uploadUrl;
        this._resolveToken((authToken, appCheckToken) => {
            let requestInfo;
            try {
                requestInfo = continueResumableUpload(this._ref._location, this._ref.storage, url, this._blob, chunkSize, this._mappings, status, this._makeProgressCallback());
            }
            catch (e) {
                this._error = e;
                this._transition("error" /* ERROR */);
                return;
            }
            const uploadRequest = this._ref.storage._makeRequest(requestInfo, authToken, appCheckToken);
            this._request = uploadRequest;
            uploadRequest.getPromise().then((newStatus) => {
                this._increaseMultiplier();
                this._request = undefined;
                this._updateProgress(newStatus.current);
                if (newStatus.finalized) {
                    this._metadata = newStatus.metadata;
                    this._transition("success" /* SUCCESS */);
                }
                else {
                    this.completeTransitions_();
                }
            }, this._errorHandler);
        });
    }
    _increaseMultiplier() {
        const currentSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier;
        // Max chunk size is 32M.
        if (currentSize < 32 * 1024 * 1024) {
            this._chunkMultiplier *= 2;
        }
    }
    _fetchMetadata() {
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = getMetadata$2(this._ref.storage, this._ref._location, this._mappings);
            const metadataRequest = this._ref.storage._makeRequest(requestInfo, authToken, appCheckToken);
            this._request = metadataRequest;
            metadataRequest.getPromise().then(metadata => {
                this._request = undefined;
                this._metadata = metadata;
                this._transition("success" /* SUCCESS */);
            }, this._metadataErrorHandler);
        });
    }
    _oneShotUpload() {
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = multipartUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);
            const multipartRequest = this._ref.storage._makeRequest(requestInfo, authToken, appCheckToken);
            this._request = multipartRequest;
            multipartRequest.getPromise().then(metadata => {
                this._request = undefined;
                this._metadata = metadata;
                this._updateProgress(this._blob.size());
                this._transition("success" /* SUCCESS */);
            }, this._errorHandler);
        });
    }
    _updateProgress(transferred) {
        const old = this._transferred;
        this._transferred = transferred;
        // A progress update can make the "transferred" value smaller (e.g. a
        // partial upload not completed by server, after which the "transferred"
        // value may reset to the value at the beginning of the request).
        if (this._transferred !== old) {
            this._notifyObservers();
        }
    }
    _transition(state) {
        if (this._state === state) {
            return;
        }
        switch (state) {
            case "canceling" /* CANCELING */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING ||
                //        this.state_ === InternalTaskState.PAUSING);
                this._state = state;
                if (this._request !== undefined) {
                    this._request.cancel();
                }
                break;
            case "pausing" /* PAUSING */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING);
                this._state = state;
                if (this._request !== undefined) {
                    this._request.cancel();
                }
                break;
            case "running" /* RUNNING */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.PAUSED ||
                //        this.state_ === InternalTaskState.PAUSING);
                const wasPaused = this._state === "paused" /* PAUSED */;
                this._state = state;
                if (wasPaused) {
                    this._notifyObservers();
                    this._start();
                }
                break;
            case "paused" /* PAUSED */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.PAUSING);
                this._state = state;
                this._notifyObservers();
                break;
            case "canceled" /* CANCELED */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.PAUSED ||
                //        this.state_ === InternalTaskState.CANCELING);
                this._error = canceled();
                this._state = state;
                this._notifyObservers();
                break;
            case "error" /* ERROR */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING ||
                //        this.state_ === InternalTaskState.PAUSING ||
                //        this.state_ === InternalTaskState.CANCELING);
                this._state = state;
                this._notifyObservers();
                break;
            case "success" /* SUCCESS */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING ||
                //        this.state_ === InternalTaskState.PAUSING ||
                //        this.state_ === InternalTaskState.CANCELING);
                this._state = state;
                this._notifyObservers();
                break;
        }
    }
    completeTransitions_() {
        switch (this._state) {
            case "pausing" /* PAUSING */:
                this._transition("paused" /* PAUSED */);
                break;
            case "canceling" /* CANCELING */:
                this._transition("canceled" /* CANCELED */);
                break;
            case "running" /* RUNNING */:
                this._start();
                break;
        }
    }
    /**
     * A snapshot of the current task state.
     */
    get snapshot() {
        const externalState = taskStateFromInternalTaskState(this._state);
        return {
            bytesTransferred: this._transferred,
            totalBytes: this._blob.size(),
            state: externalState,
            metadata: this._metadata,
            task: this,
            ref: this._ref
        };
    }
    /**
     * Adds a callback for an event.
     * @param type - The type of event to listen for.
     * @param nextOrObserver -
     *     The `next` function, which gets called for each item in
     *     the event stream, or an observer object with some or all of these three
     *     properties (`next`, `error`, `complete`).
     * @param error - A function that gets called with a `StorageError`
     *     if the event stream ends due to an error.
     * @param completed - A function that gets called if the
     *     event stream ends normally.
     * @returns
     *     If only the event argument is passed, returns a function you can use to
     *     add callbacks (see the examples above). If more than just the event
     *     argument is passed, returns a function you can call to unregister the
     *     callbacks.
     */
    on(type, nextOrObserver, error, completed) {
        const observer = new Observer(nextOrObserver || undefined, error || undefined, completed || undefined);
        this._addObserver(observer);
        return () => {
            this._removeObserver(observer);
        };
    }
    /**
     * This object behaves like a Promise, and resolves with its snapshot data
     * when the upload completes.
     * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
     * @param onRejected - The rejection callback.
     */
    then(onFulfilled, onRejected) {
        // These casts are needed so that TypeScript can infer the types of the
        // resulting Promise.
        return this._promise.then(onFulfilled, onRejected);
    }
    /**
     * Equivalent to calling `then(null, onRejected)`.
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    /**
     * Adds the given observer.
     */
    _addObserver(observer) {
        this._observers.push(observer);
        this._notifyObserver(observer);
    }
    /**
     * Removes the given observer.
     */
    _removeObserver(observer) {
        const i = this._observers.indexOf(observer);
        if (i !== -1) {
            this._observers.splice(i, 1);
        }
    }
    _notifyObservers() {
        this._finishPromise();
        const observers = this._observers.slice();
        observers.forEach(observer => {
            this._notifyObserver(observer);
        });
    }
    _finishPromise() {
        if (this._resolve !== undefined) {
            let triggered = true;
            switch (taskStateFromInternalTaskState(this._state)) {
                case TaskState.SUCCESS:
                    async(this._resolve.bind(null, this.snapshot))();
                    break;
                case TaskState.CANCELED:
                case TaskState.ERROR:
                    const toCall = this._reject;
                    async(toCall.bind(null, this._error))();
                    break;
                default:
                    triggered = false;
                    break;
            }
            if (triggered) {
                this._resolve = undefined;
                this._reject = undefined;
            }
        }
    }
    _notifyObserver(observer) {
        const externalState = taskStateFromInternalTaskState(this._state);
        switch (externalState) {
            case TaskState.RUNNING:
            case TaskState.PAUSED:
                if (observer.next) {
                    async(observer.next.bind(observer, this.snapshot))();
                }
                break;
            case TaskState.SUCCESS:
                if (observer.complete) {
                    async(observer.complete.bind(observer))();
                }
                break;
            case TaskState.CANCELED:
            case TaskState.ERROR:
                if (observer.error) {
                    async(observer.error.bind(observer, this._error))();
                }
                break;
            default:
                // TODO(andysoto): assert(false);
                if (observer.error) {
                    async(observer.error.bind(observer, this._error))();
                }
        }
    }
    /**
     * Resumes a paused task. Has no effect on a currently running or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    resume() {
        const valid = this._state === "paused" /* PAUSED */ ||
            this._state === "pausing" /* PAUSING */;
        if (valid) {
            this._transition("running" /* RUNNING */);
        }
        return valid;
    }
    /**
     * Pauses a currently running task. Has no effect on a paused or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    pause() {
        const valid = this._state === "running" /* RUNNING */;
        if (valid) {
            this._transition("pausing" /* PAUSING */);
        }
        return valid;
    }
    /**
     * Cancels a currently running or paused task. Has no effect on a complete or
     * failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    cancel() {
        const valid = this._state === "running" /* RUNNING */ ||
            this._state === "pausing" /* PAUSING */;
        if (valid) {
            this._transition("canceling" /* CANCELING */);
        }
        return valid;
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @internal
 * @param _location - An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
 */
class Reference {
    constructor(_service, location) {
        this._service = _service;
        if (location instanceof Location) {
            this._location = location;
        }
        else {
            this._location = Location.makeFromUrl(location, _service.host);
        }
    }
    /**
     * Returns the URL for the bucket and path this object references,
     *     in the form gs://<bucket>/<object-path>
     * @override
     */
    toString() {
        return 'gs://' + this._location.bucket + '/' + this._location.path;
    }
    _newRef(service, location) {
        return new Reference(service, location);
    }
    /**
     * A reference to the root of this object's bucket.
     */
    get root() {
        const location = new Location(this._location.bucket, '');
        return this._newRef(this._service, location);
    }
    /**
     * The name of the bucket containing this reference's object.
     */
    get bucket() {
        return this._location.bucket;
    }
    /**
     * The full path of this object.
     */
    get fullPath() {
        return this._location.path;
    }
    /**
     * The short name of this object, which is the last component of the full path.
     * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
     */
    get name() {
        return lastComponent(this._location.path);
    }
    /**
     * The `StorageService` instance this `StorageReference` is associated with.
     */
    get storage() {
        return this._service;
    }
    /**
     * A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
     * this reference is the root.
     */
    get parent() {
        const newPath = parent(this._location.path);
        if (newPath === null) {
            return null;
        }
        const location = new Location(this._location.bucket, newPath);
        return new Reference(this._service, location);
    }
    /**
     * Utility function to throw an error in methods that do not accept a root reference.
     */
    _throwIfRoot(name) {
        if (this._location.path === '') {
            throw invalidRootOperation(name);
        }
    }
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 *
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns A Promise containing an UploadResult
 */
function uploadBytes$1(ref, data, metadata) {
    ref._throwIfRoot('uploadBytes');
    const requestInfo = multipartUpload(ref.storage, ref._location, getMappings(), new FbsBlob(data, true), metadata);
    return ref.storage
        .makeRequestWithTokens(requestInfo)
        .then(request => request.getPromise())
        .then(finalMetadata => {
        return {
            metadata: finalMetadata,
            ref
        };
    });
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns An UploadTask
 */
function uploadBytesResumable$1(ref, data, metadata) {
    ref._throwIfRoot('uploadBytesResumable');
    return new UploadTask(ref, new FbsBlob(data), metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - StorageReference where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the newly uploaded string.
 * @returns A Promise containing an UploadResult
 */
function uploadString$1(ref, value, format = StringFormat.RAW, metadata) {
    ref._throwIfRoot('uploadString');
    const data = dataFromString(format, value);
    const metadataClone = Object.assign({}, metadata);
    if (metadataClone['contentType'] == null && data.contentType != null) {
        metadataClone['contentType'] = data.contentType;
    }
    return uploadBytes$1(ref, data.data, metadataClone);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: listAll may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - StorageReference to get list from.
 *
 * @returns A Promise that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */
function listAll$1(ref) {
    const accumulator = {
        prefixes: [],
        items: []
    };
    return listAllHelper(ref, accumulator).then(() => accumulator);
}
/**
 * Separated from listAll because async functions can't use "arguments".
 * @param ref
 * @param accumulator
 * @param pageToken
 */
async function listAllHelper(ref, accumulator, pageToken) {
    const opt = {
        // maxResults is 1000 by default.
        pageToken
    };
    const nextPage = await list$1(ref, opt);
    accumulator.prefixes.push(...nextPage.prefixes);
    accumulator.items.push(...nextPage.items);
    if (nextPage.nextPageToken != null) {
        await listAllHelper(ref, accumulator, nextPage.nextPageToken);
    }
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - StorageReference to get list from.
 * @param options - See ListOptions for details.
 * @returns A Promise that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */
async function list$1(ref, options) {
    if (options != null) {
        if (typeof options.maxResults === 'number') {
            validateNumber('options.maxResults', 
            /* minValue= */ 1, 
            /* maxValue= */ 1000, options.maxResults);
        }
    }
    const op = options || {};
    const requestInfo = list$2(ref.storage, ref._location, 
    /*delimiter= */ '/', op.pageToken, op.maxResults);
    return (await ref.storage.makeRequestWithTokens(requestInfo)).getPromise();
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - StorageReference to get metadata from.
 */
async function getMetadata$1(ref) {
    ref._throwIfRoot('getMetadata');
    const requestInfo = getMetadata$2(ref.storage, ref._location, getMappings());
    return (await ref.storage.makeRequestWithTokens(requestInfo)).getPromise();
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - StorageReference to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves
 *     with the new metadata for this object.
 *     See `firebaseStorage.Reference.prototype.getMetadata`
 */
async function updateMetadata$1(ref, metadata) {
    ref._throwIfRoot('updateMetadata');
    const requestInfo = updateMetadata$2(ref.storage, ref._location, metadata, getMappings());
    return (await ref.storage.makeRequestWithTokens(requestInfo)).getPromise();
}
/**
 * Returns the download URL for the given Reference.
 * @public
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */
async function getDownloadURL$1(ref) {
    ref._throwIfRoot('getDownloadURL');
    const requestInfo = getDownloadUrl(ref.storage, ref._location, getMappings());
    return (await ref.storage.makeRequestWithTokens(requestInfo))
        .getPromise()
        .then(url => {
        if (url === null) {
            throw noDownloadURL();
        }
        return url;
    });
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - StorageReference for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */
async function deleteObject$1(ref) {
    ref._throwIfRoot('deleteObject');
    const requestInfo = deleteObject$2(ref.storage, ref._location);
    return (await ref.storage.makeRequestWithTokens(requestInfo)).getPromise();
}
/**
 * Returns reference for object obtained by appending `childPath` to `ref`.
 *
 * @param ref - StorageReference to get child of.
 * @param childPath - Child path from provided ref.
 * @returns A reference to the object obtained by
 * appending childPath, removing any duplicate, beginning, or trailing
 * slashes.
 *
 */
function _getChild$1(ref, childPath) {
    const newPath = child(ref._location.path, childPath);
    const location = new Location(ref._location.bucket, newPath);
    return new Reference(ref.storage, location);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isUrl(path) {
    return /^[A-Za-z]+:\/\//.test(path);
}
/**
 * Returns a firebaseStorage.Reference for the given url.
 */
function refFromURL(service, url) {
    return new Reference(service, url);
}
/**
 * Returns a firebaseStorage.Reference for the given path in the default
 * bucket.
 */
function refFromPath(ref, path) {
    if (ref instanceof FirebaseStorageImpl) {
        const service = ref;
        if (service._bucket == null) {
            throw noDefaultBucket();
        }
        const reference = new Reference(service, service._bucket);
        if (path != null) {
            return refFromPath(reference, path);
        }
        else {
            return reference;
        }
    }
    else {
        // ref is a Reference
        if (path !== undefined) {
            return _getChild$1(ref, path);
        }
        else {
            return ref;
        }
    }
}
function ref$1(serviceOrRef, pathOrUrl) {
    if (pathOrUrl && isUrl(pathOrUrl)) {
        if (serviceOrRef instanceof FirebaseStorageImpl) {
            return refFromURL(serviceOrRef, pathOrUrl);
        }
        else {
            throw invalidArgument('To use ref(service, url), the first argument must be a Storage instance.');
        }
    }
    else {
        return refFromPath(serviceOrRef, pathOrUrl);
    }
}
function extractBucket(host, config) {
    const bucketString = config === null || config === void 0 ? void 0 : config[CONFIG_STORAGE_BUCKET_KEY];
    if (bucketString == null) {
        return null;
    }
    return Location.makeFromBucketSpec(bucketString, host);
}
function connectStorageEmulator$1(storage, host, port, options = {}) {
    storage.host = `${host}:${port}`;
    storage._protocol = 'http';
    const { mockUserToken } = options;
    if (mockUserToken) {
        storage._overrideAuthToken =
            typeof mockUserToken === 'string'
                ? mockUserToken
                : Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["createMockUserToken"])(mockUserToken, storage.app.options.projectId);
    }
}
/**
 * A service that provides Firebase Storage Reference instances.
 * @param opt_url - gs:// url to a custom Storage Bucket
 *
 * @internal
 */
class FirebaseStorageImpl {
    constructor(
    /**
     * FirebaseApp associated with this StorageService instance.
     */
    app, _authProvider, 
    /**
     * @internal
     */
    _appCheckProvider, 
    /**
     * @internal
     */
    _pool, _url, _firebaseVersion) {
        this.app = app;
        this._authProvider = _authProvider;
        this._appCheckProvider = _appCheckProvider;
        this._pool = _pool;
        this._url = _url;
        this._firebaseVersion = _firebaseVersion;
        this._bucket = null;
        /**
         * This string can be in the formats:
         * - host
         * - host:port
         */
        this._host = DEFAULT_HOST;
        this._protocol = 'https';
        this._appId = null;
        this._deleted = false;
        this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
        this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
        this._requests = new Set();
        if (_url != null) {
            this._bucket = Location.makeFromBucketSpec(_url, this._host);
        }
        else {
            this._bucket = extractBucket(this._host, this.app.options);
        }
    }
    /**
     * The host string for this service, in the form of `host` or
     * `host:port`.
     */
    get host() {
        return this._host;
    }
    set host(host) {
        this._host = host;
        if (this._url != null) {
            this._bucket = Location.makeFromBucketSpec(this._url, host);
        }
        else {
            this._bucket = extractBucket(host, this.app.options);
        }
    }
    /**
     * The maximum time to retry uploads in milliseconds.
     */
    get maxUploadRetryTime() {
        return this._maxUploadRetryTime;
    }
    set maxUploadRetryTime(time) {
        validateNumber('time', 
        /* minValue=*/ 0, 
        /* maxValue= */ Number.POSITIVE_INFINITY, time);
        this._maxUploadRetryTime = time;
    }
    /**
     * The maximum time to retry operations other than uploads or downloads in
     * milliseconds.
     */
    get maxOperationRetryTime() {
        return this._maxOperationRetryTime;
    }
    set maxOperationRetryTime(time) {
        validateNumber('time', 
        /* minValue=*/ 0, 
        /* maxValue= */ Number.POSITIVE_INFINITY, time);
        this._maxOperationRetryTime = time;
    }
    async _getAuthToken() {
        if (this._overrideAuthToken) {
            return this._overrideAuthToken;
        }
        const auth = this._authProvider.getImmediate({ optional: true });
        if (auth) {
            const tokenData = await auth.getToken();
            if (tokenData !== null) {
                return tokenData.accessToken;
            }
        }
        return null;
    }
    async _getAppCheckToken() {
        const appCheck = this._appCheckProvider.getImmediate({ optional: true });
        if (appCheck) {
            const result = await appCheck.getToken();
            // TODO: What do we want to do if there is an error getting the token?
            // Context: appCheck.getToken() will never throw even if an error happened. In the error case, a dummy token will be
            // returned along with an error field describing the error. In general, we shouldn't care about the error condition and just use
            // the token (actual or dummy) to send requests.
            return result.token;
        }
        return null;
    }
    /**
     * Stop running requests and prevent more from being created.
     */
    _delete() {
        if (!this._deleted) {
            this._deleted = true;
            this._requests.forEach(request => request.cancel());
            this._requests.clear();
        }
        return Promise.resolve();
    }
    /**
     * Returns a new firebaseStorage.Reference object referencing this StorageService
     * at the given Location.
     */
    _makeStorageReference(loc) {
        return new Reference(this, loc);
    }
    /**
     * @param requestInfo - HTTP RequestInfo object
     * @param authToken - Firebase auth token
     */
    _makeRequest(requestInfo, authToken, appCheckToken) {
        if (!this._deleted) {
            const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, this._pool, this._firebaseVersion);
            this._requests.add(request);
            // Request removes itself from set when complete.
            request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
            return request;
        }
        else {
            return new FailRequest(appDeleted());
        }
    }
    async makeRequestWithTokens(requestInfo) {
        const [authToken, appCheckToken] = await Promise.all([
            this._getAuthToken(),
            this._getAppCheckToken()
        ]);
        return this._makeRequest(requestInfo, authToken, appCheckToken);
    }
}

const name = "@firebase/storage";
const version = "0.8.4";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type constant for Firebase Storage.
 */
const STORAGE_TYPE = 'storage';

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns A Promise containing an UploadResult
 */
function uploadBytes(ref, data, metadata) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return uploadBytes$1(ref, data, metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the string to upload.
 * @returns A Promise containing an UploadResult
 */
function uploadString(ref, value, format, metadata) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return uploadString$1(ref, value, format, metadata);
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns An UploadTask
 */
function uploadBytesResumable(ref, data, metadata) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return uploadBytesResumable$1(ref, data, metadata);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - {@link StorageReference} to get metadata from.
 */
function getMetadata(ref) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return getMetadata$1(ref);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - {@link StorageReference} to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves with the new metadata for this object.
 */
function updateMetadata(ref, metadata) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return updateMetadata$1(ref, metadata);
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - {@link StorageReference} to get list from.
 * @param options - See {@link ListOptions} for details.
 * @returns A `Promise` that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */
function list(ref, options) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return list$1(ref, options);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: `listAll` may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - {@link StorageReference} to get list from.
 *
 * @returns A `Promise` that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */
function listAll(ref) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return listAll$1(ref);
}
/**
 * Returns the download URL for the given {@link StorageReference}.
 * @public
 * @param ref - {@link StorageReference} to get the download URL for.
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */
function getDownloadURL(ref) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return getDownloadURL$1(ref);
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - {@link StorageReference} for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */
function deleteObject(ref) {
    ref = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(ref);
    return deleteObject$1(ref);
}
function ref(serviceOrRef, pathOrUrl) {
    serviceOrRef = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(serviceOrRef);
    return ref$1(serviceOrRef, pathOrUrl);
}
/**
 * @internal
 */
function _getChild(ref, childPath) {
    return _getChild$1(ref, childPath);
}
/**
 * Gets a {@link FirebaseStorage} instance for the given Firebase app.
 * @public
 * @param app - Firebase app to get {@link FirebaseStorage} instance for.
 * @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
 * If not passed, uses the app's default Storage Bucket.
 * @returns A {@link FirebaseStorage} instance.
 */
function getStorage(app = Object(_firebase_app__WEBPACK_IMPORTED_MODULE_0__["getApp"])(), bucketUrl) {
    app = Object(_firebase_util__WEBPACK_IMPORTED_MODULE_1__["getModularInstance"])(app);
    const storageProvider = Object(_firebase_app__WEBPACK_IMPORTED_MODULE_0__["_getProvider"])(app, STORAGE_TYPE);
    const storageInstance = storageProvider.getImmediate({
        identifier: bucketUrl
    });
    return storageInstance;
}
/**
 * Modify this {@link FirebaseStorage} instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The {@link FirebaseStorage} instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @param options - Emulator options. `options.mockUserToken` is the mock auth
 * token to use for unit testing Security Rules.
 * @public
 */
function connectStorageEmulator(storage, host, port, options = {}) {
    connectStorageEmulator$1(storage, host, port, options);
}

/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */
function factory(container, { instanceIdentifier: url }) {
    const app = container.getProvider('app').getImmediate();
    const authProvider = container.getProvider('auth-internal');
    const appCheckProvider = container.getProvider('app-check-internal');
    return new FirebaseStorageImpl(app, authProvider, appCheckProvider, new ConnectionPool(), url, _firebase_app__WEBPACK_IMPORTED_MODULE_0__["SDK_VERSION"]);
}
function registerStorage() {
    Object(_firebase_app__WEBPACK_IMPORTED_MODULE_0__["_registerComponent"])(new _firebase_component__WEBPACK_IMPORTED_MODULE_2__["Component"](STORAGE_TYPE, factory, "PUBLIC" /* PUBLIC */).setMultipleInstances(true));
    //RUNTIME_ENV will be replaced during the compilation to "node" for nodejs and an empty string for browser
    Object(_firebase_app__WEBPACK_IMPORTED_MODULE_0__["registerVersion"])(name, version, '');
    // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
    Object(_firebase_app__WEBPACK_IMPORTED_MODULE_0__["registerVersion"])(name, version, 'esm2017');
}
registerStorage();


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/firebase/storage/dist/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/firebase/storage/dist/index.esm.js ***!
  \*********************************************************/
/*! exports provided: StringFormat, _FbsBlob, _Location, _TaskEvent, _TaskState, _UploadTask, _dataFromString, _getChild, _invalidArgument, _invalidRootOperation, connectStorageEmulator, deleteObject, getDownloadURL, getMetadata, getStorage, list, listAll, ref, updateMetadata, uploadBytes, uploadBytesResumable, uploadString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _firebase_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/storage */ "./node_modules/@firebase/storage/dist/index.esm2017.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StringFormat", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["StringFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_FbsBlob", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_FbsBlob"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_Location", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_Location"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_TaskEvent", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_TaskEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_TaskState", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_TaskState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_UploadTask", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_UploadTask"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_dataFromString", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_dataFromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_getChild", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_getChild"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_invalidArgument", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_invalidArgument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_invalidRootOperation", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["_invalidRootOperation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connectStorageEmulator", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["connectStorageEmulator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteObject", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["deleteObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDownloadURL", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["getDownloadURL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMetadata", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["getMetadata"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["getStorage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "list", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["list"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "listAll", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["listAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ref", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["ref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateMetadata", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["updateMetadata"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uploadBytes", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["uploadBytes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uploadBytesResumable", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["uploadBytesResumable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uploadString", function() { return _firebase_storage__WEBPACK_IMPORTED_MODULE_0__["uploadString"]; });


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5, NIL, version, validate, stringify, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/esm-browser/nil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NIL", function() { return _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/esm-browser/version.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _version_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/nil.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/nil.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('00000000-0000-0000-0000-000000000000');

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/parse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


function parse(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ __webpack_exports__["default"] = (parse);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/version.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/version.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


function version(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ __webpack_exports__["default"] = (version);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpcmViYXNlL3N0b3JhZ2UvZGlzdC9pbmRleC5lc20yMDE3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9maXJlYmFzZS9zdG9yYWdlL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9tZDUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc2hhMS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92MzUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVHO0FBQ2Y7QUFDeEM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNERBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFFBQVEsSUFBSSxrQkFBa0I7QUFDcEY7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0JBQWtCLElBQUksK0JBQStCO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELG9CQUFvQixHQUFHLFFBQVEsS0FBSyxhQUFhLElBQUksb0JBQW9CO0FBQ3ZJLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxpQkFBaUIsR0FBRyxhQUFhLEdBQUcsaUJBQWlCO0FBQ2hILHFDQUFxQztBQUNyQztBQUNBLGFBQWEsMkRBQTJEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVMsY0FBYyxTQUFTO0FBQ3BGO0FBQ0E7QUFDQSxvREFBb0QsU0FBUyxjQUFjLFNBQVM7QUFDcEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLO0FBQ2pDO0FBQ0EsY0FBYyxTQUFTLEtBQUssT0FBTyxLQUFLLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRkFBK0Y7QUFDL0Y7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLG1CQUFtQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1DQUFtQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFlBQVk7QUFDOUQ7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0NBQXdDLEVBQUU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkUsc0JBQXNCLEtBQUssR0FBRyxLQUFLO0FBQ25DO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMEVBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxpQkFBaUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELGlCQUFpQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUseUVBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5RUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5RUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSxVQUFVLHlFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHlFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4Qyx5QkFBeUIsa0JBQWtCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUseUVBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5RUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHVCQUF1QjtBQUNsRTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHlFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxVQUFVLHlFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseUVBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsc0JBQXNCO0FBQ2pDO0FBQ0EscUNBQXFDLHNCQUFzQjtBQUMzRDtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQSwwQkFBMEIsNERBQU07QUFDaEMsVUFBVSx5RUFBa0I7QUFDNUIsNEJBQTRCLGtFQUFZO0FBQ3hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBLHlCQUF5QixzQkFBc0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwwQkFBMEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsbUdBQW1HLHlEQUFXO0FBQzlHO0FBQ0E7QUFDQSxJQUFJLHdFQUFrQixLQUFLLDZEQUFTO0FBQ3BDO0FBQ0EsSUFBSSxxRUFBZTtBQUNuQjtBQUNBLElBQUkscUVBQWU7QUFDbkI7QUFDQTs7QUFFdWI7QUFDdmI7Ozs7Ozs7Ozs7Ozs7QUNyekdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ2xDOzs7Ozs7Ozs7Ozs7O0FDREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDQTtBQUNBO0FBQ0E7QUFDRTtBQUNRO0FBQ0U7QUFDRTs7Ozs7Ozs7Ozs7OztBQ1B0RDtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDs7QUFFQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWUsa0VBQUcsRTs7Ozs7Ozs7Ozs7O0FDdE5sQjtBQUFlLHFHQUFzQyxFOzs7Ozs7Ozs7Ozs7QUNBckQ7QUFBQTtBQUFxQzs7QUFFckM7QUFDQSxPQUFPLDREQUFRO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQUssRTs7Ozs7Ozs7Ozs7O0FDbENwQjtBQUFlLDZFQUFjLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEdBQUcseUNBQXlDLEU7Ozs7Ozs7Ozs7OztBQ0FwSTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDs7QUFFbEQ7O0FBRUEsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQjs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCOztBQUVBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixVQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRWUsbUVBQUksRTs7Ozs7Ozs7Ozs7O0FDL0ZuQjtBQUFBO0FBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseWdCQUF5Z0I7QUFDemdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sNERBQVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRWUsd0VBQVMsRTs7Ozs7Ozs7Ozs7O0FDN0J4QjtBQUFBO0FBQUE7QUFBMkI7QUFDWTtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYzs7O0FBR2Q7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRCwrQ0FBRzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQSx1RUFBdUU7QUFDdkU7O0FBRUEsMkVBQTJFOztBQUUzRSw2REFBNkQ7O0FBRTdEO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkIsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBLHNCQUFzQjs7QUFFdEIsbUNBQW1DOztBQUVuQyw2QkFBNkI7O0FBRTdCLGlDQUFpQzs7QUFFakMsMkJBQTJCOztBQUUzQixpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBLGdCQUFnQiw2REFBUztBQUN6Qjs7QUFFZSxpRUFBRSxFOzs7Ozs7Ozs7Ozs7QUM5RmpCO0FBQUE7QUFBQTtBQUEyQjtBQUNBO0FBQzNCLFNBQVMsdURBQUcsYUFBYSwrQ0FBRztBQUNiLGlFQUFFLEU7Ozs7Ozs7Ozs7OztBQ0hqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVDO0FBQ1I7O0FBRS9CO0FBQ0EsMENBQTBDOztBQUUxQzs7QUFFQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNBO0FBQ1E7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix5REFBSztBQUN2Qjs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxXQUFXLDZEQUFTO0FBQ3BCLEdBQUc7OztBQUdIO0FBQ0EsNkJBQTZCO0FBQzdCLEdBQUcsZUFBZTs7O0FBR2xCO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQy9EQTtBQUFBO0FBQUE7QUFBMkI7QUFDWTs7QUFFdkM7QUFDQTtBQUNBLCtDQUErQywrQ0FBRyxJQUFJOztBQUV0RDtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUyw2REFBUztBQUNsQjs7QUFFZSxpRUFBRSxFOzs7Ozs7Ozs7Ozs7QUN2QmpCO0FBQUE7QUFBQTtBQUEyQjtBQUNFO0FBQzdCLFNBQVMsdURBQUcsYUFBYSxnREFBSTtBQUNkLGlFQUFFLEU7Ozs7Ozs7Ozs7OztBQ0hqQjtBQUFBO0FBQStCOztBQUUvQjtBQUNBLHFDQUFxQyxpREFBSztBQUMxQzs7QUFFZSx1RUFBUSxFOzs7Ozs7Ozs7Ozs7QUNOdkI7QUFBQTtBQUFxQzs7QUFFckM7QUFDQSxPQUFPLDREQUFRO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVlLHNFQUFPLEUiLCJmaWxlIjoiMWU4MzlkMGI3MjZiYjNkNjNmZDgvdmVuZG9yc35ub3Rlc19uZXd+dG9waWNzX25ldy52ZW5kb3Jzfm5vdGVzX25ld350b3BpY3NfbmV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0QXBwLCBfZ2V0UHJvdmlkZXIsIF9yZWdpc3RlckNvbXBvbmVudCwgcmVnaXN0ZXJWZXJzaW9uLCBTREtfVkVSU0lPTiB9IGZyb20gJ0BmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgRmlyZWJhc2VFcnJvciwgY3JlYXRlTW9ja1VzZXJUb2tlbiwgZ2V0TW9kdWxhckluc3RhbmNlIH0gZnJvbSAnQGZpcmViYXNlL3V0aWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGZpcmViYXNlL2NvbXBvbmVudCc7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBFcnJvciBjb2RlcyBmb3IgcmVxdWVzdHMgbWFkZSBieSB0aGUgdGhlIFhocklvIHdyYXBwZXIuXHJcbiAqL1xyXG52YXIgRXJyb3JDb2RlO1xyXG4oZnVuY3Rpb24gKEVycm9yQ29kZSkge1xyXG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIk5PX0VSUk9SXCJdID0gMF0gPSBcIk5PX0VSUk9SXCI7XHJcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiTkVUV09SS19FUlJPUlwiXSA9IDFdID0gXCJORVRXT1JLX0VSUk9SXCI7XHJcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQUJPUlRcIl0gPSAyXSA9IFwiQUJPUlRcIjtcclxufSkoRXJyb3JDb2RlIHx8IChFcnJvckNvZGUgPSB7fSkpO1xuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBDb25zdGFudHMgdXNlZCBpbiB0aGUgRmlyZWJhc2UgU3RvcmFnZSBsaWJyYXJ5LlxyXG4gKi9cclxuLyoqXHJcbiAqIERvbWFpbiBuYW1lIGZvciBmaXJlYmFzZSBzdG9yYWdlLlxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9IT1NUID0gJ2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbSc7XHJcbi8qKlxyXG4gKiBUaGUga2V5IGluIEZpcmViYXNlIGNvbmZpZyBqc29uIGZvciB0aGUgc3RvcmFnZSBidWNrZXQuXHJcbiAqL1xyXG5jb25zdCBDT05GSUdfU1RPUkFHRV9CVUNLRVRfS0VZID0gJ3N0b3JhZ2VCdWNrZXQnO1xyXG4vKipcclxuICogMiBtaW51dGVzXHJcbiAqXHJcbiAqIFRoZSB0aW1lb3V0IGZvciBhbGwgb3BlcmF0aW9ucyBleGNlcHQgdXBsb2FkLlxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9NQVhfT1BFUkFUSU9OX1JFVFJZX1RJTUUgPSAyICogNjAgKiAxMDAwO1xyXG4vKipcclxuICogMTAgbWludXRlc1xyXG4gKlxyXG4gKiBUaGUgdGltZW91dCBmb3IgdXBsb2FkLlxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9NQVhfVVBMT0FEX1JFVFJZX1RJTUUgPSAxMCAqIDYwICogMTAwMDtcblxuLyoqXHJcbiAqIEFuIGVycm9yIHJldHVybmVkIGJ5IHRoZSBGaXJlYmFzZSBTdG9yYWdlIFNESy5cclxuICogQHB1YmxpY1xyXG4gKi9cclxuY2xhc3MgU3RvcmFnZUVycm9yIGV4dGVuZHMgRmlyZWJhc2VFcnJvciB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjb2RlIC0gQSBTdG9yYWdlRXJyb3JDb2RlIHN0cmluZyB0byBiZSBwcmVmaXhlZCB3aXRoICdzdG9yYWdlLycgYW5kXHJcbiAgICAgKiAgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlICAtIEVycm9yIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvZGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihwcmVwZW5kQ29kZShjb2RlKSwgYEZpcmViYXNlIFN0b3JhZ2U6ICR7bWVzc2FnZX0gKCR7cHJlcGVuZENvZGUoY29kZSl9KWApO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN0b3JlcyBjdXN0b20gZXJyb3IgZGF0YSB1bnF1ZSB0byBTdG9yYWdlRXJyb3IuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0geyBzZXJ2ZXJSZXNwb25zZTogbnVsbCB9O1xyXG4gICAgICAgIHRoaXMuX2Jhc2VNZXNzYWdlID0gdGhpcy5tZXNzYWdlO1xyXG4gICAgICAgIC8vIFdpdGhvdXQgdGhpcywgYGluc3RhbmNlb2YgU3RvcmFnZUVycm9yYCwgaW4gdGVzdHMgZm9yIGV4YW1wbGUsXHJcbiAgICAgICAgLy8gcmV0dXJucyBmYWxzZS5cclxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgU3RvcmFnZUVycm9yLnByb3RvdHlwZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmVzIGEgU3RvcmFnZUVycm9yQ29kZSBhZ2FpbnN0IHRoaXMgZXJyb3IncyBjb2RlLCBmaWx0ZXJpbmcgb3V0IHRoZSBwcmVmaXguXHJcbiAgICAgKi9cclxuICAgIF9jb2RlRXF1YWxzKGNvZGUpIHtcclxuICAgICAgICByZXR1cm4gcHJlcGVuZENvZGUoY29kZSkgPT09IHRoaXMuY29kZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9uYWwgcmVzcG9uc2UgbWVzc2FnZSB0aGF0IHdhcyBhZGRlZCBieSB0aGUgc2VydmVyLlxyXG4gICAgICovXHJcbiAgICBnZXQgc2VydmVyUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRGF0YS5zZXJ2ZXJSZXNwb25zZTtcclxuICAgIH1cclxuICAgIHNldCBzZXJ2ZXJSZXNwb25zZShzZXJ2ZXJSZXNwb25zZSkge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5zZXJ2ZXJSZXNwb25zZSA9IHNlcnZlclJlc3BvbnNlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuc2VydmVyUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gYCR7dGhpcy5fYmFzZU1lc3NhZ2V9XFxuJHt0aGlzLmN1c3RvbURhdGEuc2VydmVyUmVzcG9uc2V9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuX2Jhc2VNZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwcmVwZW5kQ29kZShjb2RlKSB7XHJcbiAgICByZXR1cm4gJ3N0b3JhZ2UvJyArIGNvZGU7XHJcbn1cclxuZnVuY3Rpb24gdW5rbm93bigpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSAnQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZCwgcGxlYXNlIGNoZWNrIHRoZSBlcnJvciBwYXlsb2FkIGZvciAnICtcclxuICAgICAgICAnc2VydmVyIHJlc3BvbnNlLic7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcInVua25vd25cIiAvKiBVTktOT1dOICovLCBtZXNzYWdlKTtcclxufVxyXG5mdW5jdGlvbiBvYmplY3ROb3RGb3VuZChwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcIm9iamVjdC1ub3QtZm91bmRcIiAvKiBPQkpFQ1RfTk9UX0ZPVU5EICovLCBcIk9iamVjdCAnXCIgKyBwYXRoICsgXCInIGRvZXMgbm90IGV4aXN0LlwiKTtcclxufVxyXG5mdW5jdGlvbiBxdW90YUV4Y2VlZGVkKGJ1Y2tldCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJxdW90YS1leGNlZWRlZFwiIC8qIFFVT1RBX0VYQ0VFREVEICovLCBcIlF1b3RhIGZvciBidWNrZXQgJ1wiICtcclxuICAgICAgICBidWNrZXQgK1xyXG4gICAgICAgIFwiJyBleGNlZWRlZCwgcGxlYXNlIHZpZXcgcXVvdGEgb24gXCIgK1xyXG4gICAgICAgICdodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vcHJpY2luZy8uJyk7XHJcbn1cclxuZnVuY3Rpb24gdW5hdXRoZW50aWNhdGVkKCkge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9ICdVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkLCBwbGVhc2UgYXV0aGVudGljYXRlIHVzaW5nIEZpcmViYXNlICcgK1xyXG4gICAgICAgICdBdXRoZW50aWNhdGlvbiBhbmQgdHJ5IGFnYWluLic7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcInVuYXV0aGVudGljYXRlZFwiIC8qIFVOQVVUSEVOVElDQVRFRCAqLywgbWVzc2FnZSk7XHJcbn1cclxuZnVuY3Rpb24gdW5hdXRob3JpemVkQXBwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJ1bmF1dGhvcml6ZWQtYXBwXCIgLyogVU5BVVRIT1JJWkVEX0FQUCAqLywgJ1RoaXMgYXBwIGRvZXMgbm90IGhhdmUgcGVybWlzc2lvbiB0byBhY2Nlc3MgRmlyZWJhc2UgU3RvcmFnZSBvbiB0aGlzIHByb2plY3QuJyk7XHJcbn1cclxuZnVuY3Rpb24gdW5hdXRob3JpemVkKHBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwidW5hdXRob3JpemVkXCIgLyogVU5BVVRIT1JJWkVEICovLCBcIlVzZXIgZG9lcyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGFjY2VzcyAnXCIgKyBwYXRoICsgXCInLlwiKTtcclxufVxyXG5mdW5jdGlvbiByZXRyeUxpbWl0RXhjZWVkZWQoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcInJldHJ5LWxpbWl0LWV4Y2VlZGVkXCIgLyogUkVUUllfTElNSVRfRVhDRUVERUQgKi8sICdNYXggcmV0cnkgdGltZSBmb3Igb3BlcmF0aW9uIGV4Y2VlZGVkLCBwbGVhc2UgdHJ5IGFnYWluLicpO1xyXG59XHJcbmZ1bmN0aW9uIGNhbmNlbGVkKCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovLCAnVXNlciBjYW5jZWxlZCB0aGUgdXBsb2FkL2Rvd25sb2FkLicpO1xyXG59XHJcbmZ1bmN0aW9uIGludmFsaWRVcmwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcImludmFsaWQtdXJsXCIgLyogSU5WQUxJRF9VUkwgKi8sIFwiSW52YWxpZCBVUkwgJ1wiICsgdXJsICsgXCInLlwiKTtcclxufVxyXG5mdW5jdGlvbiBpbnZhbGlkRGVmYXVsdEJ1Y2tldChidWNrZXQpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwiaW52YWxpZC1kZWZhdWx0LWJ1Y2tldFwiIC8qIElOVkFMSURfREVGQVVMVF9CVUNLRVQgKi8sIFwiSW52YWxpZCBkZWZhdWx0IGJ1Y2tldCAnXCIgKyBidWNrZXQgKyBcIicuXCIpO1xyXG59XHJcbmZ1bmN0aW9uIG5vRGVmYXVsdEJ1Y2tldCgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwibm8tZGVmYXVsdC1idWNrZXRcIiAvKiBOT19ERUZBVUxUX0JVQ0tFVCAqLywgJ05vIGRlZmF1bHQgYnVja2V0ICcgK1xyXG4gICAgICAgIFwiZm91bmQuIERpZCB5b3Ugc2V0IHRoZSAnXCIgK1xyXG4gICAgICAgIENPTkZJR19TVE9SQUdFX0JVQ0tFVF9LRVkgK1xyXG4gICAgICAgIFwiJyBwcm9wZXJ0eSB3aGVuIGluaXRpYWxpemluZyB0aGUgYXBwP1wiKTtcclxufVxyXG5mdW5jdGlvbiBjYW5ub3RTbGljZUJsb2IoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcImNhbm5vdC1zbGljZS1ibG9iXCIgLyogQ0FOTk9UX1NMSUNFX0JMT0IgKi8sICdDYW5ub3Qgc2xpY2UgYmxvYiBmb3IgdXBsb2FkLiBQbGVhc2UgcmV0cnkgdGhlIHVwbG9hZC4nKTtcclxufVxyXG5mdW5jdGlvbiBzZXJ2ZXJGaWxlV3JvbmdTaXplKCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJzZXJ2ZXItZmlsZS13cm9uZy1zaXplXCIgLyogU0VSVkVSX0ZJTEVfV1JPTkdfU0laRSAqLywgJ1NlcnZlciByZWNvcmRlZCBpbmNvcnJlY3QgdXBsb2FkIGZpbGUgc2l6ZSwgcGxlYXNlIHJldHJ5IHRoZSB1cGxvYWQuJyk7XHJcbn1cclxuZnVuY3Rpb24gbm9Eb3dubG9hZFVSTCgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwibm8tZG93bmxvYWQtdXJsXCIgLyogTk9fRE9XTkxPQURfVVJMICovLCAnVGhlIGdpdmVuIGZpbGUgZG9lcyBub3QgaGF2ZSBhbnkgZG93bmxvYWQgVVJMcy4nKTtcclxufVxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnZhbGlkQXJndW1lbnQobWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJpbnZhbGlkLWFyZ3VtZW50XCIgLyogSU5WQUxJRF9BUkdVTUVOVCAqLywgbWVzc2FnZSk7XHJcbn1cclxuZnVuY3Rpb24gYXBwRGVsZXRlZCgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwiYXBwLWRlbGV0ZWRcIiAvKiBBUFBfREVMRVRFRCAqLywgJ1RoZSBGaXJlYmFzZSBhcHAgd2FzIGRlbGV0ZWQuJyk7XHJcbn1cclxuLyoqXHJcbiAqIEBwYXJhbSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IHdhcyBpbnZhbGlkLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmZ1bmN0aW9uIGludmFsaWRSb290T3BlcmF0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwiaW52YWxpZC1yb290LW9wZXJhdGlvblwiIC8qIElOVkFMSURfUk9PVF9PUEVSQVRJT04gKi8sIFwiVGhlIG9wZXJhdGlvbiAnXCIgK1xyXG4gICAgICAgIG5hbWUgK1xyXG4gICAgICAgIFwiJyBjYW5ub3QgYmUgcGVyZm9ybWVkIG9uIGEgcm9vdCByZWZlcmVuY2UsIGNyZWF0ZSBhIG5vbi1yb290IFwiICtcclxuICAgICAgICBcInJlZmVyZW5jZSB1c2luZyBjaGlsZCwgc3VjaCBhcyAuY2hpbGQoJ2ZpbGUucG5nJykuXCIpO1xyXG59XHJcbi8qKlxyXG4gKiBAcGFyYW0gZm9ybWF0IC0gVGhlIGZvcm1hdCB0aGF0IHdhcyBub3QgdmFsaWQuXHJcbiAqIEBwYXJhbSBtZXNzYWdlIC0gQSBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGZvcm1hdCB2aW9sYXRpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnZhbGlkRm9ybWF0KGZvcm1hdCwgbWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJpbnZhbGlkLWZvcm1hdFwiIC8qIElOVkFMSURfRk9STUFUICovLCBcIlN0cmluZyBkb2VzIG5vdCBtYXRjaCBmb3JtYXQgJ1wiICsgZm9ybWF0ICsgXCInOiBcIiArIG1lc3NhZ2UpO1xyXG59XHJcbi8qKlxyXG4gKiBAcGFyYW0gbWVzc2FnZSAtIEEgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBpbnRlcm5hbCBlcnJvci5cclxuICovXHJcbmZ1bmN0aW9uIGludGVybmFsRXJyb3IobWVzc2FnZSkge1xyXG4gICAgdGhyb3cgbmV3IFN0b3JhZ2VFcnJvcihcImludGVybmFsLWVycm9yXCIgLyogSU5URVJOQUxfRVJST1IgKi8sICdJbnRlcm5hbCBlcnJvcjogJyArIG1lc3NhZ2UpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBOZXR3b3JrIGxheWVyIGZvciBicm93c2Vycy4gV2UgdXNlIHRoaXMgaW5zdGVhZCBvZiBnb29nLm5ldC5YaHJJbyBiZWNhdXNlXHJcbiAqIGdvb2cubmV0LlhocklvIGlzIGh5dXV1dWdlIGFuZCBkb2Vzbid0IHdvcmsgaW4gUmVhY3QgTmF0aXZlIG9uIEFuZHJvaWQuXHJcbiAqL1xyXG5jbGFzcyBYaHJDb25uZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2VudF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnhocl8gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB0aGlzLmVycm9yQ29kZV8gPSBFcnJvckNvZGUuTk9fRVJST1I7XHJcbiAgICAgICAgdGhpcy5zZW5kUHJvbWlzZV8gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgdGhpcy54aHJfLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckNvZGVfID0gRXJyb3JDb2RlLkFCT1JUO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy54aHJfLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckNvZGVfID0gRXJyb3JDb2RlLk5FVFdPUktfRVJST1I7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnhocl8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZW5kKHVybCwgbWV0aG9kLCBib2R5LCBoZWFkZXJzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VudF8pIHtcclxuICAgICAgICAgICAgdGhyb3cgaW50ZXJuYWxFcnJvcignY2Fubm90IC5zZW5kKCkgbW9yZSB0aGFuIG9uY2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZW50XyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy54aHJfLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIGlmIChoZWFkZXJzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGhyXy5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib2R5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy54aHJfLnNlbmQoYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnhocl8uc2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUHJvbWlzZV87XHJcbiAgICB9XHJcbiAgICBnZXRFcnJvckNvZGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbnRfKSB7XHJcbiAgICAgICAgICAgIHRocm93IGludGVybmFsRXJyb3IoJ2Nhbm5vdCAuZ2V0RXJyb3JDb2RlKCkgYmVmb3JlIHNlbmRpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JDb2RlXztcclxuICAgIH1cclxuICAgIGdldFN0YXR1cygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VudF8pIHtcclxuICAgICAgICAgICAgdGhyb3cgaW50ZXJuYWxFcnJvcignY2Fubm90IC5nZXRTdGF0dXMoKSBiZWZvcmUgc2VuZGluZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy54aHJfLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlc3BvbnNlVGV4dCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VudF8pIHtcclxuICAgICAgICAgICAgdGhyb3cgaW50ZXJuYWxFcnJvcignY2Fubm90IC5nZXRSZXNwb25zZVRleHQoKSBiZWZvcmUgc2VuZGluZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy54aHJfLnJlc3BvbnNlVGV4dDtcclxuICAgIH1cclxuICAgIC8qKiBBYm9ydHMgdGhlIHJlcXVlc3QuICovXHJcbiAgICBhYm9ydCgpIHtcclxuICAgICAgICB0aGlzLnhocl8uYWJvcnQoKTtcclxuICAgIH1cclxuICAgIGdldFJlc3BvbnNlSGVhZGVyKGhlYWRlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnhocl8uZ2V0UmVzcG9uc2VIZWFkZXIoaGVhZGVyKTtcclxuICAgIH1cclxuICAgIGFkZFVwbG9hZFByb2dyZXNzTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICBpZiAodGhpcy54aHJfLnVwbG9hZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMueGhyXy51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlVXBsb2FkUHJvZ3Jlc3NMaXN0ZW5lcihsaXN0ZW5lcikge1xyXG4gICAgICAgIGlmICh0aGlzLnhocl8udXBsb2FkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy54aHJfLnVwbG9hZC5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbmV3Q29ubmVjdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgWGhyQ29ubmVjdGlvbigpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBGYWN0b3J5LWxpa2UgY2xhc3MgZm9yIGNyZWF0aW5nIFhocklvIGluc3RhbmNlcy5cclxuICovXHJcbmNsYXNzIENvbm5lY3Rpb25Qb29sIHtcclxuICAgIGNyZWF0ZUNvbm5lY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ld0Nvbm5lY3Rpb24oKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogRmlyZWJhc2UgU3RvcmFnZSBsb2NhdGlvbiBkYXRhLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIExvY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGJ1Y2tldCwgcGF0aCkge1xyXG4gICAgICAgIHRoaXMuYnVja2V0ID0gYnVja2V0O1xyXG4gICAgICAgIHRoaXMucGF0aF8gPSBwYXRoO1xyXG4gICAgfVxyXG4gICAgZ2V0IHBhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aF87XHJcbiAgICB9XHJcbiAgICBnZXQgaXNSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGgubGVuZ3RoID09PSAwO1xyXG4gICAgfVxyXG4gICAgZnVsbFNlcnZlclVybCgpIHtcclxuICAgICAgICBjb25zdCBlbmNvZGUgPSBlbmNvZGVVUklDb21wb25lbnQ7XHJcbiAgICAgICAgcmV0dXJuICcvYi8nICsgZW5jb2RlKHRoaXMuYnVja2V0KSArICcvby8nICsgZW5jb2RlKHRoaXMucGF0aCk7XHJcbiAgICB9XHJcbiAgICBidWNrZXRPbmx5U2VydmVyVXJsKCkge1xyXG4gICAgICAgIGNvbnN0IGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcclxuICAgICAgICByZXR1cm4gJy9iLycgKyBlbmNvZGUodGhpcy5idWNrZXQpICsgJy9vJztcclxuICAgIH1cclxuICAgIHN0YXRpYyBtYWtlRnJvbUJ1Y2tldFNwZWMoYnVja2V0U3RyaW5nLCBob3N0KSB7XHJcbiAgICAgICAgbGV0IGJ1Y2tldExvY2F0aW9uO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGJ1Y2tldExvY2F0aW9uID0gTG9jYXRpb24ubWFrZUZyb21VcmwoYnVja2V0U3RyaW5nLCBob3N0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gTm90IHZhbGlkIFVSTCwgdXNlIGFzLWlzLiBUaGlzIGxldHMgeW91IHB1dCBiYXJlIGJ1Y2tldCBuYW1lcyBpblxyXG4gICAgICAgICAgICAvLyBjb25maWcuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTG9jYXRpb24oYnVja2V0U3RyaW5nLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWNrZXRMb2NhdGlvbi5wYXRoID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYnVja2V0TG9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBpbnZhbGlkRGVmYXVsdEJ1Y2tldChidWNrZXRTdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBtYWtlRnJvbVVybCh1cmwsIGhvc3QpIHtcclxuICAgICAgICBsZXQgbG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGJ1Y2tldERvbWFpbiA9ICcoW0EtWmEtejAtOS5cXFxcLV9dKyknO1xyXG4gICAgICAgIGZ1bmN0aW9uIGdzTW9kaWZ5KGxvYykge1xyXG4gICAgICAgICAgICBpZiAobG9jLnBhdGguY2hhckF0KGxvYy5wYXRoLmxlbmd0aCAtIDEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgICAgIGxvYy5wYXRoXyA9IGxvYy5wYXRoXy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZ3NQYXRoID0gJygvKC4qKSk/JCc7XHJcbiAgICAgICAgY29uc3QgZ3NSZWdleCA9IG5ldyBSZWdFeHAoJ15nczovLycgKyBidWNrZXREb21haW4gKyBnc1BhdGgsICdpJyk7XHJcbiAgICAgICAgY29uc3QgZ3NJbmRpY2VzID0geyBidWNrZXQ6IDEsIHBhdGg6IDMgfTtcclxuICAgICAgICBmdW5jdGlvbiBodHRwTW9kaWZ5KGxvYykge1xyXG4gICAgICAgICAgICBsb2MucGF0aF8gPSBkZWNvZGVVUklDb21wb25lbnQobG9jLnBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gJ3ZbQS1aYS16MC05X10rJztcclxuICAgICAgICBjb25zdCBmaXJlYmFzZVN0b3JhZ2VIb3N0ID0gaG9zdC5yZXBsYWNlKC9bLl0vZywgJ1xcXFwuJyk7XHJcbiAgICAgICAgY29uc3QgZmlyZWJhc2VTdG9yYWdlUGF0aCA9ICcoLyhbXj8jXSopLiopPyQnO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYXNlU3RvcmFnZVJlZ0V4cCA9IG5ldyBSZWdFeHAoYF5odHRwcz86Ly8ke2ZpcmViYXNlU3RvcmFnZUhvc3R9LyR7dmVyc2lvbn0vYi8ke2J1Y2tldERvbWFpbn0vbyR7ZmlyZWJhc2VTdG9yYWdlUGF0aH1gLCAnaScpO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYXNlU3RvcmFnZUluZGljZXMgPSB7IGJ1Y2tldDogMSwgcGF0aDogMyB9O1xyXG4gICAgICAgIGNvbnN0IGNsb3VkU3RvcmFnZUhvc3QgPSBob3N0ID09PSBERUZBVUxUX0hPU1RcclxuICAgICAgICAgICAgPyAnKD86c3RvcmFnZS5nb29nbGVhcGlzLmNvbXxzdG9yYWdlLmNsb3VkLmdvb2dsZS5jb20pJ1xyXG4gICAgICAgICAgICA6IGhvc3Q7XHJcbiAgICAgICAgY29uc3QgY2xvdWRTdG9yYWdlUGF0aCA9ICcoW14/I10qKSc7XHJcbiAgICAgICAgY29uc3QgY2xvdWRTdG9yYWdlUmVnRXhwID0gbmV3IFJlZ0V4cChgXmh0dHBzPzovLyR7Y2xvdWRTdG9yYWdlSG9zdH0vJHtidWNrZXREb21haW59LyR7Y2xvdWRTdG9yYWdlUGF0aH1gLCAnaScpO1xyXG4gICAgICAgIGNvbnN0IGNsb3VkU3RvcmFnZUluZGljZXMgPSB7IGJ1Y2tldDogMSwgcGF0aDogMiB9O1xyXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFtcclxuICAgICAgICAgICAgeyByZWdleDogZ3NSZWdleCwgaW5kaWNlczogZ3NJbmRpY2VzLCBwb3N0TW9kaWZ5OiBnc01vZGlmeSB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZWdleDogZmlyZWJhc2VTdG9yYWdlUmVnRXhwLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlczogZmlyZWJhc2VTdG9yYWdlSW5kaWNlcyxcclxuICAgICAgICAgICAgICAgIHBvc3RNb2RpZnk6IGh0dHBNb2RpZnlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmVnZXg6IGNsb3VkU3RvcmFnZVJlZ0V4cCxcclxuICAgICAgICAgICAgICAgIGluZGljZXM6IGNsb3VkU3RvcmFnZUluZGljZXMsXHJcbiAgICAgICAgICAgICAgICBwb3N0TW9kaWZ5OiBodHRwTW9kaWZ5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBjYXB0dXJlcyA9IGdyb3VwLnJlZ2V4LmV4ZWModXJsKTtcclxuICAgICAgICAgICAgaWYgKGNhcHR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWNrZXRWYWx1ZSA9IGNhcHR1cmVzW2dyb3VwLmluZGljZXMuYnVja2V0XTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoVmFsdWUgPSBjYXB0dXJlc1tncm91cC5pbmRpY2VzLnBhdGhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwYXRoVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoVmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKGJ1Y2tldFZhbHVlLCBwYXRoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAucG9zdE1vZGlmeShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9jYXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBpbnZhbGlkVXJsKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhdGlvbjtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQSByZXF1ZXN0IHdob3NlIHByb21pc2UgYWx3YXlzIGZhaWxzLlxyXG4gKi9cclxuY2xhc3MgRmFpbFJlcXVlc3Qge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcclxuICAgICAgICB0aGlzLnByb21pc2VfID0gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBnZXRQcm9taXNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjYW5jZWwoX2FwcERlbGV0ZSA9IGZhbHNlKSB7IH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQHBhcmFtIGYgTWF5IGJlIGludm9rZWRcclxuICogICAgIGJlZm9yZSB0aGUgZnVuY3Rpb24gcmV0dXJucy5cclxuICogQHBhcmFtIGNhbGxiYWNrIEdldCBhbGwgdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uXHJcbiAqICAgICBwYXNzZWQgdG8gZiwgaW5jbHVkaW5nIHRoZSBpbml0aWFsIGJvb2xlYW4uXHJcbiAqL1xyXG5mdW5jdGlvbiBzdGFydChmLCBcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuY2FsbGJhY2ssIHRpbWVvdXQpIHtcclxuICAgIC8vIFRPRE8oYW5keXNvdG8pOiBtYWtlIHRoaXMgY29kZSBjbGVhbmVyIChwcm9iYWJseSByZWZhY3RvciBpbnRvIGFuIGFjdHVhbFxyXG4gICAgLy8gdHlwZSBpbnN0ZWFkIG9mIGEgYnVuY2ggb2YgZnVuY3Rpb25zIHdpdGggc3RhdGUgc2hhcmVkIGluIHRoZSBjbG9zdXJlKVxyXG4gICAgbGV0IHdhaXRTZWNvbmRzID0gMTtcclxuICAgIC8vIFdvdWxkIHR5cGUgdGhpcyBhcyBcIm51bWJlclwiIGJ1dCB0aGF0IGRvZXNuJ3Qgd29yayBmb3IgTm9kZSBzbyDCr1xcXyjjg4QpXy/Cr1xyXG4gICAgLy8gVE9ETzogZmluZCBhIHdheSB0byBleGNsdWRlIE5vZGUgdHlwZSBkZWZpbml0aW9uIGZvciBzdG9yYWdlIGJlY2F1c2Ugc3RvcmFnZSBvbmx5IHdvcmtzIGluIGJyb3dzZXJcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBsZXQgdGltZW91dElkID0gbnVsbDtcclxuICAgIGxldCBoaXRUaW1lb3V0ID0gZmFsc2U7XHJcbiAgICBsZXQgY2FuY2VsU3RhdGUgPSAwO1xyXG4gICAgZnVuY3Rpb24gY2FuY2VsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbmNlbFN0YXRlID09PSAyO1xyXG4gICAgfVxyXG4gICAgbGV0IHRyaWdnZXJlZENhbGxiYWNrID0gZmFsc2U7XHJcbiAgICBmdW5jdGlvbiB0cmlnZ2VyQ2FsbGJhY2soLi4uYXJncykge1xyXG4gICAgICAgIGlmICghdHJpZ2dlcmVkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdHJpZ2dlcmVkQ2FsbGJhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjYWxsV2l0aERlbGF5KG1pbGxpcykge1xyXG4gICAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aW1lb3V0SWQgPSBudWxsO1xyXG4gICAgICAgICAgICBmKGhhbmRsZXIsIGNhbmNlbGVkKCkpO1xyXG4gICAgICAgIH0sIG1pbGxpcyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVyKHN1Y2Nlc3MsIC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAodHJpZ2dlcmVkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2suY2FsbChudWxsLCBzdWNjZXNzLCAuLi5hcmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtdXN0U3RvcCA9IGNhbmNlbGVkKCkgfHwgaGl0VGltZW91dDtcclxuICAgICAgICBpZiAobXVzdFN0b3ApIHtcclxuICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrLmNhbGwobnVsbCwgc3VjY2VzcywgLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdhaXRTZWNvbmRzIDwgNjQpIHtcclxuICAgICAgICAgICAgLyogVE9ETyhhbmR5c290byk6IGRvbid0IGJhY2sgb2ZmIHNvIHF1aWNrbHkgaWYgd2Uga25vdyB3ZSdyZSBvZmZsaW5lLiAqL1xyXG4gICAgICAgICAgICB3YWl0U2Vjb25kcyAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2FpdE1pbGxpcztcclxuICAgICAgICBpZiAoY2FuY2VsU3RhdGUgPT09IDEpIHtcclxuICAgICAgICAgICAgY2FuY2VsU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICB3YWl0TWlsbGlzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdhaXRNaWxsaXMgPSAod2FpdFNlY29uZHMgKyBNYXRoLnJhbmRvbSgpKSAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxXaXRoRGVsYXkod2FpdE1pbGxpcyk7XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gc3RvcCh3YXNUaW1lb3V0KSB7XHJcbiAgICAgICAgaWYgKHN0b3BwZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHJpZ2dlcmVkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGltZW91dElkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghd2FzVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xyXG4gICAgICAgICAgICBjYWxsV2l0aERlbGF5KDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF3YXNUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxTdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYWxsV2l0aERlbGF5KDApO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaGl0VGltZW91dCA9IHRydWU7XHJcbiAgICAgICAgc3RvcCh0cnVlKTtcclxuICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgcmV0dXJuIHN0b3A7XHJcbn1cclxuLyoqXHJcbiAqIFN0b3BzIHRoZSByZXRyeSBsb29wIGZyb20gcmVwZWF0aW5nLlxyXG4gKiBJZiB0aGUgZnVuY3Rpb24gaXMgY3VycmVudGx5IFwiaW4gYmV0d2VlblwiIHJldHJpZXMsIGl0IGlzIGludm9rZWQgaW1tZWRpYXRlbHlcclxuICogd2l0aCB0aGUgc2Vjb25kIHBhcmFtZXRlciBhcyBcInRydWVcIi4gT3RoZXJ3aXNlLCBpdCB3aWxsIGJlIGludm9rZWQgb25jZSBtb3JlXHJcbiAqIGFmdGVyIHRoZSBjdXJyZW50IGludm9jYXRpb24gZmluaXNoZXMgaWZmIHRoZSBjdXJyZW50IGludm9jYXRpb24gd291bGQgaGF2ZVxyXG4gKiB0cmlnZ2VyZWQgYW5vdGhlciByZXRyeS5cclxuICovXHJcbmZ1bmN0aW9uIHN0b3AoaWQpIHtcclxuICAgIGlkKGZhbHNlKTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0p1c3REZWYocCkge1xyXG4gICAgcmV0dXJuIHAgIT09IHZvaWQgMDtcclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHApIHtcclxuICAgIHJldHVybiB0eXBlb2YgcCA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5mdW5jdGlvbiBpc05vbkFycmF5T2JqZWN0KHApIHtcclxuICAgIHJldHVybiB0eXBlb2YgcCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkocCk7XHJcbn1cclxuZnVuY3Rpb24gaXNTdHJpbmcocCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBwID09PSAnc3RyaW5nJyB8fCBwIGluc3RhbmNlb2YgU3RyaW5nO1xyXG59XHJcbmZ1bmN0aW9uIGlzTmF0aXZlQmxvYihwKSB7XHJcbiAgICByZXR1cm4gaXNOYXRpdmVCbG9iRGVmaW5lZCgpICYmIHAgaW5zdGFuY2VvZiBCbG9iO1xyXG59XHJcbmZ1bmN0aW9uIGlzTmF0aXZlQmxvYkRlZmluZWQoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnO1xyXG59XHJcbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyKGFyZ3VtZW50LCBtaW5WYWx1ZSwgbWF4VmFsdWUsIHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgPCBtaW5WYWx1ZSkge1xyXG4gICAgICAgIHRocm93IGludmFsaWRBcmd1bWVudChgSW52YWxpZCB2YWx1ZSBmb3IgJyR7YXJndW1lbnR9Jy4gRXhwZWN0ZWQgJHttaW5WYWx1ZX0gb3IgZ3JlYXRlci5gKTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA+IG1heFZhbHVlKSB7XHJcbiAgICAgICAgdGhyb3cgaW52YWxpZEFyZ3VtZW50KGBJbnZhbGlkIHZhbHVlIGZvciAnJHthcmd1bWVudH0nLiBFeHBlY3RlZCAke21heFZhbHVlfSBvciBsZXNzLmApO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmZ1bmN0aW9uIG1ha2VVcmwodXJsUGFydCwgaG9zdCwgcHJvdG9jb2wpIHtcclxuICAgIGxldCBvcmlnaW4gPSBob3N0O1xyXG4gICAgaWYgKHByb3RvY29sID09IG51bGwpIHtcclxuICAgICAgICBvcmlnaW4gPSBgaHR0cHM6Ly8ke2hvc3R9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgJHtwcm90b2NvbH06Ly8ke29yaWdpbn0vdjAke3VybFBhcnR9YDtcclxufVxyXG5mdW5jdGlvbiBtYWtlUXVlcnlTdHJpbmcocGFyYW1zKSB7XHJcbiAgICBjb25zdCBlbmNvZGUgPSBlbmNvZGVVUklDb21wb25lbnQ7XHJcbiAgICBsZXQgcXVlcnlQYXJ0ID0gJz8nO1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRQYXJ0ID0gZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUocGFyYW1zW2tleV0pO1xyXG4gICAgICAgICAgICBxdWVyeVBhcnQgPSBxdWVyeVBhcnQgKyBuZXh0UGFydCArICcmJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBDaG9wIG9mZiB0aGUgZXh0cmEgJyYnIG9yICc/JyBvbiB0aGUgZW5kXHJcbiAgICBxdWVyeVBhcnQgPSBxdWVyeVBhcnQuc2xpY2UoMCwgLTEpO1xyXG4gICAgcmV0dXJuIHF1ZXJ5UGFydDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jbGFzcyBOZXR3b3JrUmVxdWVzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmxfLCBtZXRob2RfLCBoZWFkZXJzXywgYm9keV8sIHN1Y2Nlc3NDb2Rlc18sIGFkZGl0aW9uYWxSZXRyeUNvZGVzXywgY2FsbGJhY2tfLCBlcnJvckNhbGxiYWNrXywgdGltZW91dF8sIHByb2dyZXNzQ2FsbGJhY2tfLCBwb29sXykge1xyXG4gICAgICAgIHRoaXMudXJsXyA9IHVybF87XHJcbiAgICAgICAgdGhpcy5tZXRob2RfID0gbWV0aG9kXztcclxuICAgICAgICB0aGlzLmhlYWRlcnNfID0gaGVhZGVyc187XHJcbiAgICAgICAgdGhpcy5ib2R5XyA9IGJvZHlfO1xyXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NvZGVzXyA9IHN1Y2Nlc3NDb2Rlc187XHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsUmV0cnlDb2Rlc18gPSBhZGRpdGlvbmFsUmV0cnlDb2Rlc187XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFja187XHJcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrXyA9IGVycm9yQ2FsbGJhY2tfO1xyXG4gICAgICAgIHRoaXMudGltZW91dF8gPSB0aW1lb3V0XztcclxuICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfID0gcHJvZ3Jlc3NDYWxsYmFja187XHJcbiAgICAgICAgdGhpcy5wb29sXyA9IHBvb2xfO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0Nvbm5lY3Rpb25fID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJhY2tvZmZJZF8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hcHBEZWxldGVfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlXyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXNvbHZlXyA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgIHRoaXMucmVqZWN0XyA9IHJlamVjdDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydF8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsbHkgc3RhcnRzIHRoZSByZXRyeSBsb29wLlxyXG4gICAgICovXHJcbiAgICBzdGFydF8oKSB7XHJcbiAgICAgICAgY29uc3QgZG9UaGVSZXF1ZXN0ID0gKGJhY2tvZmZDYWxsYmFjaywgY2FuY2VsZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbmNlbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBiYWNrb2ZmQ2FsbGJhY2soZmFsc2UsIG5ldyBSZXF1ZXN0RW5kU3RhdHVzKGZhbHNlLCBudWxsLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMucG9vbF8uY3JlYXRlQ29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdDb25uZWN0aW9uXyA9IGNvbm5lY3Rpb247XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzTGlzdGVuZXIgPSBwcm9ncmVzc0V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZCA9IHByb2dyZXNzRXZlbnQubG9hZGVkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSBwcm9ncmVzc0V2ZW50Lmxlbmd0aENvbXB1dGFibGVcclxuICAgICAgICAgICAgICAgICAgICA/IHByb2dyZXNzRXZlbnQudG90YWxcclxuICAgICAgICAgICAgICAgICAgICA6IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NDYWxsYmFja18gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfKGxvYWRlZCwgdG90YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0NhbGxiYWNrXyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5hZGRVcGxvYWRQcm9ncmVzc0xpc3RlbmVyKHByb2dyZXNzTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbm5lY3Rpb24uc2VuZCgpIG5ldmVyIHJlamVjdHMsIHNvIHdlIGRvbid0IG5lZWQgdG8gaGF2ZSBhIGVycm9yIGhhbmRsZXIgb3IgdXNlIGNhdGNoIG9uIHRoZSByZXR1cm5lZCBwcm9taXNlLlxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25cclxuICAgICAgICAgICAgICAgIC5zZW5kKHRoaXMudXJsXywgdGhpcy5tZXRob2RfLCB0aGlzLmJvZHlfLCB0aGlzLmhlYWRlcnNfKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NDYWxsYmFja18gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbW92ZVVwbG9hZFByb2dyZXNzTGlzdGVuZXIocHJvZ3Jlc3NMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdDb25uZWN0aW9uXyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRTZXJ2ZXIgPSBjb25uZWN0aW9uLmdldEVycm9yQ29kZSgpID09PSBFcnJvckNvZGUuTk9fRVJST1I7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBjb25uZWN0aW9uLmdldFN0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoaXRTZXJ2ZXIgfHwgdGhpcy5pc1JldHJ5U3RhdHVzQ29kZV8oc3RhdHVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhc0NhbmNlbGVkID0gY29ubmVjdGlvbi5nZXRFcnJvckNvZGUoKSA9PT0gRXJyb3JDb2RlLkFCT1JUO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tvZmZDYWxsYmFjayhmYWxzZSwgbmV3IFJlcXVlc3RFbmRTdGF0dXMoZmFsc2UsIG51bGwsIHdhc0NhbmNlbGVkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc0NvZGUgPSB0aGlzLnN1Y2Nlc3NDb2Rlc18uaW5kZXhPZihzdGF0dXMpICE9PSAtMTtcclxuICAgICAgICAgICAgICAgIGJhY2tvZmZDYWxsYmFjayh0cnVlLCBuZXcgUmVxdWVzdEVuZFN0YXR1cyhzdWNjZXNzQ29kZSwgY29ubmVjdGlvbikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSByZXF1ZXN0V2VudFRocm91Z2ggLSBUcnVlIGlmIHRoZSByZXF1ZXN0IGV2ZW50dWFsbHkgd2VudFxyXG4gICAgICAgICAqICAgICB0aHJvdWdoLCBmYWxzZSBpZiBpdCBoaXQgdGhlIHJldHJ5IGxpbWl0IG9yIHdhcyBjYW5jZWxlZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBiYWNrb2ZmRG9uZSA9IChyZXF1ZXN0V2VudFRocm91Z2gsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlID0gdGhpcy5yZXNvbHZlXztcclxuICAgICAgICAgICAgY29uc3QgcmVqZWN0ID0gdGhpcy5yZWplY3RfO1xyXG4gICAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gc3RhdHVzLmNvbm5lY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMud2FzU3VjY2Vzc0NvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jYWxsYmFja18oY29ubmVjdGlvbiwgY29ubmVjdGlvbi5nZXRSZXNwb25zZVRleHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSnVzdERlZihyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gdW5rbm93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVyci5zZXJ2ZXJSZXNwb25zZSA9IGNvbm5lY3Rpb24uZ2V0UmVzcG9uc2VUZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JDYWxsYmFja18pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMuZXJyb3JDYWxsYmFja18oY29ubmVjdGlvbiwgZXJyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLmNhbmNlbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IHRoaXMuYXBwRGVsZXRlXyA/IGFwcERlbGV0ZWQoKSA6IGNhbmNlbGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gcmV0cnlMaW1pdEV4Y2VlZGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsZWRfKSB7XHJcbiAgICAgICAgICAgIGJhY2tvZmZEb25lKGZhbHNlLCBuZXcgUmVxdWVzdEVuZFN0YXR1cyhmYWxzZSwgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmSWRfID0gc3RhcnQoZG9UaGVSZXF1ZXN0LCBiYWNrb2ZmRG9uZSwgdGhpcy50aW1lb3V0Xyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBnZXRQcm9taXNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjYW5jZWwoYXBwRGVsZXRlKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxlZF8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXBwRGVsZXRlXyA9IGFwcERlbGV0ZSB8fCBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5iYWNrb2ZmSWRfICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHN0b3AodGhpcy5iYWNrb2ZmSWRfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ0Nvbm5lY3Rpb25fICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0Nvbm5lY3Rpb25fLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNSZXRyeVN0YXR1c0NvZGVfKHN0YXR1cykge1xyXG4gICAgICAgIC8vIFRoZSBjb2RlcyBmb3Igd2hpY2ggdG8gcmV0cnkgY2FtZSBmcm9tIHRoaXMgcGFnZTpcclxuICAgICAgICAvLyBodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vc3RvcmFnZS9kb2NzL2V4cG9uZW50aWFsLWJhY2tvZmZcclxuICAgICAgICBjb25zdCBpc0ZpdmVIdW5kcmVkQ29kZSA9IHN0YXR1cyA+PSA1MDAgJiYgc3RhdHVzIDwgNjAwO1xyXG4gICAgICAgIGNvbnN0IGV4dHJhUmV0cnlDb2RlcyA9IFtcclxuICAgICAgICAgICAgLy8gUmVxdWVzdCBUaW1lb3V0OiB3ZWIgc2VydmVyIGRpZG4ndCByZWNlaXZlIGZ1bGwgcmVxdWVzdCBpbiB0aW1lLlxyXG4gICAgICAgICAgICA0MDgsXHJcbiAgICAgICAgICAgIC8vIFRvbyBNYW55IFJlcXVlc3RzOiB5b3UncmUgZ2V0dGluZyByYXRlLWxpbWl0ZWQsIGJhc2ljYWxseS5cclxuICAgICAgICAgICAgNDI5XHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBpc0V4dHJhUmV0cnlDb2RlID0gZXh0cmFSZXRyeUNvZGVzLmluZGV4T2Yoc3RhdHVzKSAhPT0gLTE7XHJcbiAgICAgICAgY29uc3QgaXNSZXF1ZXN0U3BlY2lmaWNSZXRyeUNvZGUgPSB0aGlzLmFkZGl0aW9uYWxSZXRyeUNvZGVzXy5pbmRleE9mKHN0YXR1cykgIT09IC0xO1xyXG4gICAgICAgIHJldHVybiBpc0ZpdmVIdW5kcmVkQ29kZSB8fCBpc0V4dHJhUmV0cnlDb2RlIHx8IGlzUmVxdWVzdFNwZWNpZmljUmV0cnlDb2RlO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2YgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlc3VsdCBvZiBhIG5ldHdvcmsgcmVxdWVzdC5cclxuICogQHBhcmFtIG9wdF9jYW5jZWxlZCAtIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gKi9cclxuY2xhc3MgUmVxdWVzdEVuZFN0YXR1cyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3YXNTdWNjZXNzQ29kZSwgY29ubmVjdGlvbiwgY2FuY2VsZWQpIHtcclxuICAgICAgICB0aGlzLndhc1N1Y2Nlc3NDb2RlID0gd2FzU3VjY2Vzc0NvZGU7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcclxuICAgICAgICB0aGlzLmNhbmNlbGVkID0gISFjYW5jZWxlZDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGRBdXRoSGVhZGVyXyhoZWFkZXJzLCBhdXRoVG9rZW4pIHtcclxuICAgIGlmIChhdXRoVG9rZW4gIT09IG51bGwgJiYgYXV0aFRva2VuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSAnRmlyZWJhc2UgJyArIGF1dGhUb2tlbjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGRWZXJzaW9uSGVhZGVyXyhoZWFkZXJzLCBmaXJlYmFzZVZlcnNpb24pIHtcclxuICAgIGhlYWRlcnNbJ1gtRmlyZWJhc2UtU3RvcmFnZS1WZXJzaW9uJ10gPVxyXG4gICAgICAgICd3ZWJqcy8nICsgKGZpcmViYXNlVmVyc2lvbiAhPT0gbnVsbCAmJiBmaXJlYmFzZVZlcnNpb24gIT09IHZvaWQgMCA/IGZpcmViYXNlVmVyc2lvbiA6ICdBcHBNYW5hZ2VyJyk7XHJcbn1cclxuZnVuY3Rpb24gYWRkR21waWRIZWFkZXJfKGhlYWRlcnMsIGFwcElkKSB7XHJcbiAgICBpZiAoYXBwSWQpIHtcclxuICAgICAgICBoZWFkZXJzWydYLUZpcmViYXNlLUdNUElEJ10gPSBhcHBJZDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGRBcHBDaGVja0hlYWRlcl8oaGVhZGVycywgYXBwQ2hlY2tUb2tlbikge1xyXG4gICAgaWYgKGFwcENoZWNrVG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgICBoZWFkZXJzWydYLUZpcmViYXNlLUFwcENoZWNrJ10gPSBhcHBDaGVja1Rva2VuO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0KHJlcXVlc3RJbmZvLCBhcHBJZCwgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuLCBwb29sLCBmaXJlYmFzZVZlcnNpb24pIHtcclxuICAgIGNvbnN0IHF1ZXJ5UGFydCA9IG1ha2VRdWVyeVN0cmluZyhyZXF1ZXN0SW5mby51cmxQYXJhbXMpO1xyXG4gICAgY29uc3QgdXJsID0gcmVxdWVzdEluZm8udXJsICsgcXVlcnlQYXJ0O1xyXG4gICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVlc3RJbmZvLmhlYWRlcnMpO1xyXG4gICAgYWRkR21waWRIZWFkZXJfKGhlYWRlcnMsIGFwcElkKTtcclxuICAgIGFkZEF1dGhIZWFkZXJfKGhlYWRlcnMsIGF1dGhUb2tlbik7XHJcbiAgICBhZGRWZXJzaW9uSGVhZGVyXyhoZWFkZXJzLCBmaXJlYmFzZVZlcnNpb24pO1xyXG4gICAgYWRkQXBwQ2hlY2tIZWFkZXJfKGhlYWRlcnMsIGFwcENoZWNrVG9rZW4pO1xyXG4gICAgcmV0dXJuIG5ldyBOZXR3b3JrUmVxdWVzdCh1cmwsIHJlcXVlc3RJbmZvLm1ldGhvZCwgaGVhZGVycywgcmVxdWVzdEluZm8uYm9keSwgcmVxdWVzdEluZm8uc3VjY2Vzc0NvZGVzLCByZXF1ZXN0SW5mby5hZGRpdGlvbmFsUmV0cnlDb2RlcywgcmVxdWVzdEluZm8uaGFuZGxlciwgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyLCByZXF1ZXN0SW5mby50aW1lb3V0LCByZXF1ZXN0SW5mby5wcm9ncmVzc0NhbGxiYWNrLCBwb29sKTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCbG9iQnVpbGRlcigpIHtcclxuICAgIGlmICh0eXBlb2YgQmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIEJsb2JCdWlsZGVyO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIFdlYktpdEJsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBXZWJLaXRCbG9iQnVpbGRlcjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIENvbmNhdGVuYXRlcyBvbmUgb3IgbW9yZSB2YWx1ZXMgdG9nZXRoZXIgYW5kIGNvbnZlcnRzIHRoZW0gdG8gYSBCbG9iLlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJncyBUaGUgdmFsdWVzIHRoYXQgd2lsbCBtYWtlIHVwIHRoZSByZXN1bHRpbmcgYmxvYi5cclxuICogQHJldHVybiBUaGUgYmxvYi5cclxuICovXHJcbmZ1bmN0aW9uIGdldEJsb2IoLi4uYXJncykge1xyXG4gICAgY29uc3QgQmxvYkJ1aWxkZXIgPSBnZXRCbG9iQnVpbGRlcigpO1xyXG4gICAgaWYgKEJsb2JCdWlsZGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBiYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBiYi5hcHBlbmQoYXJnc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYi5nZXRCbG9iKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaXNOYXRpdmVCbG9iRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTdG9yYWdlRXJyb3IoXCJ1bnN1cHBvcnRlZC1lbnZpcm9ubWVudFwiIC8qIFVOU1VQUE9SVEVEX0VOVklST05NRU5UICovLCBcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCBjcmVhdGluZyBCbG9ic1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFNsaWNlcyB0aGUgYmxvYi4gVGhlIHJldHVybmVkIGJsb2IgY29udGFpbnMgZGF0YSBmcm9tIHRoZSBzdGFydCBieXRlXHJcbiAqIChpbmNsdXNpdmUpIHRpbGwgdGhlIGVuZCBieXRlIChleGNsdXNpdmUpLiBOZWdhdGl2ZSBpbmRpY2VzIGNhbm5vdCBiZSB1c2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0gYmxvYiBUaGUgYmxvYiB0byBiZSBzbGljZWQuXHJcbiAqIEBwYXJhbSBzdGFydCBJbmRleCBvZiB0aGUgc3RhcnRpbmcgYnl0ZS5cclxuICogQHBhcmFtIGVuZCBJbmRleCBvZiB0aGUgZW5kaW5nIGJ5dGUuXHJcbiAqIEByZXR1cm4gVGhlIGJsb2Igc2xpY2Ugb3IgbnVsbCBpZiBub3Qgc3VwcG9ydGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gc2xpY2VCbG9iKGJsb2IsIHN0YXJ0LCBlbmQpIHtcclxuICAgIGlmIChibG9iLndlYmtpdFNsaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2Iud2Via2l0U2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChibG9iLm1velNsaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2IubW96U2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChibG9iLnNsaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2Iuc2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKiogQ29udmVydHMgYSBCYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBiaW5hcnkgc3RyaW5nLiAqL1xyXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjQoZW5jb2RlZCkge1xyXG4gICAgcmV0dXJuIGF0b2IoZW5jb2RlZCk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEFuIGVudW1lcmF0aW9uIG9mIHRoZSBwb3NzaWJsZSBzdHJpbmcgZm9ybWF0cyBmb3IgdXBsb2FkLlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5jb25zdCBTdHJpbmdGb3JtYXQgPSB7XHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGUgc3RyaW5nIHNob3VsZCBiZSBpbnRlcnByZXRlZCBcInJhd1wiLCB0aGF0IGlzLCBhcyBub3JtYWwgdGV4dC5cclxuICAgICAqIFRoZSBzdHJpbmcgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyBVVEYtMTYsIHRoZW4gdXBsb2FkZWQgYXMgYSBVVEYtOCBieXRlXHJcbiAgICAgKiBzZXF1ZW5jZS5cclxuICAgICAqIEV4YW1wbGU6IFRoZSBzdHJpbmcgJ0hlbGxvISBcXFxcdWQ4M2RcXFxcdWRlMGEnIGJlY29tZXMgdGhlIGJ5dGUgc2VxdWVuY2VcclxuICAgICAqIDQ4IDY1IDZjIDZjIDZmIDIxIDIwIGYwIDlmIDk4IDhhXHJcbiAgICAgKi9cclxuICAgIFJBVzogJ3JhdycsXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGUgc3RyaW5nIHNob3VsZCBiZSBpbnRlcnByZXRlZCBhcyBiYXNlNjQtZW5jb2RlZCBkYXRhLlxyXG4gICAgICogUGFkZGluZyBjaGFyYWN0ZXJzICh0cmFpbGluZyAnPSdzKSBhcmUgb3B0aW9uYWwuXHJcbiAgICAgKiBFeGFtcGxlOiBUaGUgc3RyaW5nICdyV21PKytFNnQ3L3Jsdz09JyBiZWNvbWVzIHRoZSBieXRlIHNlcXVlbmNlXHJcbiAgICAgKiBhZCA2OSA4ZSBmYiBlMSAzYSBiNyBiZiBlYiA5N1xyXG4gICAgICovXHJcbiAgICBCQVNFNjQ6ICdiYXNlNjQnLFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHN0cmluZyBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXMgYmFzZTY0dXJsLWVuY29kZWQgZGF0YS5cclxuICAgICAqIFBhZGRpbmcgY2hhcmFjdGVycyAodHJhaWxpbmcgJz0ncykgYXJlIG9wdGlvbmFsLlxyXG4gICAgICogRXhhbXBsZTogVGhlIHN0cmluZyAncldtTy0tRTZ0N19ybHc9PScgYmVjb21lcyB0aGUgYnl0ZSBzZXF1ZW5jZVxyXG4gICAgICogYWQgNjkgOGUgZmIgZTEgM2EgYjcgYmYgZWIgOTdcclxuICAgICAqL1xyXG4gICAgQkFTRTY0VVJMOiAnYmFzZTY0dXJsJyxcclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHRoZSBzdHJpbmcgaXMgYSBkYXRhIFVSTCwgc3VjaCBhcyBvbmUgb2J0YWluZWQgZnJvbVxyXG4gICAgICogY2FudmFzLnRvRGF0YVVSTCgpLlxyXG4gICAgICogRXhhbXBsZTogdGhlIHN0cmluZyAnZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LGFhYWEnXHJcbiAgICAgKiBiZWNvbWVzIHRoZSBieXRlIHNlcXVlbmNlXHJcbiAgICAgKiA2OSBhNiA5YVxyXG4gICAgICogKHRoZSBjb250ZW50LXR5cGUgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiBpcyBhbHNvIGFwcGxpZWQsIGJ1dCBjYW5cclxuICAgICAqIGJlIG92ZXJyaWRkZW4gaW4gdGhlIG1ldGFkYXRhIG9iamVjdCkuXHJcbiAgICAgKi9cclxuICAgIERBVEFfVVJMOiAnZGF0YV91cmwnXHJcbn07XHJcbmNsYXNzIFN0cmluZ0RhdGEge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSwgY29udGVudFR5cGUpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR5cGUgPSBjb250ZW50VHlwZSB8fCBudWxsO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmZ1bmN0aW9uIGRhdGFGcm9tU3RyaW5nKGZvcm1hdCwgc3RyaW5nRGF0YSkge1xyXG4gICAgc3dpdGNoIChmb3JtYXQpIHtcclxuICAgICAgICBjYXNlIFN0cmluZ0Zvcm1hdC5SQVc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3RyaW5nRGF0YSh1dGY4Qnl0ZXNfKHN0cmluZ0RhdGEpKTtcclxuICAgICAgICBjYXNlIFN0cmluZ0Zvcm1hdC5CQVNFNjQ6XHJcbiAgICAgICAgY2FzZSBTdHJpbmdGb3JtYXQuQkFTRTY0VVJMOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0RhdGEoYmFzZTY0Qnl0ZXNfKGZvcm1hdCwgc3RyaW5nRGF0YSkpO1xyXG4gICAgICAgIGNhc2UgU3RyaW5nRm9ybWF0LkRBVEFfVVJMOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0RhdGEoZGF0YVVSTEJ5dGVzXyhzdHJpbmdEYXRhKSwgZGF0YVVSTENvbnRlbnRUeXBlXyhzdHJpbmdEYXRhKSk7XHJcbiAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgfVxyXG4gICAgLy8gYXNzZXJ0KGZhbHNlKTtcclxuICAgIHRocm93IHVua25vd24oKTtcclxufVxyXG5mdW5jdGlvbiB1dGY4Qnl0ZXNfKHZhbHVlKSB7XHJcbiAgICBjb25zdCBiID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGMgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjIDw9IDEyNykge1xyXG4gICAgICAgICAgICBiLnB1c2goYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYyA8PSAyMDQ3KSB7XHJcbiAgICAgICAgICAgICAgICBiLnB1c2goMTkyIHwgKGMgPj4gNiksIDEyOCB8IChjICYgNjMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgoYyAmIDY0NTEyKSA9PT0gNTUyOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgc3RhcnQgb2YgYSBzdXJyb2dhdGUgcGFpci5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IGkgPCB2YWx1ZS5sZW5ndGggLSAxICYmICh2YWx1ZS5jaGFyQ29kZUF0KGkgKyAxKSAmIDY0NTEyKSA9PT0gNTYzMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgc2Vjb25kIHN1cnJvZ2F0ZSB3YXNuJ3QgdGhlcmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaCgyMzksIDE5MSwgMTg5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpID0gYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG8gPSB2YWx1ZS5jaGFyQ29kZUF0KCsraSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSA2NTUzNiB8ICgoaGkgJiAxMDIzKSA8PCAxMCkgfCAobG8gJiAxMDIzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYi5wdXNoKDI0MCB8IChjID4+IDE4KSwgMTI4IHwgKChjID4+IDEyKSAmIDYzKSwgMTI4IHwgKChjID4+IDYpICYgNjMpLCAxMjggfCAoYyAmIDYzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjICYgNjQ1MTIpID09PSA1NjMyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIGxvdyBzdXJyb2dhdGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaCgyMzksIDE5MSwgMTg5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaCgyMjQgfCAoYyA+PiAxMiksIDEyOCB8ICgoYyA+PiA2KSAmIDYzKSwgMTI4IHwgKGMgJiA2MykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShiKTtcclxufVxyXG5mdW5jdGlvbiBwZXJjZW50RW5jb2RlZEJ5dGVzXyh2YWx1ZSkge1xyXG4gICAgbGV0IGRlY29kZWQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBpbnZhbGlkRm9ybWF0KFN0cmluZ0Zvcm1hdC5EQVRBX1VSTCwgJ01hbGZvcm1lZCBkYXRhIFVSTC4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1dGY4Qnl0ZXNfKGRlY29kZWQpO1xyXG59XHJcbmZ1bmN0aW9uIGJhc2U2NEJ5dGVzXyhmb3JtYXQsIHZhbHVlKSB7XHJcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xyXG4gICAgICAgIGNhc2UgU3RyaW5nRm9ybWF0LkJBU0U2NDoge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNNaW51cyA9IHZhbHVlLmluZGV4T2YoJy0nKSAhPT0gLTE7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc1VuZGVyID0gdmFsdWUuaW5kZXhPZignXycpICE9PSAtMTtcclxuICAgICAgICAgICAgaWYgKGhhc01pbnVzIHx8IGhhc1VuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQ2hhciA9IGhhc01pbnVzID8gJy0nIDogJ18nO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgaW52YWxpZEZvcm1hdChmb3JtYXQsIFwiSW52YWxpZCBjaGFyYWN0ZXIgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkQ2hhciArXHJcbiAgICAgICAgICAgICAgICAgICAgXCInIGZvdW5kOiBpcyBpdCBiYXNlNjR1cmwgZW5jb2RlZD9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgU3RyaW5nRm9ybWF0LkJBU0U2NFVSTDoge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNQbHVzID0gdmFsdWUuaW5kZXhPZignKycpICE9PSAtMTtcclxuICAgICAgICAgICAgY29uc3QgaGFzU2xhc2ggPSB2YWx1ZS5pbmRleE9mKCcvJykgIT09IC0xO1xyXG4gICAgICAgICAgICBpZiAoaGFzUGx1cyB8fCBoYXNTbGFzaCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52YWxpZENoYXIgPSBoYXNQbHVzID8gJysnIDogJy8nO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgaW52YWxpZEZvcm1hdChmb3JtYXQsIFwiSW52YWxpZCBjaGFyYWN0ZXIgJ1wiICsgaW52YWxpZENoYXIgKyBcIicgZm91bmQ6IGlzIGl0IGJhc2U2NCBlbmNvZGVkP1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcbiAgICBsZXQgYnl0ZXM7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGJ5dGVzID0gZGVjb2RlQmFzZTY0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgaW52YWxpZEZvcm1hdChmb3JtYXQsICdJbnZhbGlkIGNoYXJhY3RlciBmb3VuZCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlcy5sZW5ndGgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5W2ldID0gYnl0ZXMuY2hhckNvZGVBdChpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufVxyXG5jbGFzcyBEYXRhVVJMUGFydHMge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YVVSTCkge1xyXG4gICAgICAgIHRoaXMuYmFzZTY0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHlwZSA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRhdGFVUkwubWF0Y2goL15kYXRhOihbXixdKyk/LC8pO1xyXG4gICAgICAgIGlmIChtYXRjaGVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IGludmFsaWRGb3JtYXQoU3RyaW5nRm9ybWF0LkRBVEFfVVJMLCBcIk11c3QgYmUgZm9ybWF0dGVkICdkYXRhOls8bWVkaWF0eXBlPl1bO2Jhc2U2NF0sPGRhdGE+XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtaWRkbGUgPSBtYXRjaGVzWzFdIHx8IG51bGw7XHJcbiAgICAgICAgaWYgKG1pZGRsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFzZTY0ID0gZW5kc1dpdGgobWlkZGxlLCAnO2Jhc2U2NCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeXBlID0gdGhpcy5iYXNlNjRcclxuICAgICAgICAgICAgICAgID8gbWlkZGxlLnN1YnN0cmluZygwLCBtaWRkbGUubGVuZ3RoIC0gJztiYXNlNjQnLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIDogbWlkZGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc3QgPSBkYXRhVVJMLnN1YnN0cmluZyhkYXRhVVJMLmluZGV4T2YoJywnKSArIDEpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGRhdGFVUkxCeXRlc18oZGF0YVVybCkge1xyXG4gICAgY29uc3QgcGFydHMgPSBuZXcgRGF0YVVSTFBhcnRzKGRhdGFVcmwpO1xyXG4gICAgaWYgKHBhcnRzLmJhc2U2NCkge1xyXG4gICAgICAgIHJldHVybiBiYXNlNjRCeXRlc18oU3RyaW5nRm9ybWF0LkJBU0U2NCwgcGFydHMucmVzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGVyY2VudEVuY29kZWRCeXRlc18ocGFydHMucmVzdCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZGF0YVVSTENvbnRlbnRUeXBlXyhkYXRhVXJsKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IG5ldyBEYXRhVVJMUGFydHMoZGF0YVVybCk7XHJcbiAgICByZXR1cm4gcGFydHMuY29udGVudFR5cGU7XHJcbn1cclxuZnVuY3Rpb24gZW5kc1dpdGgocywgZW5kKSB7XHJcbiAgICBjb25zdCBsb25nRW5vdWdoID0gcy5sZW5ndGggPj0gZW5kLmxlbmd0aDtcclxuICAgIGlmICghbG9uZ0Vub3VnaCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzLnN1YnN0cmluZyhzLmxlbmd0aCAtIGVuZC5sZW5ndGgpID09PSBlbmQ7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEBwYXJhbSBvcHRfZWxpZGVDb3B5IC0gSWYgdHJ1ZSwgZG9lc24ndCBjb3B5IG11dGFibGUgaW5wdXQgZGF0YVxyXG4gKiAgICAgKGUuZy4gVWludDhBcnJheXMpLiBQYXNzIHRydWUgb25seSBpZiB5b3Uga25vdyB0aGUgb2JqZWN0cyB3aWxsIG5vdCBiZVxyXG4gKiAgICAgbW9kaWZpZWQgYWZ0ZXIgdGhpcyBibG9iJ3MgY29uc3RydWN0aW9uLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIEZic0Jsb2Ige1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSwgZWxpZGVDb3B5KSB7XHJcbiAgICAgICAgbGV0IHNpemUgPSAwO1xyXG4gICAgICAgIGxldCBibG9iVHlwZSA9ICcnO1xyXG4gICAgICAgIGlmIChpc05hdGl2ZUJsb2IoZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhXyA9IGRhdGE7XHJcbiAgICAgICAgICAgIHNpemUgPSBkYXRhLnNpemU7XHJcbiAgICAgICAgICAgIGJsb2JUeXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgaWYgKGVsaWRlQ29weSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhXyA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhXyA9IG5ldyBVaW50OEFycmF5KGRhdGEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFfLnNldChuZXcgVWludDhBcnJheShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2l6ZSA9IHRoaXMuZGF0YV8ubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICBpZiAoZWxpZGVDb3B5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFfID0gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YV8gPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFfLnNldChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaXplID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2l6ZV8gPSBzaXplO1xyXG4gICAgICAgIHRoaXMudHlwZV8gPSBibG9iVHlwZTtcclxuICAgIH1cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZV87XHJcbiAgICB9XHJcbiAgICB0eXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGVfO1xyXG4gICAgfVxyXG4gICAgc2xpY2Uoc3RhcnRCeXRlLCBlbmRCeXRlKSB7XHJcbiAgICAgICAgaWYgKGlzTmF0aXZlQmxvYih0aGlzLmRhdGFfKSkge1xyXG4gICAgICAgICAgICBjb25zdCByZWFsQmxvYiA9IHRoaXMuZGF0YV87XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZCA9IHNsaWNlQmxvYihyZWFsQmxvYiwgc3RhcnRCeXRlLCBlbmRCeXRlKTtcclxuICAgICAgICAgICAgaWYgKHNsaWNlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGYnNCbG9iKHNsaWNlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZSA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YV8uYnVmZmVyLCBzdGFydEJ5dGUsIGVuZEJ5dGUgLSBzdGFydEJ5dGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZic0Jsb2Ioc2xpY2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRCbG9iKC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoaXNOYXRpdmVCbG9iRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2JieSA9IGFyZ3MubWFwKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBGYnNCbG9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5kYXRhXztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZic0Jsb2IoZ2V0QmxvYi5hcHBseShudWxsLCBibG9iYnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVpbnQ4QXJyYXlzID0gYXJncy5tYXAoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUZyb21TdHJpbmcoU3RyaW5nRm9ybWF0LlJBVywgdmFsKS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmxvYnMgZG9uJ3QgZXhpc3QsIHNvIHRoaXMgaGFzIHRvIGJlIGEgVWludDhBcnJheS5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmRhdGFfO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IGZpbmFsTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdWludDhBcnJheXMuZm9yRWFjaCgoYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpbmFsTGVuZ3RoICs9IGFycmF5LmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBuZXcgVWludDhBcnJheShmaW5hbExlbmd0aCk7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHVpbnQ4QXJyYXlzLmZvckVhY2goKGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkW2luZGV4KytdID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZic0Jsb2IobWVyZ2VkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGxvYWREYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFfO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBPYmplY3QgcmVzdWx0aW5nIGZyb20gcGFyc2luZyB0aGUgZ2l2ZW4gSlNPTiwgb3IgbnVsbCBpZiB0aGVcclxuICogZ2l2ZW4gc3RyaW5nIGRvZXMgbm90IHJlcHJlc2VudCBhIEpTT04gb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24ganNvbk9iamVjdE9yTnVsbChzKSB7XHJcbiAgICBsZXQgb2JqO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBvYmogPSBKU09OLnBhcnNlKHMpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChpc05vbkFycmF5T2JqZWN0KG9iaikpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgQ29udGFpbnMgaGVscGVyIG1ldGhvZHMgZm9yIG1hbmlwdWxhdGluZyBwYXRocy5cclxuICovXHJcbi8qKlxyXG4gKiBAcmV0dXJuIE51bGwgaWYgdGhlIHBhdGggaXMgYWxyZWFkeSBhdCB0aGUgcm9vdC5cclxuICovXHJcbmZ1bmN0aW9uIHBhcmVudChwYXRoKSB7XHJcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1BhdGggPSBwYXRoLnNsaWNlKDAsIGluZGV4KTtcclxuICAgIHJldHVybiBuZXdQYXRoO1xyXG59XHJcbmZ1bmN0aW9uIGNoaWxkKHBhdGgsIGNoaWxkUGF0aCkge1xyXG4gICAgY29uc3QgY2Fub25pY2FsQ2hpbGRQYXRoID0gY2hpbGRQYXRoXHJcbiAgICAgICAgLnNwbGl0KCcvJylcclxuICAgICAgICAuZmlsdGVyKGNvbXBvbmVudCA9PiBjb21wb25lbnQubGVuZ3RoID4gMClcclxuICAgICAgICAuam9pbignLycpO1xyXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbm9uaWNhbENoaWxkUGF0aDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXRoICsgJy8nICsgY2Fub25pY2FsQ2hpbGRQYXRoO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBsYXN0IGNvbXBvbmVudCBvZiBhIHBhdGguXHJcbiAqICcvZm9vL2JhcicgLT4gJ2JhcidcclxuICogJy9mb28vYmFyL2Jhei8nIC0+ICdiYXovJ1xyXG4gKiAnL2EnIC0+ICdhJ1xyXG4gKi9cclxuZnVuY3Rpb24gbGFzdENvbXBvbmVudChwYXRoKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoJy8nLCBwYXRoLmxlbmd0aCAtIDIpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguc2xpY2UoaW5kZXggKyAxKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBub1hmb3JtXyhtZXRhZGF0YSwgdmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5jbGFzcyBNYXBwaW5nIHtcclxuICAgIGNvbnN0cnVjdG9yKHNlcnZlciwgbG9jYWwsIHdyaXRhYmxlLCB4Zm9ybSkge1xyXG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xyXG4gICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbCB8fCBzZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy53cml0YWJsZSA9ICEhd3JpdGFibGU7XHJcbiAgICAgICAgdGhpcy54Zm9ybSA9IHhmb3JtIHx8IG5vWGZvcm1fO1xyXG4gICAgfVxyXG59XHJcbmxldCBtYXBwaW5nc18gPSBudWxsO1xyXG5mdW5jdGlvbiB4Zm9ybVBhdGgoZnVsbFBhdGgpIHtcclxuICAgIGlmICghaXNTdHJpbmcoZnVsbFBhdGgpIHx8IGZ1bGxQYXRoLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICByZXR1cm4gZnVsbFBhdGg7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbGFzdENvbXBvbmVudChmdWxsUGF0aCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0TWFwcGluZ3MoKSB7XHJcbiAgICBpZiAobWFwcGluZ3NfKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hcHBpbmdzXztcclxuICAgIH1cclxuICAgIGNvbnN0IG1hcHBpbmdzID0gW107XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCdidWNrZXQnKSk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCdnZW5lcmF0aW9uJykpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnbWV0YWdlbmVyYXRpb24nKSk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCduYW1lJywgJ2Z1bGxQYXRoJywgdHJ1ZSkpO1xyXG4gICAgZnVuY3Rpb24gbWFwcGluZ3NYZm9ybVBhdGgoX21ldGFkYXRhLCBmdWxsUGF0aCkge1xyXG4gICAgICAgIHJldHVybiB4Zm9ybVBhdGgoZnVsbFBhdGgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbmFtZU1hcHBpbmcgPSBuZXcgTWFwcGluZygnbmFtZScpO1xyXG4gICAgbmFtZU1hcHBpbmcueGZvcm0gPSBtYXBwaW5nc1hmb3JtUGF0aDtcclxuICAgIG1hcHBpbmdzLnB1c2gobmFtZU1hcHBpbmcpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2VyY2VzIHRoZSBzZWNvbmQgcGFyYW0gdG8gYSBudW1iZXIsIGlmIGl0IGlzIGRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHhmb3JtU2l6ZShfbWV0YWRhdGEsIHNpemUpIHtcclxuICAgICAgICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoc2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaXplTWFwcGluZyA9IG5ldyBNYXBwaW5nKCdzaXplJyk7XHJcbiAgICBzaXplTWFwcGluZy54Zm9ybSA9IHhmb3JtU2l6ZTtcclxuICAgIG1hcHBpbmdzLnB1c2goc2l6ZU1hcHBpbmcpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygndGltZUNyZWF0ZWQnKSk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCd1cGRhdGVkJykpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnbWQ1SGFzaCcsIG51bGwsIHRydWUpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2NhY2hlQ29udHJvbCcsIG51bGwsIHRydWUpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2NvbnRlbnREaXNwb3NpdGlvbicsIG51bGwsIHRydWUpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2NvbnRlbnRFbmNvZGluZycsIG51bGwsIHRydWUpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2NvbnRlbnRMYW5ndWFnZScsIG51bGwsIHRydWUpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2NvbnRlbnRUeXBlJywgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnbWV0YWRhdGEnLCAnY3VzdG9tTWV0YWRhdGEnLCB0cnVlKSk7XHJcbiAgICBtYXBwaW5nc18gPSBtYXBwaW5ncztcclxuICAgIHJldHVybiBtYXBwaW5nc187XHJcbn1cclxuZnVuY3Rpb24gYWRkUmVmKG1ldGFkYXRhLCBzZXJ2aWNlKSB7XHJcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVJlZigpIHtcclxuICAgICAgICBjb25zdCBidWNrZXQgPSBtZXRhZGF0YVsnYnVja2V0J107XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IG1ldGFkYXRhWydmdWxsUGF0aCddO1xyXG4gICAgICAgIGNvbnN0IGxvYyA9IG5ldyBMb2NhdGlvbihidWNrZXQsIHBhdGgpO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlLl9tYWtlU3RvcmFnZVJlZmVyZW5jZShsb2MpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1ldGFkYXRhLCAncmVmJywgeyBnZXQ6IGdlbmVyYXRlUmVmIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGZyb21SZXNvdXJjZShzZXJ2aWNlLCByZXNvdXJjZSwgbWFwcGluZ3MpIHtcclxuICAgIGNvbnN0IG1ldGFkYXRhID0ge307XHJcbiAgICBtZXRhZGF0YVsndHlwZSddID0gJ2ZpbGUnO1xyXG4gICAgY29uc3QgbGVuID0gbWFwcGluZ3MubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1tpXTtcclxuICAgICAgICBtZXRhZGF0YVttYXBwaW5nLmxvY2FsXSA9IG1hcHBpbmcueGZvcm0obWV0YWRhdGEsIHJlc291cmNlW21hcHBpbmcuc2VydmVyXSk7XHJcbiAgICB9XHJcbiAgICBhZGRSZWYobWV0YWRhdGEsIHNlcnZpY2UpO1xyXG4gICAgcmV0dXJuIG1ldGFkYXRhO1xyXG59XHJcbmZ1bmN0aW9uIGZyb21SZXNvdXJjZVN0cmluZyhzZXJ2aWNlLCByZXNvdXJjZVN0cmluZywgbWFwcGluZ3MpIHtcclxuICAgIGNvbnN0IG9iaiA9IGpzb25PYmplY3RPck51bGwocmVzb3VyY2VTdHJpbmcpO1xyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzb3VyY2UgPSBvYmo7XHJcbiAgICByZXR1cm4gZnJvbVJlc291cmNlKHNlcnZpY2UsIHJlc291cmNlLCBtYXBwaW5ncyk7XHJcbn1cclxuZnVuY3Rpb24gZG93bmxvYWRVcmxGcm9tUmVzb3VyY2VTdHJpbmcobWV0YWRhdGEsIHJlc291cmNlU3RyaW5nLCBob3N0LCBwcm90b2NvbCkge1xyXG4gICAgY29uc3Qgb2JqID0ganNvbk9iamVjdE9yTnVsbChyZXNvdXJjZVN0cmluZyk7XHJcbiAgICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzU3RyaW5nKG9ialsnZG93bmxvYWRUb2tlbnMnXSkpIHtcclxuICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgb2JqZWN0cyBhcmUgdXBsb2FkZWQgdGhyb3VnaCBHQ1MgYW5kIHJldHJpZXZlZFxyXG4gICAgICAgIC8vIHRocm91Z2ggbGlzdCwgc28gd2UgZG9uJ3Qgd2FudCB0byB0aHJvdyBhbiBFcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRva2VucyA9IG9ialsnZG93bmxvYWRUb2tlbnMnXTtcclxuICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbmNvZGUgPSBlbmNvZGVVUklDb21wb25lbnQ7XHJcbiAgICBjb25zdCB0b2tlbnNMaXN0ID0gdG9rZW5zLnNwbGl0KCcsJyk7XHJcbiAgICBjb25zdCB1cmxzID0gdG9rZW5zTGlzdC5tYXAoKHRva2VuKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnVja2V0ID0gbWV0YWRhdGFbJ2J1Y2tldCddO1xyXG4gICAgICAgIGNvbnN0IHBhdGggPSBtZXRhZGF0YVsnZnVsbFBhdGgnXTtcclxuICAgICAgICBjb25zdCB1cmxQYXJ0ID0gJy9iLycgKyBlbmNvZGUoYnVja2V0KSArICcvby8nICsgZW5jb2RlKHBhdGgpO1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSBtYWtlVXJsKHVybFBhcnQsIGhvc3QsIHByb3RvY29sKTtcclxuICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IG1ha2VRdWVyeVN0cmluZyh7XHJcbiAgICAgICAgICAgIGFsdDogJ21lZGlhJyxcclxuICAgICAgICAgICAgdG9rZW5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYmFzZSArIHF1ZXJ5U3RyaW5nO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdXJsc1swXTtcclxufVxyXG5mdW5jdGlvbiB0b1Jlc291cmNlU3RyaW5nKG1ldGFkYXRhLCBtYXBwaW5ncykge1xyXG4gICAgY29uc3QgcmVzb3VyY2UgPSB7fTtcclxuICAgIGNvbnN0IGxlbiA9IG1hcHBpbmdzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbaV07XHJcbiAgICAgICAgaWYgKG1hcHBpbmcud3JpdGFibGUpIHtcclxuICAgICAgICAgICAgcmVzb3VyY2VbbWFwcGluZy5zZXJ2ZXJdID0gbWV0YWRhdGFbbWFwcGluZy5sb2NhbF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc291cmNlKTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jb25zdCBQUkVGSVhFU19LRVkgPSAncHJlZml4ZXMnO1xyXG5jb25zdCBJVEVNU19LRVkgPSAnaXRlbXMnO1xyXG5mdW5jdGlvbiBmcm9tQmFja2VuZFJlc3BvbnNlKHNlcnZpY2UsIGJ1Y2tldCwgcmVzb3VyY2UpIHtcclxuICAgIGNvbnN0IGxpc3RSZXN1bHQgPSB7XHJcbiAgICAgICAgcHJlZml4ZXM6IFtdLFxyXG4gICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICBuZXh0UGFnZVRva2VuOiByZXNvdXJjZVsnbmV4dFBhZ2VUb2tlbiddXHJcbiAgICB9O1xyXG4gICAgaWYgKHJlc291cmNlW1BSRUZJWEVTX0tFWV0pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHBhdGggb2YgcmVzb3VyY2VbUFJFRklYRVNfS0VZXSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXRoV2l0aG91dFRyYWlsaW5nU2xhc2ggPSBwYXRoLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHNlcnZpY2UuX21ha2VTdG9yYWdlUmVmZXJlbmNlKG5ldyBMb2NhdGlvbihidWNrZXQsIHBhdGhXaXRob3V0VHJhaWxpbmdTbGFzaCkpO1xyXG4gICAgICAgICAgICBsaXN0UmVzdWx0LnByZWZpeGVzLnB1c2gocmVmZXJlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocmVzb3VyY2VbSVRFTVNfS0VZXSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZXNvdXJjZVtJVEVNU19LRVldKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHNlcnZpY2UuX21ha2VTdG9yYWdlUmVmZXJlbmNlKG5ldyBMb2NhdGlvbihidWNrZXQsIGl0ZW1bJ25hbWUnXSkpO1xyXG4gICAgICAgICAgICBsaXN0UmVzdWx0Lml0ZW1zLnB1c2gocmVmZXJlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdFJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBmcm9tUmVzcG9uc2VTdHJpbmcoc2VydmljZSwgYnVja2V0LCByZXNvdXJjZVN0cmluZykge1xyXG4gICAgY29uc3Qgb2JqID0ganNvbk9iamVjdE9yTnVsbChyZXNvdXJjZVN0cmluZyk7XHJcbiAgICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNvdXJjZSA9IG9iajtcclxuICAgIHJldHVybiBmcm9tQmFja2VuZFJlc3BvbnNlKHNlcnZpY2UsIGJ1Y2tldCwgcmVzb3VyY2UpO1xyXG59XG5cbmNsYXNzIFJlcXVlc3RJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKHVybCwgbWV0aG9kLCBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgd2l0aCB3aGljaCB0byByZXNvbHZlIHRoZSByZXF1ZXN0J3MgcHJvbWlzZS4gT25seSBjYWxsZWRcclxuICAgICAqIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWwuIFRocm93IGZyb20gdGhpcyBmdW5jdGlvbiB0byByZWplY3QgdGhlXHJcbiAgICAgKiByZXR1cm5lZCBSZXF1ZXN0J3MgcHJvbWlzZSB3aXRoIHRoZSB0aHJvd24gZXJyb3IuXHJcbiAgICAgKiBOb3RlOiBUaGUgWGhySW8gcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24gbWF5IGJlIHJldXNlZCBhZnRlciB0aGlzIGNhbGxiYWNrXHJcbiAgICAgKiByZXR1cm5zLiBEbyBub3Qga2VlcCBhIHJlZmVyZW5jZSB0byBpdCBpbiBhbnkgd2F5LlxyXG4gICAgICovXHJcbiAgICBoYW5kbGVyLCB0aW1lb3V0KSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMudXJsUGFyYW1zID0ge307XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGJ5dGVzIHVwbG9hZGVkIGFuZCB0b3RhbCBzaXplICgtMSBpZiBub3RcclxuICAgICAgICAgKiBjb21wdXRhYmxlKSBvZiB0aGUgcmVxdWVzdCBib2R5IChpLmUuIHVzZWQgdG8gcmVwb3J0IHVwbG9hZCBwcm9ncmVzcykuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDb2RlcyA9IFsyMDBdO1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbFJldHJ5Q29kZXMgPSBbXTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogVGhyb3dzIHRoZSBVTktOT1dOIFN0b3JhZ2VFcnJvciBpZiBjbmRuIGlzIGZhbHNlLlxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlckNoZWNrKGNuZG4pIHtcclxuICAgIGlmICghY25kbikge1xyXG4gICAgICAgIHRocm93IHVua25vd24oKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBtZXRhZGF0YUhhbmRsZXIoc2VydmljZSwgbWFwcGluZ3MpIHtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoeGhyLCB0ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBmcm9tUmVzb3VyY2VTdHJpbmcoc2VydmljZSwgdGV4dCwgbWFwcGluZ3MpO1xyXG4gICAgICAgIGhhbmRsZXJDaGVjayhtZXRhZGF0YSAhPT0gbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGFkYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhbmRsZXI7XHJcbn1cclxuZnVuY3Rpb24gbGlzdEhhbmRsZXIoc2VydmljZSwgYnVja2V0KSB7XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVyKHhociwgdGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RSZXN1bHQgPSBmcm9tUmVzcG9uc2VTdHJpbmcoc2VydmljZSwgYnVja2V0LCB0ZXh0KTtcclxuICAgICAgICBoYW5kbGVyQ2hlY2sobGlzdFJlc3VsdCAhPT0gbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RSZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFuZGxlcjtcclxufVxyXG5mdW5jdGlvbiBkb3dubG9hZFVybEhhbmRsZXIoc2VydmljZSwgbWFwcGluZ3MpIHtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoeGhyLCB0ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBmcm9tUmVzb3VyY2VTdHJpbmcoc2VydmljZSwgdGV4dCwgbWFwcGluZ3MpO1xyXG4gICAgICAgIGhhbmRsZXJDaGVjayhtZXRhZGF0YSAhPT0gbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIGRvd25sb2FkVXJsRnJvbVJlc291cmNlU3RyaW5nKG1ldGFkYXRhLCB0ZXh0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoYW5kbGVyO1xyXG59XHJcbmZ1bmN0aW9uIHNoYXJlZEVycm9ySGFuZGxlcihsb2NhdGlvbikge1xyXG4gICAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKHhociwgZXJyKSB7XHJcbiAgICAgICAgbGV0IG5ld0VycjtcclxuICAgICAgICBpZiAoeGhyLmdldFN0YXR1cygpID09PSA0MDEpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAvLyBUaGlzIGV4YWN0IG1lc3NhZ2Ugc3RyaW5nIGlzIHRoZSBvbmx5IGNvbnNpc3RlbnQgcGFydCBvZiB0aGVcclxuICAgICAgICAgICAgLy8gc2VydmVyJ3MgZXJyb3IgcmVzcG9uc2UgdGhhdCBpZGVudGlmaWVzIGl0IGFzIGFuIEFwcCBDaGVjayBlcnJvci5cclxuICAgICAgICAgICAgeGhyLmdldFJlc3BvbnNlVGV4dCgpLmluY2x1ZGVzKCdGaXJlYmFzZSBBcHAgQ2hlY2sgdG9rZW4gaXMgaW52YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdFcnIgPSB1bmF1dGhvcml6ZWRBcHAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld0VyciA9IHVuYXV0aGVudGljYXRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoeGhyLmdldFN0YXR1cygpID09PSA0MDIpIHtcclxuICAgICAgICAgICAgICAgIG5ld0VyciA9IHF1b3RhRXhjZWVkZWQobG9jYXRpb24uYnVja2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuZ2V0U3RhdHVzKCkgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0VyciA9IHVuYXV0aG9yaXplZChsb2NhdGlvbi5wYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0VyciA9IGVycjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdFcnIuc2VydmVyUmVzcG9uc2UgPSBlcnIuc2VydmVyUmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ld0VycjtcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvckhhbmRsZXI7XHJcbn1cclxuZnVuY3Rpb24gb2JqZWN0RXJyb3JIYW5kbGVyKGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCBzaGFyZWQgPSBzaGFyZWRFcnJvckhhbmRsZXIobG9jYXRpb24pO1xyXG4gICAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKHhociwgZXJyKSB7XHJcbiAgICAgICAgbGV0IG5ld0VyciA9IHNoYXJlZCh4aHIsIGVycik7XHJcbiAgICAgICAgaWYgKHhoci5nZXRTdGF0dXMoKSA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIG5ld0VyciA9IG9iamVjdE5vdEZvdW5kKGxvY2F0aW9uLnBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdFcnIuc2VydmVyUmVzcG9uc2UgPSBlcnIuc2VydmVyUmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIG5ld0VycjtcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvckhhbmRsZXI7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TWV0YWRhdGEkMihzZXJ2aWNlLCBsb2NhdGlvbiwgbWFwcGluZ3MpIHtcclxuICAgIGNvbnN0IHVybFBhcnQgPSBsb2NhdGlvbi5mdWxsU2VydmVyVXJsKCk7XHJcbiAgICBjb25zdCB1cmwgPSBtYWtlVXJsKHVybFBhcnQsIHNlcnZpY2UuaG9zdCwgc2VydmljZS5fcHJvdG9jb2wpO1xyXG4gICAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XHJcbiAgICBjb25zdCB0aW1lb3V0ID0gc2VydmljZS5tYXhPcGVyYXRpb25SZXRyeVRpbWU7XHJcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyh1cmwsIG1ldGhvZCwgbWV0YWRhdGFIYW5kbGVyKHNlcnZpY2UsIG1hcHBpbmdzKSwgdGltZW91dCk7XHJcbiAgICByZXF1ZXN0SW5mby5lcnJvckhhbmRsZXIgPSBvYmplY3RFcnJvckhhbmRsZXIobG9jYXRpb24pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG59XHJcbmZ1bmN0aW9uIGxpc3QkMihzZXJ2aWNlLCBsb2NhdGlvbiwgZGVsaW1pdGVyLCBwYWdlVG9rZW4sIG1heFJlc3VsdHMpIHtcclxuICAgIGNvbnN0IHVybFBhcmFtcyA9IHt9O1xyXG4gICAgaWYgKGxvY2F0aW9uLmlzUm9vdCkge1xyXG4gICAgICAgIHVybFBhcmFtc1sncHJlZml4J10gPSAnJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVybFBhcmFtc1sncHJlZml4J10gPSBsb2NhdGlvbi5wYXRoICsgJy8nO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlbGltaXRlciAmJiBkZWxpbWl0ZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHVybFBhcmFtc1snZGVsaW1pdGVyJ10gPSBkZWxpbWl0ZXI7XHJcbiAgICB9XHJcbiAgICBpZiAocGFnZVRva2VuKSB7XHJcbiAgICAgICAgdXJsUGFyYW1zWydwYWdlVG9rZW4nXSA9IHBhZ2VUb2tlbjtcclxuICAgIH1cclxuICAgIGlmIChtYXhSZXN1bHRzKSB7XHJcbiAgICAgICAgdXJsUGFyYW1zWydtYXhSZXN1bHRzJ10gPSBtYXhSZXN1bHRzO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXJsUGFydCA9IGxvY2F0aW9uLmJ1Y2tldE9ubHlTZXJ2ZXJVcmwoKTtcclxuICAgIGNvbnN0IHVybCA9IG1ha2VVcmwodXJsUGFydCwgc2VydmljZS5ob3N0LCBzZXJ2aWNlLl9wcm90b2NvbCk7XHJcbiAgICBjb25zdCBtZXRob2QgPSAnR0VUJztcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heE9wZXJhdGlvblJldHJ5VGltZTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gbmV3IFJlcXVlc3RJbmZvKHVybCwgbWV0aG9kLCBsaXN0SGFuZGxlcihzZXJ2aWNlLCBsb2NhdGlvbi5idWNrZXQpLCB0aW1lb3V0KTtcclxuICAgIHJlcXVlc3RJbmZvLnVybFBhcmFtcyA9IHVybFBhcmFtcztcclxuICAgIHJlcXVlc3RJbmZvLmVycm9ySGFuZGxlciA9IHNoYXJlZEVycm9ySGFuZGxlcihsb2NhdGlvbik7XHJcbiAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbn1cclxuZnVuY3Rpb24gZ2V0RG93bmxvYWRVcmwoc2VydmljZSwgbG9jYXRpb24sIG1hcHBpbmdzKSB7XHJcbiAgICBjb25zdCB1cmxQYXJ0ID0gbG9jYXRpb24uZnVsbFNlcnZlclVybCgpO1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4T3BlcmF0aW9uUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGRvd25sb2FkVXJsSGFuZGxlcihzZXJ2aWNlLCBtYXBwaW5ncyksIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gb2JqZWN0RXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSQyKHNlcnZpY2UsIGxvY2F0aW9uLCBtZXRhZGF0YSwgbWFwcGluZ3MpIHtcclxuICAgIGNvbnN0IHVybFBhcnQgPSBsb2NhdGlvbi5mdWxsU2VydmVyVXJsKCk7XHJcbiAgICBjb25zdCB1cmwgPSBtYWtlVXJsKHVybFBhcnQsIHNlcnZpY2UuaG9zdCwgc2VydmljZS5fcHJvdG9jb2wpO1xyXG4gICAgY29uc3QgbWV0aG9kID0gJ1BBVENIJztcclxuICAgIGNvbnN0IGJvZHkgPSB0b1Jlc291cmNlU3RyaW5nKG1ldGFkYXRhLCBtYXBwaW5ncyk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnIH07XHJcbiAgICBjb25zdCB0aW1lb3V0ID0gc2VydmljZS5tYXhPcGVyYXRpb25SZXRyeVRpbWU7XHJcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyh1cmwsIG1ldGhvZCwgbWV0YWRhdGFIYW5kbGVyKHNlcnZpY2UsIG1hcHBpbmdzKSwgdGltZW91dCk7XHJcbiAgICByZXF1ZXN0SW5mby5oZWFkZXJzID0gaGVhZGVycztcclxuICAgIHJlcXVlc3RJbmZvLmJvZHkgPSBib2R5O1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gb2JqZWN0RXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG5mdW5jdGlvbiBkZWxldGVPYmplY3QkMihzZXJ2aWNlLCBsb2NhdGlvbikge1xyXG4gICAgY29uc3QgdXJsUGFydCA9IGxvY2F0aW9uLmZ1bGxTZXJ2ZXJVcmwoKTtcclxuICAgIGNvbnN0IHVybCA9IG1ha2VVcmwodXJsUGFydCwgc2VydmljZS5ob3N0LCBzZXJ2aWNlLl9wcm90b2NvbCk7XHJcbiAgICBjb25zdCBtZXRob2QgPSAnREVMRVRFJztcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heE9wZXJhdGlvblJldHJ5VGltZTtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoX3hociwgX3RleHQpIHsgfVxyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uc3VjY2Vzc0NvZGVzID0gWzIwMCwgMjA0XTtcclxuICAgIHJlcXVlc3RJbmZvLmVycm9ySGFuZGxlciA9IG9iamVjdEVycm9ySGFuZGxlcihsb2NhdGlvbik7XHJcbiAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbn1cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQ29udGVudFR5cGVfKG1ldGFkYXRhLCBibG9iKSB7XHJcbiAgICByZXR1cm4gKChtZXRhZGF0YSAmJiBtZXRhZGF0YVsnY29udGVudFR5cGUnXSkgfHxcclxuICAgICAgICAoYmxvYiAmJiBibG9iLnR5cGUoKSkgfHxcclxuICAgICAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyk7XHJcbn1cclxuZnVuY3Rpb24gbWV0YWRhdGFGb3JVcGxvYWRfKGxvY2F0aW9uLCBibG9iLCBtZXRhZGF0YSkge1xyXG4gICAgY29uc3QgbWV0YWRhdGFDbG9uZSA9IE9iamVjdC5hc3NpZ24oe30sIG1ldGFkYXRhKTtcclxuICAgIG1ldGFkYXRhQ2xvbmVbJ2Z1bGxQYXRoJ10gPSBsb2NhdGlvbi5wYXRoO1xyXG4gICAgbWV0YWRhdGFDbG9uZVsnc2l6ZSddID0gYmxvYi5zaXplKCk7XHJcbiAgICBpZiAoIW1ldGFkYXRhQ2xvbmVbJ2NvbnRlbnRUeXBlJ10pIHtcclxuICAgICAgICBtZXRhZGF0YUNsb25lWydjb250ZW50VHlwZSddID0gZGV0ZXJtaW5lQ29udGVudFR5cGVfKG51bGwsIGJsb2IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFkYXRhQ2xvbmU7XHJcbn1cclxuLyoqXHJcbiAqIFByZXBhcmUgUmVxdWVzdEluZm8gZm9yIHVwbG9hZHMgYXMgQ29udGVudC1UeXBlOiBtdWx0aXBhcnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBtdWx0aXBhcnRVcGxvYWQoc2VydmljZSwgbG9jYXRpb24sIG1hcHBpbmdzLCBibG9iLCBtZXRhZGF0YSkge1xyXG4gICAgY29uc3QgdXJsUGFydCA9IGxvY2F0aW9uLmJ1Y2tldE9ubHlTZXJ2ZXJVcmwoKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtUHJvdG9jb2wnOiAnbXVsdGlwYXJ0J1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGdlbkJvdW5kYXJ5KCkge1xyXG4gICAgICAgIGxldCBzdHIgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBib3VuZGFyeSA9IGdlbkJvdW5kYXJ5KCk7XHJcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9JyArIGJvdW5kYXJ5O1xyXG4gICAgY29uc3QgbWV0YWRhdGFfID0gbWV0YWRhdGFGb3JVcGxvYWRfKGxvY2F0aW9uLCBibG9iLCBtZXRhZGF0YSk7XHJcbiAgICBjb25zdCBtZXRhZGF0YVN0cmluZyA9IHRvUmVzb3VyY2VTdHJpbmcobWV0YWRhdGFfLCBtYXBwaW5ncyk7XHJcbiAgICBjb25zdCBwcmVCbG9iUGFydCA9ICctLScgK1xyXG4gICAgICAgIGJvdW5kYXJ5ICtcclxuICAgICAgICAnXFxyXFxuJyArXHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFxcclxcblxcclxcbicgK1xyXG4gICAgICAgIG1ldGFkYXRhU3RyaW5nICtcclxuICAgICAgICAnXFxyXFxuLS0nICtcclxuICAgICAgICBib3VuZGFyeSArXHJcbiAgICAgICAgJ1xcclxcbicgK1xyXG4gICAgICAgICdDb250ZW50LVR5cGU6ICcgK1xyXG4gICAgICAgIG1ldGFkYXRhX1snY29udGVudFR5cGUnXSArXHJcbiAgICAgICAgJ1xcclxcblxcclxcbic7XHJcbiAgICBjb25zdCBwb3N0QmxvYlBhcnQgPSAnXFxyXFxuLS0nICsgYm91bmRhcnkgKyAnLS0nO1xyXG4gICAgY29uc3QgYm9keSA9IEZic0Jsb2IuZ2V0QmxvYihwcmVCbG9iUGFydCwgYmxvYiwgcG9zdEJsb2JQYXJ0KTtcclxuICAgIGlmIChib2R5ID09PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgY2Fubm90U2xpY2VCbG9iKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSB7IG5hbWU6IG1ldGFkYXRhX1snZnVsbFBhdGgnXSB9O1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heFVwbG9hZFJldHJ5VGltZTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gbmV3IFJlcXVlc3RJbmZvKHVybCwgbWV0aG9kLCBtZXRhZGF0YUhhbmRsZXIoc2VydmljZSwgbWFwcGluZ3MpLCB0aW1lb3V0KTtcclxuICAgIHJlcXVlc3RJbmZvLnVybFBhcmFtcyA9IHVybFBhcmFtcztcclxuICAgIHJlcXVlc3RJbmZvLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gICAgcmVxdWVzdEluZm8uYm9keSA9IGJvZHkudXBsb2FkRGF0YSgpO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gc2hhcmVkRXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG4vKipcclxuICogQHBhcmFtIGN1cnJlbnQgVGhlIG51bWJlciBvZiBieXRlcyB0aGF0IGhhdmUgYmVlbiB1cGxvYWRlZCBzbyBmYXIuXHJcbiAqIEBwYXJhbSB0b3RhbCBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIGluIHRoZSB1cGxvYWQuXHJcbiAqIEBwYXJhbSBvcHRfZmluYWxpemVkIFRydWUgaWYgdGhlIHNlcnZlciBoYXMgZmluaXNoZWQgdGhlIHVwbG9hZC5cclxuICogQHBhcmFtIG9wdF9tZXRhZGF0YSBUaGUgdXBsb2FkIG1ldGFkYXRhLCBzaG91bGRcclxuICogICAgIG9ubHkgYmUgcGFzc2VkIGlmIG9wdF9maW5hbGl6ZWQgaXMgdHJ1ZS5cclxuICovXHJcbmNsYXNzIFJlc3VtYWJsZVVwbG9hZFN0YXR1cyB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdXJyZW50LCB0b3RhbCwgZmluYWxpemVkLCBtZXRhZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgdGhpcy50b3RhbCA9IHRvdGFsO1xyXG4gICAgICAgIHRoaXMuZmluYWxpemVkID0gISFmaW5hbGl6ZWQ7XHJcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IG1ldGFkYXRhIHx8IG51bGw7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY2hlY2tSZXN1bWVIZWFkZXJfKHhociwgYWxsb3dlZCkge1xyXG4gICAgbGV0IHN0YXR1cyA9IG51bGw7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHN0YXR1cyA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1Hb29nLVVwbG9hZC1TdGF0dXMnKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaGFuZGxlckNoZWNrKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGFsbG93ZWRTdGF0dXMgPSBhbGxvd2VkIHx8IFsnYWN0aXZlJ107XHJcbiAgICBoYW5kbGVyQ2hlY2soISFzdGF0dXMgJiYgYWxsb3dlZFN0YXR1cy5pbmRleE9mKHN0YXR1cykgIT09IC0xKTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlUmVzdW1hYmxlVXBsb2FkKHNlcnZpY2UsIGxvY2F0aW9uLCBtYXBwaW5ncywgYmxvYiwgbWV0YWRhdGEpIHtcclxuICAgIGNvbnN0IHVybFBhcnQgPSBsb2NhdGlvbi5idWNrZXRPbmx5U2VydmVyVXJsKCk7XHJcbiAgICBjb25zdCBtZXRhZGF0YUZvclVwbG9hZCA9IG1ldGFkYXRhRm9yVXBsb2FkXyhsb2NhdGlvbiwgYmxvYiwgbWV0YWRhdGEpO1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0geyBuYW1lOiBtZXRhZGF0YUZvclVwbG9hZFsnZnVsbFBhdGgnXSB9O1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtUHJvdG9jb2wnOiAncmVzdW1hYmxlJyxcclxuICAgICAgICAnWC1Hb29nLVVwbG9hZC1Db21tYW5kJzogJ3N0YXJ0JyxcclxuICAgICAgICAnWC1Hb29nLVVwbG9hZC1IZWFkZXItQ29udGVudC1MZW5ndGgnOiBgJHtibG9iLnNpemUoKX1gLFxyXG4gICAgICAgICdYLUdvb2ctVXBsb2FkLUhlYWRlci1Db250ZW50LVR5cGUnOiBtZXRhZGF0YUZvclVwbG9hZFsnY29udGVudFR5cGUnXSxcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYm9keSA9IHRvUmVzb3VyY2VTdHJpbmcobWV0YWRhdGFGb3JVcGxvYWQsIG1hcHBpbmdzKTtcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heFVwbG9hZFJldHJ5VGltZTtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoeGhyKSB7XHJcbiAgICAgICAgY2hlY2tSZXN1bWVIZWFkZXJfKHhocik7XHJcbiAgICAgICAgbGV0IHVybDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB1cmwgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtR29vZy1VcGxvYWQtVVJMJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJDaGVjayhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhhbmRsZXJDaGVjayhpc1N0cmluZyh1cmwpKTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8udXJsUGFyYW1zID0gdXJsUGFyYW1zO1xyXG4gICAgcmVxdWVzdEluZm8uaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICByZXF1ZXN0SW5mby5ib2R5ID0gYm9keTtcclxuICAgIHJlcXVlc3RJbmZvLmVycm9ySGFuZGxlciA9IHNoYXJlZEVycm9ySGFuZGxlcihsb2NhdGlvbik7XHJcbiAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbn1cclxuLyoqXHJcbiAqIEBwYXJhbSB1cmwgRnJvbSBhIGNhbGwgdG8gZmJzLnJlcXVlc3RzLmNyZWF0ZVJlc3VtYWJsZVVwbG9hZC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFJlc3VtYWJsZVVwbG9hZFN0YXR1cyhzZXJ2aWNlLCBsb2NhdGlvbiwgdXJsLCBibG9iKSB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0geyAnWC1Hb29nLVVwbG9hZC1Db21tYW5kJzogJ3F1ZXJ5JyB9O1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlcih4aHIpIHtcclxuICAgICAgICBjb25zdCBzdGF0dXMgPSBjaGVja1Jlc3VtZUhlYWRlcl8oeGhyLCBbJ2FjdGl2ZScsICdmaW5hbCddKTtcclxuICAgICAgICBsZXQgc2l6ZVN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2l6ZVN0cmluZyA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1Hb29nLVVwbG9hZC1TaXplLVJlY2VpdmVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJDaGVjayhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2l6ZVN0cmluZykge1xyXG4gICAgICAgICAgICAvLyBudWxsIG9yIGVtcHR5IHN0cmluZ1xyXG4gICAgICAgICAgICBoYW5kbGVyQ2hlY2soZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaXplID0gTnVtYmVyKHNpemVTdHJpbmcpO1xyXG4gICAgICAgIGhhbmRsZXJDaGVjayghaXNOYU4oc2l6ZSkpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKHNpemUsIGJsb2Iuc2l6ZSgpLCBzdGF0dXMgPT09ICdmaW5hbCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4VXBsb2FkUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICByZXF1ZXN0SW5mby5lcnJvckhhbmRsZXIgPSBzaGFyZWRFcnJvckhhbmRsZXIobG9jYXRpb24pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG59XHJcbi8qKlxyXG4gKiBBbnkgdXBsb2FkcyB2aWEgdGhlIHJlc3VtYWJsZSB1cGxvYWQgQVBJIG11c3QgdHJhbnNmZXIgYSBudW1iZXIgb2YgYnl0ZXNcclxuICogdGhhdCBpcyBhIG11bHRpcGxlIG9mIHRoaXMgbnVtYmVyLlxyXG4gKi9cclxuY29uc3QgUkVTVU1BQkxFX1VQTE9BRF9DSFVOS19TSVpFID0gMjU2ICogMTAyNDtcclxuLyoqXHJcbiAqIEBwYXJhbSB1cmwgRnJvbSBhIGNhbGwgdG8gZmJzLnJlcXVlc3RzLmNyZWF0ZVJlc3VtYWJsZVVwbG9hZC5cclxuICogQHBhcmFtIGNodW5rU2l6ZSBOdW1iZXIgb2YgYnl0ZXMgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gc3RhdHVzIFRoZSBwcmV2aW91cyBzdGF0dXMuXHJcbiAqICAgICBJZiBub3QgcGFzc2VkIG9yIG51bGwsIHdlIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZy5cclxuICogQHRocm93cyBmYnMuRXJyb3IgSWYgdGhlIHVwbG9hZCBpcyBhbHJlYWR5IGNvbXBsZXRlLCB0aGUgcGFzc2VkIGluIHN0YXR1c1xyXG4gKiAgICAgaGFzIGEgZmluYWwgc2l6ZSBpbmNvbnNpc3RlbnQgd2l0aCB0aGUgYmxvYiwgb3IgdGhlIGJsb2IgY2Fubm90IGJlIHNsaWNlZFxyXG4gKiAgICAgZm9yIHVwbG9hZC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRpbnVlUmVzdW1hYmxlVXBsb2FkKGxvY2F0aW9uLCBzZXJ2aWNlLCB1cmwsIGJsb2IsIGNodW5rU2l6ZSwgbWFwcGluZ3MsIHN0YXR1cywgcHJvZ3Jlc3NDYWxsYmFjaykge1xyXG4gICAgLy8gVE9ETyhhbmR5c290byk6IHN0YW5kYXJkaXplIG9uIGludGVybmFsIGFzc2VydHNcclxuICAgIC8vIGFzc2VydCghKG9wdF9zdGF0dXMgJiYgb3B0X3N0YXR1cy5maW5hbGl6ZWQpKTtcclxuICAgIGNvbnN0IHN0YXR1c18gPSBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKDAsIDApO1xyXG4gICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgIHN0YXR1c18uY3VycmVudCA9IHN0YXR1cy5jdXJyZW50O1xyXG4gICAgICAgIHN0YXR1c18udG90YWwgPSBzdGF0dXMudG90YWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzdGF0dXNfLmN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHN0YXR1c18udG90YWwgPSBibG9iLnNpemUoKTtcclxuICAgIH1cclxuICAgIGlmIChibG9iLnNpemUoKSAhPT0gc3RhdHVzXy50b3RhbCkge1xyXG4gICAgICAgIHRocm93IHNlcnZlckZpbGVXcm9uZ1NpemUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGJ5dGVzTGVmdCA9IHN0YXR1c18udG90YWwgLSBzdGF0dXNfLmN1cnJlbnQ7XHJcbiAgICBsZXQgYnl0ZXNUb1VwbG9hZCA9IGJ5dGVzTGVmdDtcclxuICAgIGlmIChjaHVua1NpemUgPiAwKSB7XHJcbiAgICAgICAgYnl0ZXNUb1VwbG9hZCA9IE1hdGgubWluKGJ5dGVzVG9VcGxvYWQsIGNodW5rU2l6ZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFydEJ5dGUgPSBzdGF0dXNfLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBlbmRCeXRlID0gc3RhcnRCeXRlICsgYnl0ZXNUb1VwbG9hZDtcclxuICAgIGNvbnN0IHVwbG9hZENvbW1hbmQgPSBieXRlc1RvVXBsb2FkID09PSBieXRlc0xlZnQgPyAndXBsb2FkLCBmaW5hbGl6ZScgOiAndXBsb2FkJztcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtQ29tbWFuZCc6IHVwbG9hZENvbW1hbmQsXHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtT2Zmc2V0JzogYCR7c3RhdHVzXy5jdXJyZW50fWBcclxuICAgIH07XHJcbiAgICBjb25zdCBib2R5ID0gYmxvYi5zbGljZShzdGFydEJ5dGUsIGVuZEJ5dGUpO1xyXG4gICAgaWYgKGJvZHkgPT09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBjYW5ub3RTbGljZUJsb2IoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoeGhyLCB0ZXh0KSB7XHJcbiAgICAgICAgLy8gVE9ETyhhbmR5c290byk6IFZlcmlmeSB0aGUgTUQ1IG9mIGVhY2ggdXBsb2FkZWQgcmFuZ2U6XHJcbiAgICAgICAgLy8gdGhlICd4LXJhbmdlLW1kNScgaGVhZGVyIGNvbWVzIGJhY2sgd2l0aCBzdGF0dXMgY29kZSAzMDggcmVzcG9uc2VzLlxyXG4gICAgICAgIC8vIFdlJ2xsIG9ubHkgYmUgYWJsZSB0byBiYWlsIG91dCB0aG91Z2gsIGJlY2F1c2UgeW91IGNhbid0IHJlLXVwbG9hZCBhXHJcbiAgICAgICAgLy8gcmFuZ2UgdGhhdCB5b3UgcHJldmlvdXNseSB1cGxvYWRlZC5cclxuICAgICAgICBjb25zdCB1cGxvYWRTdGF0dXMgPSBjaGVja1Jlc3VtZUhlYWRlcl8oeGhyLCBbJ2FjdGl2ZScsICdmaW5hbCddKTtcclxuICAgICAgICBjb25zdCBuZXdDdXJyZW50ID0gc3RhdHVzXy5jdXJyZW50ICsgYnl0ZXNUb1VwbG9hZDtcclxuICAgICAgICBjb25zdCBzaXplID0gYmxvYi5zaXplKCk7XHJcbiAgICAgICAgbGV0IG1ldGFkYXRhO1xyXG4gICAgICAgIGlmICh1cGxvYWRTdGF0dXMgPT09ICdmaW5hbCcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGEgPSBtZXRhZGF0YUhhbmRsZXIoc2VydmljZSwgbWFwcGluZ3MpKHhociwgdGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKG5ld0N1cnJlbnQsIHNpemUsIHVwbG9hZFN0YXR1cyA9PT0gJ2ZpbmFsJywgbWV0YWRhdGEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4VXBsb2FkUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICByZXF1ZXN0SW5mby5ib2R5ID0gYm9keS51cGxvYWREYXRhKCk7XHJcbiAgICByZXF1ZXN0SW5mby5wcm9ncmVzc0NhbGxiYWNrID0gcHJvZ3Jlc3NDYWxsYmFjayB8fCBudWxsO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gc2hhcmVkRXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQW4gZXZlbnQgdGhhdCBpcyB0cmlnZ2VyZWQgb24gYSB0YXNrLlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNvbnN0IFRhc2tFdmVudCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogRm9yIHRoaXMgZXZlbnQsXHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiAgIDxsaT5UaGUgYG5leHRgIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCBvbiBwcm9ncmVzcyB1cGRhdGVzIGFuZCB3aGVuIHRoZVxyXG4gICAgICogICAgICAgdGFzayBpcyBwYXVzZWQvcmVzdW1lZCB3aXRoIGFuIGBVcGxvYWRUYXNrU25hcHNob3RgIGFzIHRoZSBmaXJzdFxyXG4gICAgICogICAgICAgYXJndW1lbnQuPC9saT5cclxuICAgICAqICAgPGxpPlRoZSBgZXJyb3JgIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCBpZiB0aGUgdXBsb2FkIGlzIGNhbmNlbGVkIG9yIGZhaWxzXHJcbiAgICAgKiAgICAgICBmb3IgYW5vdGhlciByZWFzb24uPC9saT5cclxuICAgICAqICAgPGxpPlRoZSBgY29tcGxldGVgIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCBpZiB0aGUgdXBsb2FkIGNvbXBsZXRlc1xyXG4gICAgICogICAgICAgc3VjY2Vzc2Z1bGx5LjwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICovXHJcbiAgICBTVEFURV9DSEFOR0VEOiAnc3RhdGVfY2hhbmdlZCdcclxufTtcclxuLy8gdHlwZSBrZXlzID0ga2V5b2YgVGFza1N0YXRlXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIGEgcnVubmluZyB1cGxvYWQuXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuY29uc3QgVGFza1N0YXRlID0ge1xyXG4gICAgLyoqIFRoZSB0YXNrIGlzIGN1cnJlbnRseSB0cmFuc2ZlcnJpbmcgZGF0YS4gKi9cclxuICAgIFJVTk5JTkc6ICdydW5uaW5nJyxcclxuICAgIC8qKiBUaGUgdGFzayB3YXMgcGF1c2VkIGJ5IHRoZSB1c2VyLiAqL1xyXG4gICAgUEFVU0VEOiAncGF1c2VkJyxcclxuICAgIC8qKiBUaGUgdGFzayBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LiAqL1xyXG4gICAgU1VDQ0VTUzogJ3N1Y2Nlc3MnLFxyXG4gICAgLyoqIFRoZSB0YXNrIHdhcyBjYW5jZWxlZC4gKi9cclxuICAgIENBTkNFTEVEOiAnY2FuY2VsZWQnLFxyXG4gICAgLyoqIFRoZSB0YXNrIGZhaWxlZCB3aXRoIGFuIGVycm9yLiAqL1xyXG4gICAgRVJST1I6ICdlcnJvcidcclxufTtcclxuZnVuY3Rpb24gdGFza1N0YXRlRnJvbUludGVybmFsVGFza1N0YXRlKHN0YXRlKSB7XHJcbiAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovOlxyXG4gICAgICAgIGNhc2UgXCJwYXVzaW5nXCIgLyogUEFVU0lORyAqLzpcclxuICAgICAgICBjYXNlIFwiY2FuY2VsaW5nXCIgLyogQ0FOQ0VMSU5HICovOlxyXG4gICAgICAgICAgICByZXR1cm4gVGFza1N0YXRlLlJVTk5JTkc7XHJcbiAgICAgICAgY2FzZSBcInBhdXNlZFwiIC8qIFBBVVNFRCAqLzpcclxuICAgICAgICAgICAgcmV0dXJuIFRhc2tTdGF0ZS5QQVVTRUQ7XHJcbiAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIiAvKiBTVUNDRVNTICovOlxyXG4gICAgICAgICAgICByZXR1cm4gVGFza1N0YXRlLlNVQ0NFU1M7XHJcbiAgICAgICAgY2FzZSBcImNhbmNlbGVkXCIgLyogQ0FOQ0VMRUQgKi86XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdGUuQ0FOQ0VMRUQ7XHJcbiAgICAgICAgY2FzZSBcImVycm9yXCIgLyogRVJST1IgKi86XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdGUuRVJST1I7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6IGFzc2VydChmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdGUuRVJST1I7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xyXG4gICAgICAgIGNvbnN0IGFzRnVuY3Rpb25zID0gaXNGdW5jdGlvbihuZXh0T3JPYnNlcnZlcikgfHwgZXJyb3IgIT0gbnVsbCB8fCBjb21wbGV0ZSAhPSBudWxsO1xyXG4gICAgICAgIGlmIChhc0Z1bmN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQgPSBuZXh0T3JPYnNlcnZlcjtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yICE9PSBudWxsICYmIGVycm9yICE9PSB2b2lkIDAgPyBlcnJvciA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV4dE9yT2JzZXJ2ZXI7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IG9ic2VydmVyLm5leHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBvYnNlcnZlci5lcnJvcjtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IG9ic2VydmVyLmNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBmIHdpdGggaXRzIGFyZ3VtZW50cyBhc3luY2hyb25vdXNseSBhcyBhXHJcbiAqIG1pY3JvdGFzaywgaS5lLiBhcyBzb29uIGFzIHBvc3NpYmxlIGFmdGVyIHRoZSBjdXJyZW50IHNjcmlwdCByZXR1cm5zIGJhY2tcclxuICogaW50byBicm93c2VyIGNvZGUuXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG5mdW5jdGlvbiBhc3luYyhmKSB7XHJcbiAgICByZXR1cm4gKC4uLmFyZ3NUb0ZvcndhcmQpID0+IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzXHJcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBmKC4uLmFyZ3NUb0ZvcndhcmQpKTtcclxuICAgIH07XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBibG9iIGJlaW5nIHVwbG9hZGVkLiBDYW4gYmUgdXNlZCB0byBwYXVzZS9yZXN1bWUvY2FuY2VsIHRoZVxyXG4gKiB1cGxvYWQgYW5kIG1hbmFnZSBjYWxsYmFja3MgZm9yIHZhcmlvdXMgZXZlbnRzLlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIFVwbG9hZFRhc2sge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gcmVmIC0gVGhlIGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2Ugb2JqZWN0IHRoaXMgdGFzayBjYW1lXHJcbiAgICAgKiAgICAgZnJvbSwgdW50eXBlZCB0byBhdm9pZCBjeWNsaWMgZGVwZW5kZW5jaWVzLlxyXG4gICAgICogQHBhcmFtIGJsb2IgLSBUaGUgYmxvYiB0byB1cGxvYWQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJlZiwgYmxvYiwgbWV0YWRhdGEgPSBudWxsKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTnVtYmVyIG9mIGJ5dGVzIHRyYW5zZmVycmVkIHNvIGZhci5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl90cmFuc2ZlcnJlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbmVlZFRvRmV0Y2hTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9uZWVkVG9GZXRjaE1ldGFkYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fdXBsb2FkVXJsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3JlcXVlc3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fY2h1bmtNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3JlamVjdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9yZWYgPSByZWY7XHJcbiAgICAgICAgdGhpcy5fYmxvYiA9IGJsb2I7XHJcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSBtZXRhZGF0YTtcclxuICAgICAgICB0aGlzLl9tYXBwaW5ncyA9IGdldE1hcHBpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5fcmVzdW1hYmxlID0gdGhpcy5fc2hvdWxkRG9SZXN1bWFibGUodGhpcy5fYmxvYik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovO1xyXG4gICAgICAgIHRoaXMuX2Vycm9ySGFuZGxlciA9IGVycm9yID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fY2h1bmtNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLl9jb2RlRXF1YWxzKFwiY2FuY2VsZWRcIiAvKiBDQU5DRUxFRCAqLykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lZWRUb0ZldGNoU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVUcmFuc2l0aW9uc18oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwiZXJyb3JcIiAvKiBFUlJPUiAqLyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX21ldGFkYXRhRXJyb3JIYW5kbGVyID0gZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IuX2NvZGVFcXVhbHMoXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZVRyYW5zaXRpb25zXygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJlcnJvclwiIC8qIEVSUk9SICovKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBQcmV2ZW50IHVuY2F1Z2h0IHJlamVjdGlvbnMgb24gdGhlIGludGVybmFsIHByb21pc2UgZnJvbSBidWJibGluZyBvdXRcclxuICAgICAgICAvLyB0byB0aGUgdG9wIGxldmVsIHdpdGggYSBkdW1teSBoYW5kbGVyLlxyXG4gICAgICAgIHRoaXMuX3Byb21pc2UudGhlbihudWxsLCAoKSA9PiB7IH0pO1xyXG4gICAgfVxyXG4gICAgX21ha2VQcm9ncmVzc0NhbGxiYWNrKCkge1xyXG4gICAgICAgIGNvbnN0IHNpemVCZWZvcmUgPSB0aGlzLl90cmFuc2ZlcnJlZDtcclxuICAgICAgICByZXR1cm4gbG9hZGVkID0+IHRoaXMuX3VwZGF0ZVByb2dyZXNzKHNpemVCZWZvcmUgKyBsb2FkZWQpO1xyXG4gICAgfVxyXG4gICAgX3Nob3VsZERvUmVzdW1hYmxlKGJsb2IpIHtcclxuICAgICAgICByZXR1cm4gYmxvYi5zaXplKCkgPiAyNTYgKiAxMDI0O1xyXG4gICAgfVxyXG4gICAgX3N0YXJ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gXCJydW5uaW5nXCIgLyogUlVOTklORyAqLykge1xyXG4gICAgICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgc29tZW9uZSBwYXVzZXMgdXMgaW4gYSByZXN1bWUgY2FsbGJhY2ssIGZvciBleGFtcGxlLlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmVzdW1hYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91cGxvYWRVcmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlUmVzdW1hYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmVlZFRvRmV0Y2hTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mZXRjaFN0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25lZWRUb0ZldGNoTWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGFwcGVucyBpZiB3ZSBtaXNzIHRoZSBtZXRhZGF0YSBvbiB1cGxvYWQgY29tcGxldGlvbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmV0Y2hNZXRhZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGludWVVcGxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uZVNob3RVcGxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVzb2x2ZVRva2VuKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlc1xyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5fcmVmLnN0b3JhZ2UuX2dldEF1dGhUb2tlbigpLFxyXG4gICAgICAgICAgICB0aGlzLl9yZWYuc3RvcmFnZS5fZ2V0QXBwQ2hlY2tUb2tlbigpXHJcbiAgICAgICAgXSkudGhlbigoW2F1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbl0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FuY2VsaW5nXCIgLyogQ0FOQ0VMSU5HICovOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXVzaW5nXCIgLyogUEFVU0lORyAqLzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwicGF1c2VkXCIgLyogUEFVU0VEICovKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETyhhbmR5c290byk6IGFzc2VydCBmYWxzZVxyXG4gICAgX2NyZWF0ZVJlc3VtYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGNyZWF0ZVJlc3VtYWJsZVVwbG9hZCh0aGlzLl9yZWYuc3RvcmFnZSwgdGhpcy5fcmVmLl9sb2NhdGlvbiwgdGhpcy5fbWFwcGluZ3MsIHRoaXMuX2Jsb2IsIHRoaXMuX21ldGFkYXRhKTtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlUmVxdWVzdCA9IHRoaXMuX3JlZi5zdG9yYWdlLl9tYWtlUmVxdWVzdChyZXF1ZXN0SW5mbywgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3Q7XHJcbiAgICAgICAgICAgIGNyZWF0ZVJlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4oKHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZFVybCA9IHVybDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lZWRUb0ZldGNoU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlVHJhbnNpdGlvbnNfKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2Vycm9ySGFuZGxlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfZmV0Y2hTdGF0dXMoKSB7XHJcbiAgICAgICAgLy8gVE9ETyhhbmR5c290byk6IGFzc2VydCh0aGlzLnVwbG9hZFVybF8gIT09IG51bGwpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX3VwbG9hZFVybDtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGdldFJlc3VtYWJsZVVwbG9hZFN0YXR1cyh0aGlzLl9yZWYuc3RvcmFnZSwgdGhpcy5fcmVmLl9sb2NhdGlvbiwgdXJsLCB0aGlzLl9ibG9iKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzUmVxdWVzdCA9IHRoaXMuX3JlZi5zdG9yYWdlLl9tYWtlUmVxdWVzdChyZXF1ZXN0SW5mbywgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHN0YXR1c1JlcXVlc3Q7XHJcbiAgICAgICAgICAgIHN0YXR1c1JlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4oc3RhdHVzID0+IHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcyhzdGF0dXMuY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZWVkVG9GZXRjaFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5maW5hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkVG9GZXRjaE1ldGFkYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVUcmFuc2l0aW9uc18oKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5fZXJyb3JIYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9jb250aW51ZVVwbG9hZCgpIHtcclxuICAgICAgICBjb25zdCBjaHVua1NpemUgPSBSRVNVTUFCTEVfVVBMT0FEX0NIVU5LX1NJWkUgKiB0aGlzLl9jaHVua011bHRpcGxpZXI7XHJcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFJlc3VtYWJsZVVwbG9hZFN0YXR1cyh0aGlzLl90cmFuc2ZlcnJlZCwgdGhpcy5fYmxvYi5zaXplKCkpO1xyXG4gICAgICAgIC8vIFRPRE8oYW5keXNvdG8pOiBhc3NlcnQodGhpcy51cGxvYWRVcmxfICE9PSBudWxsKTtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl91cGxvYWRVcmw7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZVRva2VuKChhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3RJbmZvO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEluZm8gPSBjb250aW51ZVJlc3VtYWJsZVVwbG9hZCh0aGlzLl9yZWYuX2xvY2F0aW9uLCB0aGlzLl9yZWYuc3RvcmFnZSwgdXJsLCB0aGlzLl9ibG9iLCBjaHVua1NpemUsIHRoaXMuX21hcHBpbmdzLCBzdGF0dXMsIHRoaXMuX21ha2VQcm9ncmVzc0NhbGxiYWNrKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvciA9IGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwiZXJyb3JcIiAvKiBFUlJPUiAqLyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdXBsb2FkUmVxdWVzdCA9IHRoaXMuX3JlZi5zdG9yYWdlLl9tYWtlUmVxdWVzdChyZXF1ZXN0SW5mbywgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVwbG9hZFJlcXVlc3Q7XHJcbiAgICAgICAgICAgIHVwbG9hZFJlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4oKG5ld1N0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5jcmVhc2VNdWx0aXBsaWVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MobmV3U3RhdHVzLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1N0YXR1cy5maW5hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG5ld1N0YXR1cy5tZXRhZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwic3VjY2Vzc1wiIC8qIFNVQ0NFU1MgKi8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZVRyYW5zaXRpb25zXygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLl9lcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX2luY3JlYXNlTXVsdGlwbGllcigpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2l6ZSA9IFJFU1VNQUJMRV9VUExPQURfQ0hVTktfU0laRSAqIHRoaXMuX2NodW5rTXVsdGlwbGllcjtcclxuICAgICAgICAvLyBNYXggY2h1bmsgc2l6ZSBpcyAzMk0uXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTaXplIDwgMzIgKiAxMDI0ICogMTAyNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaHVua011bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfZmV0Y2hNZXRhZGF0YSgpIHtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGdldE1ldGFkYXRhJDIodGhpcy5fcmVmLnN0b3JhZ2UsIHRoaXMuX3JlZi5fbG9jYXRpb24sIHRoaXMuX21hcHBpbmdzKTtcclxuICAgICAgICAgICAgY29uc3QgbWV0YWRhdGFSZXF1ZXN0ID0gdGhpcy5fcmVmLnN0b3JhZ2UuX21ha2VSZXF1ZXN0KHJlcXVlc3RJbmZvLCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gbWV0YWRhdGFSZXF1ZXN0O1xyXG4gICAgICAgICAgICBtZXRhZGF0YVJlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4obWV0YWRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhID0gbWV0YWRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwic3VjY2Vzc1wiIC8qIFNVQ0NFU1MgKi8pO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9tZXRhZGF0YUVycm9ySGFuZGxlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfb25lU2hvdFVwbG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SW5mbyA9IG11bHRpcGFydFVwbG9hZCh0aGlzLl9yZWYuc3RvcmFnZSwgdGhpcy5fcmVmLl9sb2NhdGlvbiwgdGhpcy5fbWFwcGluZ3MsIHRoaXMuX2Jsb2IsIHRoaXMuX21ldGFkYXRhKTtcclxuICAgICAgICAgICAgY29uc3QgbXVsdGlwYXJ0UmVxdWVzdCA9IHRoaXMuX3JlZi5zdG9yYWdlLl9tYWtlUmVxdWVzdChyZXF1ZXN0SW5mbywgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IG11bHRpcGFydFJlcXVlc3Q7XHJcbiAgICAgICAgICAgIG11bHRpcGFydFJlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4obWV0YWRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhID0gbWV0YWRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcyh0aGlzLl9ibG9iLnNpemUoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwic3VjY2Vzc1wiIC8qIFNVQ0NFU1MgKi8pO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9lcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX3VwZGF0ZVByb2dyZXNzKHRyYW5zZmVycmVkKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5fdHJhbnNmZXJyZWQ7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmZXJyZWQgPSB0cmFuc2ZlcnJlZDtcclxuICAgICAgICAvLyBBIHByb2dyZXNzIHVwZGF0ZSBjYW4gbWFrZSB0aGUgXCJ0cmFuc2ZlcnJlZFwiIHZhbHVlIHNtYWxsZXIgKGUuZy4gYVxyXG4gICAgICAgIC8vIHBhcnRpYWwgdXBsb2FkIG5vdCBjb21wbGV0ZWQgYnkgc2VydmVyLCBhZnRlciB3aGljaCB0aGUgXCJ0cmFuc2ZlcnJlZFwiXHJcbiAgICAgICAgLy8gdmFsdWUgbWF5IHJlc2V0IHRvIHRoZSB2YWx1ZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSByZXF1ZXN0KS5cclxuICAgICAgICBpZiAodGhpcy5fdHJhbnNmZXJyZWQgIT09IG9sZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3RpZnlPYnNlcnZlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfdHJhbnNpdGlvbihzdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gc3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYW5jZWxpbmdcIiAvKiBDQU5DRUxJTkcgKi86XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTpcclxuICAgICAgICAgICAgICAgIC8vIGFzc2VydCh0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUlVOTklORyB8fFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5QQVVTSU5HKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdC5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGF1c2luZ1wiIC8qIFBBVVNJTkcgKi86XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTpcclxuICAgICAgICAgICAgICAgIC8vIGFzc2VydCh0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUlVOTklORyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3QuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovOlxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6XHJcbiAgICAgICAgICAgICAgICAvLyBhc3NlcnQodGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlBBVVNFRCB8fFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5QQVVTSU5HKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdhc1BhdXNlZCA9IHRoaXMuX3N0YXRlID09PSBcInBhdXNlZFwiIC8qIFBBVVNFRCAqLztcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICBpZiAod2FzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5T2JzZXJ2ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGF1c2VkXCIgLyogUEFVU0VEICovOlxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6XHJcbiAgICAgICAgICAgICAgICAvLyBhc3NlcnQodGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlBBVVNJTkcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovOlxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6XHJcbiAgICAgICAgICAgICAgICAvLyBhc3NlcnQodGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlBBVVNFRCB8fFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5DQU5DRUxJTkcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IgPSBjYW5jZWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiIC8qIEVSUk9SICovOlxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6XHJcbiAgICAgICAgICAgICAgICAvLyBhc3NlcnQodGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlJVTk5JTkcgfHxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUEFVU0lORyB8fFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5DQU5DRUxJTkcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCIgLyogU1VDQ0VTUyAqLzpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8oYW5keXNvdG8pOlxyXG4gICAgICAgICAgICAgICAgLy8gYXNzZXJ0KHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5SVU5OSU5HIHx8XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlBBVVNJTkcgfHxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuQ0FOQ0VMSU5HKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlPYnNlcnZlcnMoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBsZXRlVHJhbnNpdGlvbnNfKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInBhdXNpbmdcIiAvKiBQQVVTSU5HICovOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbihcInBhdXNlZFwiIC8qIFBBVVNFRCAqLyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNhbmNlbGluZ1wiIC8qIENBTkNFTElORyAqLzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicnVubmluZ1wiIC8qIFJVTk5JTkcgKi86XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHNuYXBzaG90IG9mIHRoZSBjdXJyZW50IHRhc2sgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIGdldCBzbmFwc2hvdCgpIHtcclxuICAgICAgICBjb25zdCBleHRlcm5hbFN0YXRlID0gdGFza1N0YXRlRnJvbUludGVybmFsVGFza1N0YXRlKHRoaXMuX3N0YXRlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBieXRlc1RyYW5zZmVycmVkOiB0aGlzLl90cmFuc2ZlcnJlZCxcclxuICAgICAgICAgICAgdG90YWxCeXRlczogdGhpcy5fYmxvYi5zaXplKCksXHJcbiAgICAgICAgICAgIHN0YXRlOiBleHRlcm5hbFN0YXRlLFxyXG4gICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5fbWV0YWRhdGEsXHJcbiAgICAgICAgICAgIHRhc2s6IHRoaXMsXHJcbiAgICAgICAgICAgIHJlZjogdGhpcy5fcmVmXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGNhbGxiYWNrIGZvciBhbiBldmVudC5cclxuICAgICAqIEBwYXJhbSB0eXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgdG8gbGlzdGVuIGZvci5cclxuICAgICAqIEBwYXJhbSBuZXh0T3JPYnNlcnZlciAtXHJcbiAgICAgKiAgICAgVGhlIGBuZXh0YCBmdW5jdGlvbiwgd2hpY2ggZ2V0cyBjYWxsZWQgZm9yIGVhY2ggaXRlbSBpblxyXG4gICAgICogICAgIHRoZSBldmVudCBzdHJlYW0sIG9yIGFuIG9ic2VydmVyIG9iamVjdCB3aXRoIHNvbWUgb3IgYWxsIG9mIHRoZXNlIHRocmVlXHJcbiAgICAgKiAgICAgcHJvcGVydGllcyAoYG5leHRgLCBgZXJyb3JgLCBgY29tcGxldGVgKS5cclxuICAgICAqIEBwYXJhbSBlcnJvciAtIEEgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCB3aXRoIGEgYFN0b3JhZ2VFcnJvcmBcclxuICAgICAqICAgICBpZiB0aGUgZXZlbnQgc3RyZWFtIGVuZHMgZHVlIHRvIGFuIGVycm9yLlxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlZCAtIEEgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBpZiB0aGVcclxuICAgICAqICAgICBldmVudCBzdHJlYW0gZW5kcyBub3JtYWxseS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiAgICAgSWYgb25seSB0aGUgZXZlbnQgYXJndW1lbnQgaXMgcGFzc2VkLCByZXR1cm5zIGEgZnVuY3Rpb24geW91IGNhbiB1c2UgdG9cclxuICAgICAqICAgICBhZGQgY2FsbGJhY2tzIChzZWUgdGhlIGV4YW1wbGVzIGFib3ZlKS4gSWYgbW9yZSB0aGFuIGp1c3QgdGhlIGV2ZW50XHJcbiAgICAgKiAgICAgYXJndW1lbnQgaXMgcGFzc2VkLCByZXR1cm5zIGEgZnVuY3Rpb24geW91IGNhbiBjYWxsIHRvIHVucmVnaXN0ZXIgdGhlXHJcbiAgICAgKiAgICAgY2FsbGJhY2tzLlxyXG4gICAgICovXHJcbiAgICBvbih0eXBlLCBuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlZCkge1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyKG5leHRPck9ic2VydmVyIHx8IHVuZGVmaW5lZCwgZXJyb3IgfHwgdW5kZWZpbmVkLCBjb21wbGV0ZWQgfHwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLl9hZGRPYnNlcnZlcihvYnNlcnZlcik7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgb2JqZWN0IGJlaGF2ZXMgbGlrZSBhIFByb21pc2UsIGFuZCByZXNvbHZlcyB3aXRoIGl0cyBzbmFwc2hvdCBkYXRhXHJcbiAgICAgKiB3aGVuIHRoZSB1cGxvYWQgY29tcGxldGVzLlxyXG4gICAgICogQHBhcmFtIG9uRnVsZmlsbGVkIC0gVGhlIGZ1bGZpbGxtZW50IGNhbGxiYWNrLiBQcm9taXNlIGNoYWluaW5nIHdvcmtzIGFzIG5vcm1hbC5cclxuICAgICAqIEBwYXJhbSBvblJlamVjdGVkIC0gVGhlIHJlamVjdGlvbiBjYWxsYmFjay5cclxuICAgICAqL1xyXG4gICAgdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xyXG4gICAgICAgIC8vIFRoZXNlIGNhc3RzIGFyZSBuZWVkZWQgc28gdGhhdCBUeXBlU2NyaXB0IGNhbiBpbmZlciB0aGUgdHlwZXMgb2YgdGhlXHJcbiAgICAgICAgLy8gcmVzdWx0aW5nIFByb21pc2UuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEVxdWl2YWxlbnQgdG8gY2FsbGluZyBgdGhlbihudWxsLCBvblJlamVjdGVkKWAuXHJcbiAgICAgKi9cclxuICAgIGNhdGNoKG9uUmVqZWN0ZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBvYnNlcnZlci5cclxuICAgICAqL1xyXG4gICAgX2FkZE9ic2VydmVyKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVyKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gb2JzZXJ2ZXIuXHJcbiAgICAgKi9cclxuICAgIF9yZW1vdmVPYnNlcnZlcihvYnNlcnZlcikge1xyXG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLl9vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX25vdGlmeU9ic2VydmVycygpIHtcclxuICAgICAgICB0aGlzLl9maW5pc2hQcm9taXNlKCk7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzLnNsaWNlKCk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2gob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3RpZnlPYnNlcnZlcihvYnNlcnZlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfZmluaXNoUHJvbWlzZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVzb2x2ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRhc2tTdGF0ZUZyb21JbnRlcm5hbFRhc2tTdGF0ZSh0aGlzLl9zdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlNVQ0NFU1M6XHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmModGhpcy5fcmVzb2x2ZS5iaW5kKG51bGwsIHRoaXMuc25hcHNob3QpKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuQ0FOQ0VMRUQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5FUlJPUjpcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b0NhbGwgPSB0aGlzLl9yZWplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmModG9DYWxsLmJpbmQobnVsbCwgdGhpcy5fZXJyb3IpKSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX25vdGlmeU9ic2VydmVyKG9ic2VydmVyKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ZXJuYWxTdGF0ZSA9IHRhc2tTdGF0ZUZyb21JbnRlcm5hbFRhc2tTdGF0ZSh0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgc3dpdGNoIChleHRlcm5hbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlJVTk5JTkc6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlBBVVNFRDpcclxuICAgICAgICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMob2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyLCB0aGlzLnNuYXBzaG90KSkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5TVUNDRVNTOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMob2JzZXJ2ZXIuY29tcGxldGUuYmluZChvYnNlcnZlcikpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuQ0FOQ0VMRUQ6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLkVSUk9SOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMob2JzZXJ2ZXIuZXJyb3IuYmluZChvYnNlcnZlciwgdGhpcy5fZXJyb3IpKSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTogYXNzZXJ0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChvYnNlcnZlci5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jKG9ic2VydmVyLmVycm9yLmJpbmQob2JzZXJ2ZXIsIHRoaXMuX2Vycm9yKSkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlc3VtZXMgYSBwYXVzZWQgdGFzay4gSGFzIG5vIGVmZmVjdCBvbiBhIGN1cnJlbnRseSBydW5uaW5nIG9yIGZhaWxlZCB0YXNrLlxyXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgb3BlcmF0aW9uIHRvb2sgZWZmZWN0LCBmYWxzZSBpZiBpZ25vcmVkLlxyXG4gICAgICovXHJcbiAgICByZXN1bWUoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLl9zdGF0ZSA9PT0gXCJwYXVzZWRcIiAvKiBQQVVTRUQgKi8gfHxcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPT09IFwicGF1c2luZ1wiIC8qIFBBVVNJTkcgKi87XHJcbiAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJydW5uaW5nXCIgLyogUlVOTklORyAqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUGF1c2VzIGEgY3VycmVudGx5IHJ1bm5pbmcgdGFzay4gSGFzIG5vIGVmZmVjdCBvbiBhIHBhdXNlZCBvciBmYWlsZWQgdGFzay5cclxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9wZXJhdGlvbiB0b29rIGVmZmVjdCwgZmFsc2UgaWYgaWdub3JlZC5cclxuICAgICAqL1xyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLl9zdGF0ZSA9PT0gXCJydW5uaW5nXCIgLyogUlVOTklORyAqLztcclxuICAgICAgICBpZiAodmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbihcInBhdXNpbmdcIiAvKiBQQVVTSU5HICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW5jZWxzIGEgY3VycmVudGx5IHJ1bm5pbmcgb3IgcGF1c2VkIHRhc2suIEhhcyBubyBlZmZlY3Qgb24gYSBjb21wbGV0ZSBvclxyXG4gICAgICogZmFpbGVkIHRhc2suXHJcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBvcGVyYXRpb24gdG9vayBlZmZlY3QsIGZhbHNlIGlmIGlnbm9yZWQuXHJcbiAgICAgKi9cclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMuX3N0YXRlID09PSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID09PSBcInBhdXNpbmdcIiAvKiBQQVVTSU5HICovO1xyXG4gICAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwiY2FuY2VsaW5nXCIgLyogQ0FOQ0VMSU5HICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBtZXRob2RzIHRvIGludGVyYWN0IHdpdGggYSBidWNrZXQgaW4gdGhlIEZpcmViYXNlIFN0b3JhZ2Ugc2VydmljZS5cclxuICogQGludGVybmFsXHJcbiAqIEBwYXJhbSBfbG9jYXRpb24gLSBBbiBmYnMubG9jYXRpb24sIG9yIHRoZSBVUkwgYXRcclxuICogICAgIHdoaWNoIHRvIGJhc2UgdGhpcyBvYmplY3QsIGluIG9uZSBvZiB0aGUgZm9sbG93aW5nIGZvcm1zOlxyXG4gKiAgICAgICAgIGdzOi8vPGJ1Y2tldD4vPG9iamVjdC1wYXRoPlxyXG4gKiAgICAgICAgIGh0dHBbc106Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vXHJcbiAqICAgICAgICAgICAgICAgICAgICAgPGFwaS12ZXJzaW9uPi9iLzxidWNrZXQ+L28vPG9iamVjdC1wYXRoPlxyXG4gKiAgICAgQW55IHF1ZXJ5IG9yIGZyYWdtZW50IHN0cmluZ3Mgd2lsbCBiZSBpZ25vcmVkIGluIHRoZSBodHRwW3NdXHJcbiAqICAgICBmb3JtYXQuIElmIG5vIHZhbHVlIGlzIHBhc3NlZCwgdGhlIHN0b3JhZ2Ugb2JqZWN0IHdpbGwgdXNlIGEgVVJMIGJhc2VkIG9uXHJcbiAqICAgICB0aGUgcHJvamVjdCBJRCBvZiB0aGUgYmFzZSBmaXJlYmFzZS5BcHAgaW5zdGFuY2UuXHJcbiAqL1xyXG5jbGFzcyBSZWZlcmVuY2Uge1xyXG4gICAgY29uc3RydWN0b3IoX3NlcnZpY2UsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZSA9IF9zZXJ2aWNlO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbiBpbnN0YW5jZW9mIExvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IExvY2F0aW9uLm1ha2VGcm9tVXJsKGxvY2F0aW9uLCBfc2VydmljZS5ob3N0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIFVSTCBmb3IgdGhlIGJ1Y2tldCBhbmQgcGF0aCB0aGlzIG9iamVjdCByZWZlcmVuY2VzLFxyXG4gICAgICogICAgIGluIHRoZSBmb3JtIGdzOi8vPGJ1Y2tldD4vPG9iamVjdC1wYXRoPlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiAnZ3M6Ly8nICsgdGhpcy5fbG9jYXRpb24uYnVja2V0ICsgJy8nICsgdGhpcy5fbG9jYXRpb24ucGF0aDtcclxuICAgIH1cclxuICAgIF9uZXdSZWYoc2VydmljZSwgbG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZShzZXJ2aWNlLCBsb2NhdGlvbik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSByb290IG9mIHRoaXMgb2JqZWN0J3MgYnVja2V0LlxyXG4gICAgICovXHJcbiAgICBnZXQgcm9vdCgpIHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG5ldyBMb2NhdGlvbih0aGlzLl9sb2NhdGlvbi5idWNrZXQsICcnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmV3UmVmKHRoaXMuX3NlcnZpY2UsIGxvY2F0aW9uKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGJ1Y2tldCBjb250YWluaW5nIHRoaXMgcmVmZXJlbmNlJ3Mgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBnZXQgYnVja2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbi5idWNrZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmdWxsIHBhdGggb2YgdGhpcyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGdldCBmdWxsUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb24ucGF0aDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNob3J0IG5hbWUgb2YgdGhpcyBvYmplY3QsIHdoaWNoIGlzIHRoZSBsYXN0IGNvbXBvbmVudCBvZiB0aGUgZnVsbCBwYXRoLlxyXG4gICAgICogRm9yIGV4YW1wbGUsIGlmIGZ1bGxQYXRoIGlzICdmdWxsL3BhdGgvaW1hZ2UucG5nJywgbmFtZSBpcyAnaW1hZ2UucG5nJy5cclxuICAgICAqL1xyXG4gICAgZ2V0IG5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGxhc3RDb21wb25lbnQodGhpcy5fbG9jYXRpb24ucGF0aCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBgU3RvcmFnZVNlcnZpY2VgIGluc3RhbmNlIHRoaXMgYFN0b3JhZ2VSZWZlcmVuY2VgIGlzIGFzc29jaWF0ZWQgd2l0aC5cclxuICAgICAqL1xyXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEEgYFN0b3JhZ2VSZWZlcmVuY2VgIHBvaW50aW5nIHRvIHRoZSBwYXJlbnQgbG9jYXRpb24gb2YgdGhpcyBgU3RvcmFnZVJlZmVyZW5jZWAsIG9yIG51bGwgaWZcclxuICAgICAqIHRoaXMgcmVmZXJlbmNlIGlzIHRoZSByb290LlxyXG4gICAgICovXHJcbiAgICBnZXQgcGFyZW50KCkge1xyXG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSBwYXJlbnQodGhpcy5fbG9jYXRpb24ucGF0aCk7XHJcbiAgICAgICAgaWYgKG5ld1BhdGggPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKHRoaXMuX2xvY2F0aW9uLmJ1Y2tldCwgbmV3UGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWZlcmVuY2UodGhpcy5fc2VydmljZSwgbG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIHRocm93IGFuIGVycm9yIGluIG1ldGhvZHMgdGhhdCBkbyBub3QgYWNjZXB0IGEgcm9vdCByZWZlcmVuY2UuXHJcbiAgICAgKi9cclxuICAgIF90aHJvd0lmUm9vdChuYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvY2F0aW9uLnBhdGggPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IGludmFsaWRSb290T3BlcmF0aW9uKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgaXMgbm90IHJlc3VtYWJsZS5cclxuICpcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2Ugd2hlcmUgZGF0YSBzaG91bGQgYmUgdXBsb2FkZWQuXHJcbiAqIEBwYXJhbSBkYXRhIC0gVGhlIGRhdGEgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gbWV0YWRhdGEgLSBNZXRhZGF0YSBmb3IgdGhlIG5ld2x5IHVwbG9hZGVkIGRhdGEuXHJcbiAqIEByZXR1cm5zIEEgUHJvbWlzZSBjb250YWluaW5nIGFuIFVwbG9hZFJlc3VsdFxyXG4gKi9cclxuZnVuY3Rpb24gdXBsb2FkQnl0ZXMkMShyZWYsIGRhdGEsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYuX3Rocm93SWZSb290KCd1cGxvYWRCeXRlcycpO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBtdWx0aXBhcnRVcGxvYWQocmVmLnN0b3JhZ2UsIHJlZi5fbG9jYXRpb24sIGdldE1hcHBpbmdzKCksIG5ldyBGYnNCbG9iKGRhdGEsIHRydWUpLCBtZXRhZGF0YSk7XHJcbiAgICByZXR1cm4gcmVmLnN0b3JhZ2VcclxuICAgICAgICAubWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvKVxyXG4gICAgICAgIC50aGVuKHJlcXVlc3QgPT4gcmVxdWVzdC5nZXRQcm9taXNlKCkpXHJcbiAgICAgICAgLnRoZW4oZmluYWxNZXRhZGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0YWRhdGE6IGZpbmFsTWV0YWRhdGEsXHJcbiAgICAgICAgICAgIHJlZlxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgY2FuIGJlIHBhdXNlZCBhbmQgcmVzdW1lZCwgYW5kIGV4cG9zZXMgcHJvZ3Jlc3MgdXBkYXRlcy5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB3aGVyZSBkYXRhIHNob3VsZCBiZSB1cGxvYWRlZC5cclxuICogQHBhcmFtIGRhdGEgLSBUaGUgZGF0YSB0byB1cGxvYWQuXHJcbiAqIEBwYXJhbSBtZXRhZGF0YSAtIE1ldGFkYXRhIGZvciB0aGUgbmV3bHkgdXBsb2FkZWQgZGF0YS5cclxuICogQHJldHVybnMgQW4gVXBsb2FkVGFza1xyXG4gKi9cclxuZnVuY3Rpb24gdXBsb2FkQnl0ZXNSZXN1bWFibGUkMShyZWYsIGRhdGEsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYuX3Rocm93SWZSb290KCd1cGxvYWRCeXRlc1Jlc3VtYWJsZScpO1xyXG4gICAgcmV0dXJuIG5ldyBVcGxvYWRUYXNrKHJlZiwgbmV3IEZic0Jsb2IoZGF0YSksIG1ldGFkYXRhKTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBhIHN0cmluZyB0byB0aGlzIG9iamVjdCdzIGxvY2F0aW9uLlxyXG4gKiBUaGUgdXBsb2FkIGlzIG5vdCByZXN1bWFibGUuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2Ugd2hlcmUgc3RyaW5nIHNob3VsZCBiZSB1cGxvYWRlZC5cclxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHN0cmluZyB0byB1cGxvYWQuXHJcbiAqIEBwYXJhbSBmb3JtYXQgLSBUaGUgZm9ybWF0IG9mIHRoZSBzdHJpbmcgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gbWV0YWRhdGEgLSBNZXRhZGF0YSBmb3IgdGhlIG5ld2x5IHVwbG9hZGVkIHN0cmluZy5cclxuICogQHJldHVybnMgQSBQcm9taXNlIGNvbnRhaW5pbmcgYW4gVXBsb2FkUmVzdWx0XHJcbiAqL1xyXG5mdW5jdGlvbiB1cGxvYWRTdHJpbmckMShyZWYsIHZhbHVlLCBmb3JtYXQgPSBTdHJpbmdGb3JtYXQuUkFXLCBtZXRhZGF0YSkge1xyXG4gICAgcmVmLl90aHJvd0lmUm9vdCgndXBsb2FkU3RyaW5nJyk7XHJcbiAgICBjb25zdCBkYXRhID0gZGF0YUZyb21TdHJpbmcoZm9ybWF0LCB2YWx1ZSk7XHJcbiAgICBjb25zdCBtZXRhZGF0YUNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgbWV0YWRhdGEpO1xyXG4gICAgaWYgKG1ldGFkYXRhQ2xvbmVbJ2NvbnRlbnRUeXBlJ10gPT0gbnVsbCAmJiBkYXRhLmNvbnRlbnRUeXBlICE9IG51bGwpIHtcclxuICAgICAgICBtZXRhZGF0YUNsb25lWydjb250ZW50VHlwZSddID0gZGF0YS5jb250ZW50VHlwZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1cGxvYWRCeXRlcyQxKHJlZiwgZGF0YS5kYXRhLCBtZXRhZGF0YUNsb25lKTtcclxufVxyXG4vKipcclxuICogTGlzdCBhbGwgaXRlbXMgKGZpbGVzKSBhbmQgcHJlZml4ZXMgKGZvbGRlcnMpIHVuZGVyIHRoaXMgc3RvcmFnZSByZWZlcmVuY2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIGZvciBjYWxsaW5nIGxpc3QoKSByZXBlYXRlZGx5IHVudGlsIHRoZXJlIGFyZVxyXG4gKiBubyBtb3JlIHJlc3VsdHMuIFRoZSBkZWZhdWx0IHBhZ2luYXRpb24gc2l6ZSBpcyAxMDAwLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGUgcmVzdWx0cyBtYXkgbm90IGJlIGNvbnNpc3RlbnQgaWYgb2JqZWN0cyBhcmUgY2hhbmdlZCB3aGlsZSB0aGlzXHJcbiAqIG9wZXJhdGlvbiBpcyBydW5uaW5nLlxyXG4gKlxyXG4gKiBXYXJuaW5nOiBsaXN0QWxsIG1heSBwb3RlbnRpYWxseSBjb25zdW1lIHRvbyBtYW55IHJlc291cmNlcyBpZiB0aGVyZSBhcmVcclxuICogdG9vIG1hbnkgcmVzdWx0cy5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB0byBnZXQgbGlzdCBmcm9tLlxyXG4gKlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGFsbCB0aGUgaXRlbXMgYW5kIHByZWZpeGVzIHVuZGVyXHJcbiAqICAgICAgdGhlIGN1cnJlbnQgc3RvcmFnZSByZWZlcmVuY2UuIGBwcmVmaXhlc2AgY29udGFpbnMgcmVmZXJlbmNlcyB0b1xyXG4gKiAgICAgIHN1Yi1kaXJlY3RvcmllcyBhbmQgYGl0ZW1zYCBjb250YWlucyByZWZlcmVuY2VzIHRvIG9iamVjdHMgaW4gdGhpc1xyXG4gKiAgICAgIGZvbGRlci4gYG5leHRQYWdlVG9rZW5gIGlzIG5ldmVyIHJldHVybmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdEFsbCQxKHJlZikge1xyXG4gICAgY29uc3QgYWNjdW11bGF0b3IgPSB7XHJcbiAgICAgICAgcHJlZml4ZXM6IFtdLFxyXG4gICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgfTtcclxuICAgIHJldHVybiBsaXN0QWxsSGVscGVyKHJlZiwgYWNjdW11bGF0b3IpLnRoZW4oKCkgPT4gYWNjdW11bGF0b3IpO1xyXG59XHJcbi8qKlxyXG4gKiBTZXBhcmF0ZWQgZnJvbSBsaXN0QWxsIGJlY2F1c2UgYXN5bmMgZnVuY3Rpb25zIGNhbid0IHVzZSBcImFyZ3VtZW50c1wiLlxyXG4gKiBAcGFyYW0gcmVmXHJcbiAqIEBwYXJhbSBhY2N1bXVsYXRvclxyXG4gKiBAcGFyYW0gcGFnZVRva2VuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBsaXN0QWxsSGVscGVyKHJlZiwgYWNjdW11bGF0b3IsIHBhZ2VUb2tlbikge1xyXG4gICAgY29uc3Qgb3B0ID0ge1xyXG4gICAgICAgIC8vIG1heFJlc3VsdHMgaXMgMTAwMCBieSBkZWZhdWx0LlxyXG4gICAgICAgIHBhZ2VUb2tlblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5leHRQYWdlID0gYXdhaXQgbGlzdCQxKHJlZiwgb3B0KTtcclxuICAgIGFjY3VtdWxhdG9yLnByZWZpeGVzLnB1c2goLi4ubmV4dFBhZ2UucHJlZml4ZXMpO1xyXG4gICAgYWNjdW11bGF0b3IuaXRlbXMucHVzaCguLi5uZXh0UGFnZS5pdGVtcyk7XHJcbiAgICBpZiAobmV4dFBhZ2UubmV4dFBhZ2VUb2tlbiAhPSBudWxsKSB7XHJcbiAgICAgICAgYXdhaXQgbGlzdEFsbEhlbHBlcihyZWYsIGFjY3VtdWxhdG9yLCBuZXh0UGFnZS5uZXh0UGFnZVRva2VuKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogTGlzdCBpdGVtcyAoZmlsZXMpIGFuZCBwcmVmaXhlcyAoZm9sZGVycykgdW5kZXIgdGhpcyBzdG9yYWdlIHJlZmVyZW5jZS5cclxuICpcclxuICogTGlzdCBBUEkgaXMgb25seSBhdmFpbGFibGUgZm9yIEZpcmViYXNlIFJ1bGVzIFZlcnNpb24gMi5cclxuICpcclxuICogR0NTIGlzIGEga2V5LWJsb2Igc3RvcmUuIEZpcmViYXNlIFN0b3JhZ2UgaW1wb3NlcyB0aGUgc2VtYW50aWMgb2YgJy8nXHJcbiAqIGRlbGltaXRlZCBmb2xkZXIgc3RydWN0dXJlLlxyXG4gKiBSZWZlciB0byBHQ1MncyBMaXN0IEFQSSBpZiB5b3Ugd2FudCB0byBsZWFybiBtb3JlLlxyXG4gKlxyXG4gKiBUbyBhZGhlcmUgdG8gRmlyZWJhc2UgUnVsZXMncyBTZW1hbnRpY3MsIEZpcmViYXNlIFN0b3JhZ2UgZG9lcyBub3RcclxuICogc3VwcG9ydCBvYmplY3RzIHdob3NlIHBhdGhzIGVuZCB3aXRoIFwiL1wiIG9yIGNvbnRhaW4gdHdvIGNvbnNlY3V0aXZlXHJcbiAqIFwiL1wicy4gRmlyZWJhc2UgU3RvcmFnZSBMaXN0IEFQSSB3aWxsIGZpbHRlciB0aGVzZSB1bnN1cHBvcnRlZCBvYmplY3RzLlxyXG4gKiBsaXN0KCkgbWF5IGZhaWwgaWYgdGhlcmUgYXJlIHRvbyBtYW55IHVuc3VwcG9ydGVkIG9iamVjdHMgaW4gdGhlIGJ1Y2tldC5cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB0byBnZXQgbGlzdCBmcm9tLlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFNlZSBMaXN0T3B0aW9ucyBmb3IgZGV0YWlscy5cclxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgaXRlbXMgYW5kIHByZWZpeGVzLlxyXG4gKiAgICAgIGBwcmVmaXhlc2AgY29udGFpbnMgcmVmZXJlbmNlcyB0byBzdWItZm9sZGVycyBhbmQgYGl0ZW1zYFxyXG4gKiAgICAgIGNvbnRhaW5zIHJlZmVyZW5jZXMgdG8gb2JqZWN0cyBpbiB0aGlzIGZvbGRlci4gYG5leHRQYWdlVG9rZW5gXHJcbiAqICAgICAgY2FuIGJlIHVzZWQgdG8gZ2V0IHRoZSByZXN0IG9mIHRoZSByZXN1bHRzLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gbGlzdCQxKHJlZiwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhSZXN1bHRzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZU51bWJlcignb3B0aW9ucy5tYXhSZXN1bHRzJywgXHJcbiAgICAgICAgICAgIC8qIG1pblZhbHVlPSAqLyAxLCBcclxuICAgICAgICAgICAgLyogbWF4VmFsdWU9ICovIDEwMDAsIG9wdGlvbnMubWF4UmVzdWx0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgb3AgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBsaXN0JDIocmVmLnN0b3JhZ2UsIHJlZi5fbG9jYXRpb24sIFxyXG4gICAgLypkZWxpbWl0ZXI9ICovICcvJywgb3AucGFnZVRva2VuLCBvcC5tYXhSZXN1bHRzKTtcclxuICAgIHJldHVybiAoYXdhaXQgcmVmLnN0b3JhZ2UubWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvKSkuZ2V0UHJvbWlzZSgpO1xyXG59XHJcbi8qKlxyXG4gKiBBIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG1ldGFkYXRhIGZvciB0aGlzIG9iamVjdC4gSWYgdGhpc1xyXG4gKiBvYmplY3QgZG9lc24ndCBleGlzdCBvciBtZXRhZGF0YSBjYW5ub3QgYmUgcmV0cmVpdmVkLCB0aGUgcHJvbWlzZSBpc1xyXG4gKiByZWplY3RlZC5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB0byBnZXQgbWV0YWRhdGEgZnJvbS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGdldE1ldGFkYXRhJDEocmVmKSB7XHJcbiAgICByZWYuX3Rocm93SWZSb290KCdnZXRNZXRhZGF0YScpO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBnZXRNZXRhZGF0YSQyKHJlZi5zdG9yYWdlLCByZWYuX2xvY2F0aW9uLCBnZXRNYXBwaW5ncygpKTtcclxuICAgIHJldHVybiAoYXdhaXQgcmVmLnN0b3JhZ2UubWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvKSkuZ2V0UHJvbWlzZSgpO1xyXG59XHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2UgdG8gdXBkYXRlIG1ldGFkYXRhIGZvci5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gVGhlIG5ldyBtZXRhZGF0YSBmb3IgdGhlIG9iamVjdC5cclxuICogICAgIE9ubHkgdmFsdWVzIHRoYXQgaGF2ZSBiZWVuIGV4cGxpY2l0bHkgc2V0IHdpbGwgYmUgY2hhbmdlZC4gRXhwbGljaXRseVxyXG4gKiAgICAgc2V0dGluZyBhIHZhbHVlIHRvIG51bGwgd2lsbCByZW1vdmUgdGhlIG1ldGFkYXRhLlxyXG4gKiBAcmV0dXJucyBBIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzXHJcbiAqICAgICB3aXRoIHRoZSBuZXcgbWV0YWRhdGEgZm9yIHRoaXMgb2JqZWN0LlxyXG4gKiAgICAgU2VlIGBmaXJlYmFzZVN0b3JhZ2UuUmVmZXJlbmNlLnByb3RvdHlwZS5nZXRNZXRhZGF0YWBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhJDEocmVmLCBtZXRhZGF0YSkge1xyXG4gICAgcmVmLl90aHJvd0lmUm9vdCgndXBkYXRlTWV0YWRhdGEnKTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gdXBkYXRlTWV0YWRhdGEkMihyZWYuc3RvcmFnZSwgcmVmLl9sb2NhdGlvbiwgbWV0YWRhdGEsIGdldE1hcHBpbmdzKCkpO1xyXG4gICAgcmV0dXJuIChhd2FpdCByZWYuc3RvcmFnZS5tYWtlUmVxdWVzdFdpdGhUb2tlbnMocmVxdWVzdEluZm8pKS5nZXRQcm9taXNlKCk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRvd25sb2FkIFVSTCBmb3IgdGhlIGdpdmVuIFJlZmVyZW5jZS5cclxuICogQHB1YmxpY1xyXG4gKiBAcmV0dXJucyBBIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRvd25sb2FkXHJcbiAqICAgICBVUkwgZm9yIHRoaXMgb2JqZWN0LlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RG93bmxvYWRVUkwkMShyZWYpIHtcclxuICAgIHJlZi5fdGhyb3dJZlJvb3QoJ2dldERvd25sb2FkVVJMJyk7XHJcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGdldERvd25sb2FkVXJsKHJlZi5zdG9yYWdlLCByZWYuX2xvY2F0aW9uLCBnZXRNYXBwaW5ncygpKTtcclxuICAgIHJldHVybiAoYXdhaXQgcmVmLnN0b3JhZ2UubWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvKSlcclxuICAgICAgICAuZ2V0UHJvbWlzZSgpXHJcbiAgICAgICAgLnRoZW4odXJsID0+IHtcclxuICAgICAgICBpZiAodXJsID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5vRG93bmxvYWRVUkwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBEZWxldGVzIHRoZSBvYmplY3QgYXQgdGhpcyBsb2NhdGlvbi5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSBmb3Igb2JqZWN0IHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyBpZiB0aGUgZGVsZXRpb24gc3VjY2VlZHMuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVPYmplY3QkMShyZWYpIHtcclxuICAgIHJlZi5fdGhyb3dJZlJvb3QoJ2RlbGV0ZU9iamVjdCcpO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBkZWxldGVPYmplY3QkMihyZWYuc3RvcmFnZSwgcmVmLl9sb2NhdGlvbik7XHJcbiAgICByZXR1cm4gKGF3YWl0IHJlZi5zdG9yYWdlLm1ha2VSZXF1ZXN0V2l0aFRva2VucyhyZXF1ZXN0SW5mbykpLmdldFByb21pc2UoKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyByZWZlcmVuY2UgZm9yIG9iamVjdCBvYnRhaW5lZCBieSBhcHBlbmRpbmcgYGNoaWxkUGF0aGAgdG8gYHJlZmAuXHJcbiAqXHJcbiAqIEBwYXJhbSByZWYgLSBTdG9yYWdlUmVmZXJlbmNlIHRvIGdldCBjaGlsZCBvZi5cclxuICogQHBhcmFtIGNoaWxkUGF0aCAtIENoaWxkIHBhdGggZnJvbSBwcm92aWRlZCByZWYuXHJcbiAqIEByZXR1cm5zIEEgcmVmZXJlbmNlIHRvIHRoZSBvYmplY3Qgb2J0YWluZWQgYnlcclxuICogYXBwZW5kaW5nIGNoaWxkUGF0aCwgcmVtb3ZpbmcgYW55IGR1cGxpY2F0ZSwgYmVnaW5uaW5nLCBvciB0cmFpbGluZ1xyXG4gKiBzbGFzaGVzLlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gX2dldENoaWxkJDEocmVmLCBjaGlsZFBhdGgpIHtcclxuICAgIGNvbnN0IG5ld1BhdGggPSBjaGlsZChyZWYuX2xvY2F0aW9uLnBhdGgsIGNoaWxkUGF0aCk7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IG5ldyBMb2NhdGlvbihyZWYuX2xvY2F0aW9uLmJ1Y2tldCwgbmV3UGF0aCk7XHJcbiAgICByZXR1cm4gbmV3IFJlZmVyZW5jZShyZWYuc3RvcmFnZSwgbG9jYXRpb24pO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmZ1bmN0aW9uIGlzVXJsKHBhdGgpIHtcclxuICAgIHJldHVybiAvXltBLVphLXpdKzpcXC9cXC8vLnRlc3QocGF0aCk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYSBmaXJlYmFzZVN0b3JhZ2UuUmVmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gdXJsLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVmRnJvbVVSTChzZXJ2aWNlLCB1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHNlcnZpY2UsIHVybCk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYSBmaXJlYmFzZVN0b3JhZ2UuUmVmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gcGF0aCBpbiB0aGUgZGVmYXVsdFxyXG4gKiBidWNrZXQuXHJcbiAqL1xyXG5mdW5jdGlvbiByZWZGcm9tUGF0aChyZWYsIHBhdGgpIHtcclxuICAgIGlmIChyZWYgaW5zdGFuY2VvZiBGaXJlYmFzZVN0b3JhZ2VJbXBsKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IHJlZjtcclxuICAgICAgICBpZiAoc2VydmljZS5fYnVja2V0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbm9EZWZhdWx0QnVja2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IG5ldyBSZWZlcmVuY2Uoc2VydmljZSwgc2VydmljZS5fYnVja2V0KTtcclxuICAgICAgICBpZiAocGF0aCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWZGcm9tUGF0aChyZWZlcmVuY2UsIHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZmVyZW5jZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyByZWYgaXMgYSBSZWZlcmVuY2VcclxuICAgICAgICBpZiAocGF0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZ2V0Q2hpbGQkMShyZWYsIHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVmJDEoc2VydmljZU9yUmVmLCBwYXRoT3JVcmwpIHtcclxuICAgIGlmIChwYXRoT3JVcmwgJiYgaXNVcmwocGF0aE9yVXJsKSkge1xyXG4gICAgICAgIGlmIChzZXJ2aWNlT3JSZWYgaW5zdGFuY2VvZiBGaXJlYmFzZVN0b3JhZ2VJbXBsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWZGcm9tVVJMKHNlcnZpY2VPclJlZiwgcGF0aE9yVXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IGludmFsaWRBcmd1bWVudCgnVG8gdXNlIHJlZihzZXJ2aWNlLCB1cmwpLCB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFN0b3JhZ2UgaW5zdGFuY2UuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHJlZkZyb21QYXRoKHNlcnZpY2VPclJlZiwgcGF0aE9yVXJsKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBleHRyYWN0QnVja2V0KGhvc3QsIGNvbmZpZykge1xyXG4gICAgY29uc3QgYnVja2V0U3RyaW5nID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnW0NPTkZJR19TVE9SQUdFX0JVQ0tFVF9LRVldO1xyXG4gICAgaWYgKGJ1Y2tldFN0cmluZyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTG9jYXRpb24ubWFrZUZyb21CdWNrZXRTcGVjKGJ1Y2tldFN0cmluZywgaG9zdCk7XHJcbn1cclxuZnVuY3Rpb24gY29ubmVjdFN0b3JhZ2VFbXVsYXRvciQxKHN0b3JhZ2UsIGhvc3QsIHBvcnQsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgc3RvcmFnZS5ob3N0ID0gYCR7aG9zdH06JHtwb3J0fWA7XHJcbiAgICBzdG9yYWdlLl9wcm90b2NvbCA9ICdodHRwJztcclxuICAgIGNvbnN0IHsgbW9ja1VzZXJUb2tlbiB9ID0gb3B0aW9ucztcclxuICAgIGlmIChtb2NrVXNlclRva2VuKSB7XHJcbiAgICAgICAgc3RvcmFnZS5fb3ZlcnJpZGVBdXRoVG9rZW4gPVxyXG4gICAgICAgICAgICB0eXBlb2YgbW9ja1VzZXJUb2tlbiA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gbW9ja1VzZXJUb2tlblxyXG4gICAgICAgICAgICAgICAgOiBjcmVhdGVNb2NrVXNlclRva2VuKG1vY2tVc2VyVG9rZW4sIHN0b3JhZ2UuYXBwLm9wdGlvbnMucHJvamVjdElkKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogQSBzZXJ2aWNlIHRoYXQgcHJvdmlkZXMgRmlyZWJhc2UgU3RvcmFnZSBSZWZlcmVuY2UgaW5zdGFuY2VzLlxyXG4gKiBAcGFyYW0gb3B0X3VybCAtIGdzOi8vIHVybCB0byBhIGN1c3RvbSBTdG9yYWdlIEJ1Y2tldFxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIEZpcmViYXNlU3RvcmFnZUltcGwge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAvKipcclxuICAgICAqIEZpcmViYXNlQXBwIGFzc29jaWF0ZWQgd2l0aCB0aGlzIFN0b3JhZ2VTZXJ2aWNlIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBhcHAsIF9hdXRoUHJvdmlkZXIsIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgX2FwcENoZWNrUHJvdmlkZXIsIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgX3Bvb2wsIF91cmwsIF9maXJlYmFzZVZlcnNpb24pIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgICAgICB0aGlzLl9hdXRoUHJvdmlkZXIgPSBfYXV0aFByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX2FwcENoZWNrUHJvdmlkZXIgPSBfYXBwQ2hlY2tQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9wb29sID0gX3Bvb2w7XHJcbiAgICAgICAgdGhpcy5fdXJsID0gX3VybDtcclxuICAgICAgICB0aGlzLl9maXJlYmFzZVZlcnNpb24gPSBfZmlyZWJhc2VWZXJzaW9uO1xyXG4gICAgICAgIHRoaXMuX2J1Y2tldCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBzdHJpbmcgY2FuIGJlIGluIHRoZSBmb3JtYXRzOlxyXG4gICAgICAgICAqIC0gaG9zdFxyXG4gICAgICAgICAqIC0gaG9zdDpwb3J0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5faG9zdCA9IERFRkFVTFRfSE9TVDtcclxuICAgICAgICB0aGlzLl9wcm90b2NvbCA9ICdodHRwcyc7XHJcbiAgICAgICAgdGhpcy5fYXBwSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2RlbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhPcGVyYXRpb25SZXRyeVRpbWUgPSBERUZBVUxUX01BWF9PUEVSQVRJT05fUkVUUllfVElNRTtcclxuICAgICAgICB0aGlzLl9tYXhVcGxvYWRSZXRyeVRpbWUgPSBERUZBVUxUX01BWF9VUExPQURfUkVUUllfVElNRTtcclxuICAgICAgICB0aGlzLl9yZXF1ZXN0cyA9IG5ldyBTZXQoKTtcclxuICAgICAgICBpZiAoX3VybCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1Y2tldCA9IExvY2F0aW9uLm1ha2VGcm9tQnVja2V0U3BlYyhfdXJsLCB0aGlzLl9ob3N0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1Y2tldCA9IGV4dHJhY3RCdWNrZXQodGhpcy5faG9zdCwgdGhpcy5hcHAub3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaG9zdCBzdHJpbmcgZm9yIHRoaXMgc2VydmljZSwgaW4gdGhlIGZvcm0gb2YgYGhvc3RgIG9yXHJcbiAgICAgKiBgaG9zdDpwb3J0YC5cclxuICAgICAqL1xyXG4gICAgZ2V0IGhvc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvc3Q7XHJcbiAgICB9XHJcbiAgICBzZXQgaG9zdChob3N0KSB7XHJcbiAgICAgICAgdGhpcy5faG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VybCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1Y2tldCA9IExvY2F0aW9uLm1ha2VGcm9tQnVja2V0U3BlYyh0aGlzLl91cmwsIGhvc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVja2V0ID0gZXh0cmFjdEJ1Y2tldChob3N0LCB0aGlzLmFwcC5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYXhpbXVtIHRpbWUgdG8gcmV0cnkgdXBsb2FkcyBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgKi9cclxuICAgIGdldCBtYXhVcGxvYWRSZXRyeVRpbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFVwbG9hZFJldHJ5VGltZTtcclxuICAgIH1cclxuICAgIHNldCBtYXhVcGxvYWRSZXRyeVRpbWUodGltZSkge1xyXG4gICAgICAgIHZhbGlkYXRlTnVtYmVyKCd0aW1lJywgXHJcbiAgICAgICAgLyogbWluVmFsdWU9Ki8gMCwgXHJcbiAgICAgICAgLyogbWF4VmFsdWU9ICovIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSwgdGltZSk7XHJcbiAgICAgICAgdGhpcy5fbWF4VXBsb2FkUmV0cnlUaW1lID0gdGltZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1heGltdW0gdGltZSB0byByZXRyeSBvcGVyYXRpb25zIG90aGVyIHRoYW4gdXBsb2FkcyBvciBkb3dubG9hZHMgaW5cclxuICAgICAqIG1pbGxpc2Vjb25kcy5cclxuICAgICAqL1xyXG4gICAgZ2V0IG1heE9wZXJhdGlvblJldHJ5VGltZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4T3BlcmF0aW9uUmV0cnlUaW1lO1xyXG4gICAgfVxyXG4gICAgc2V0IG1heE9wZXJhdGlvblJldHJ5VGltZSh0aW1lKSB7XHJcbiAgICAgICAgdmFsaWRhdGVOdW1iZXIoJ3RpbWUnLCBcclxuICAgICAgICAvKiBtaW5WYWx1ZT0qLyAwLCBcclxuICAgICAgICAvKiBtYXhWYWx1ZT0gKi8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCB0aW1lKTtcclxuICAgICAgICB0aGlzLl9tYXhPcGVyYXRpb25SZXRyeVRpbWUgPSB0aW1lO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgX2dldEF1dGhUb2tlbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fb3ZlcnJpZGVBdXRoVG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJyaWRlQXV0aFRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhdXRoID0gdGhpcy5fYXV0aFByb3ZpZGVyLmdldEltbWVkaWF0ZSh7IG9wdGlvbmFsOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChhdXRoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IGF3YWl0IGF1dGguZ2V0VG9rZW4oKTtcclxuICAgICAgICAgICAgaWYgKHRva2VuRGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuRGF0YS5hY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGFzeW5jIF9nZXRBcHBDaGVja1Rva2VuKCkge1xyXG4gICAgICAgIGNvbnN0IGFwcENoZWNrID0gdGhpcy5fYXBwQ2hlY2tQcm92aWRlci5nZXRJbW1lZGlhdGUoeyBvcHRpb25hbDogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAoYXBwQ2hlY2spIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXBwQ2hlY2suZ2V0VG9rZW4oKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogV2hhdCBkbyB3ZSB3YW50IHRvIGRvIGlmIHRoZXJlIGlzIGFuIGVycm9yIGdldHRpbmcgdGhlIHRva2VuP1xyXG4gICAgICAgICAgICAvLyBDb250ZXh0OiBhcHBDaGVjay5nZXRUb2tlbigpIHdpbGwgbmV2ZXIgdGhyb3cgZXZlbiBpZiBhbiBlcnJvciBoYXBwZW5lZC4gSW4gdGhlIGVycm9yIGNhc2UsIGEgZHVtbXkgdG9rZW4gd2lsbCBiZVxyXG4gICAgICAgICAgICAvLyByZXR1cm5lZCBhbG9uZyB3aXRoIGFuIGVycm9yIGZpZWxkIGRlc2NyaWJpbmcgdGhlIGVycm9yLiBJbiBnZW5lcmFsLCB3ZSBzaG91bGRuJ3QgY2FyZSBhYm91dCB0aGUgZXJyb3IgY29uZGl0aW9uIGFuZCBqdXN0IHVzZVxyXG4gICAgICAgICAgICAvLyB0aGUgdG9rZW4gKGFjdHVhbCBvciBkdW1teSkgdG8gc2VuZCByZXF1ZXN0cy5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgcnVubmluZyByZXF1ZXN0cyBhbmQgcHJldmVudCBtb3JlIGZyb20gYmVpbmcgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgX2RlbGV0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RlbGV0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RzLmZvckVhY2gocmVxdWVzdCA9PiByZXF1ZXN0LmNhbmNlbCgpKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2Ugb2JqZWN0IHJlZmVyZW5jaW5nIHRoaXMgU3RvcmFnZVNlcnZpY2VcclxuICAgICAqIGF0IHRoZSBnaXZlbiBMb2NhdGlvbi5cclxuICAgICAqL1xyXG4gICAgX21ha2VTdG9yYWdlUmVmZXJlbmNlKGxvYykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHRoaXMsIGxvYyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSByZXF1ZXN0SW5mbyAtIEhUVFAgUmVxdWVzdEluZm8gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gYXV0aFRva2VuIC0gRmlyZWJhc2UgYXV0aCB0b2tlblxyXG4gICAgICovXHJcbiAgICBfbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGVsZXRlZCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIHRoaXMuX2FwcElkLCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4sIHRoaXMuX3Bvb2wsIHRoaXMuX2ZpcmViYXNlVmVyc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RzLmFkZChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgLy8gUmVxdWVzdCByZW1vdmVzIGl0c2VsZiBmcm9tIHNldCB3aGVuIGNvbXBsZXRlLlxyXG4gICAgICAgICAgICByZXF1ZXN0LmdldFByb21pc2UoKS50aGVuKCgpID0+IHRoaXMuX3JlcXVlc3RzLmRlbGV0ZShyZXF1ZXN0KSwgKCkgPT4gdGhpcy5fcmVxdWVzdHMuZGVsZXRlKHJlcXVlc3QpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZhaWxSZXF1ZXN0KGFwcERlbGV0ZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXN5bmMgbWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvKSB7XHJcbiAgICAgICAgY29uc3QgW2F1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMuX2dldEF1dGhUb2tlbigpLFxyXG4gICAgICAgICAgICB0aGlzLl9nZXRBcHBDaGVja1Rva2VuKClcclxuICAgICAgICBdKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbik7XHJcbiAgICB9XHJcbn1cblxuY29uc3QgbmFtZSA9IFwiQGZpcmViYXNlL3N0b3JhZ2VcIjtcbmNvbnN0IHZlcnNpb24gPSBcIjAuOC40XCI7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBUeXBlIGNvbnN0YW50IGZvciBGaXJlYmFzZSBTdG9yYWdlLlxyXG4gKi9cclxuY29uc3QgU1RPUkFHRV9UWVBFID0gJ3N0b3JhZ2UnO1xuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgaXMgbm90IHJlc3VtYWJsZS5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0ge0BsaW5rIFN0b3JhZ2VSZWZlcmVuY2V9IHdoZXJlIGRhdGEgc2hvdWxkIGJlIHVwbG9hZGVkLlxyXG4gKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHJldHVybnMgQSBQcm9taXNlIGNvbnRhaW5pbmcgYW4gVXBsb2FkUmVzdWx0XHJcbiAqL1xyXG5mdW5jdGlvbiB1cGxvYWRCeXRlcyhyZWYsIGRhdGEsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiB1cGxvYWRCeXRlcyQxKHJlZiwgZGF0YSwgbWV0YWRhdGEpO1xyXG59XHJcbi8qKlxyXG4gKiBVcGxvYWRzIGEgc3RyaW5nIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgaXMgbm90IHJlc3VtYWJsZS5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0ge0BsaW5rIFN0b3JhZ2VSZWZlcmVuY2V9IHdoZXJlIHN0cmluZyBzaG91bGQgYmUgdXBsb2FkZWQuXHJcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBzdHJpbmcgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gZm9ybWF0IC0gVGhlIGZvcm1hdCBvZiB0aGUgc3RyaW5nIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBzdHJpbmcgdG8gdXBsb2FkLlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgY29udGFpbmluZyBhbiBVcGxvYWRSZXN1bHRcclxuICovXHJcbmZ1bmN0aW9uIHVwbG9hZFN0cmluZyhyZWYsIHZhbHVlLCBmb3JtYXQsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiB1cGxvYWRTdHJpbmckMShyZWYsIHZhbHVlLCBmb3JtYXQsIG1ldGFkYXRhKTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgY2FuIGJlIHBhdXNlZCBhbmQgcmVzdW1lZCwgYW5kIGV4cG9zZXMgcHJvZ3Jlc3MgdXBkYXRlcy5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0ge0BsaW5rIFN0b3JhZ2VSZWZlcmVuY2V9IHdoZXJlIGRhdGEgc2hvdWxkIGJlIHVwbG9hZGVkLlxyXG4gKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHJldHVybnMgQW4gVXBsb2FkVGFza1xyXG4gKi9cclxuZnVuY3Rpb24gdXBsb2FkQnl0ZXNSZXN1bWFibGUocmVmLCBkYXRhLCBtZXRhZGF0YSkge1xyXG4gICAgcmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHJlZik7XHJcbiAgICByZXR1cm4gdXBsb2FkQnl0ZXNSZXN1bWFibGUkMShyZWYsIGRhdGEsIG1ldGFkYXRhKTtcclxufVxyXG4vKipcclxuICogQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuIElmIHRoaXNcclxuICogb2JqZWN0IGRvZXNuJ3QgZXhpc3Qgb3IgbWV0YWRhdGEgY2Fubm90IGJlIHJldHJlaXZlZCwgdGhlIHByb21pc2UgaXNcclxuICogcmVqZWN0ZWQuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byBnZXQgbWV0YWRhdGEgZnJvbS5cclxuICovXHJcbmZ1bmN0aW9uIGdldE1ldGFkYXRhKHJlZikge1xyXG4gICAgcmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHJlZik7XHJcbiAgICByZXR1cm4gZ2V0TWV0YWRhdGEkMShyZWYpO1xyXG59XHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byB1cGRhdGUgbWV0YWRhdGEgZm9yLlxyXG4gKiBAcGFyYW0gbWV0YWRhdGEgLSBUaGUgbmV3IG1ldGFkYXRhIGZvciB0aGUgb2JqZWN0LlxyXG4gKiAgICAgT25seSB2YWx1ZXMgdGhhdCBoYXZlIGJlZW4gZXhwbGljaXRseSBzZXQgd2lsbCBiZSBjaGFuZ2VkLiBFeHBsaWNpdGx5XHJcbiAqICAgICBzZXR0aW5nIGEgdmFsdWUgdG8gbnVsbCB3aWxsIHJlbW92ZSB0aGUgbWV0YWRhdGEuXHJcbiAqIEByZXR1cm5zIEEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbmV3IG1ldGFkYXRhIGZvciB0aGlzIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhKHJlZiwgbWV0YWRhdGEpIHtcclxuICAgIHJlZiA9IGdldE1vZHVsYXJJbnN0YW5jZShyZWYpO1xyXG4gICAgcmV0dXJuIHVwZGF0ZU1ldGFkYXRhJDEocmVmLCBtZXRhZGF0YSk7XHJcbn1cclxuLyoqXHJcbiAqIExpc3QgaXRlbXMgKGZpbGVzKSBhbmQgcHJlZml4ZXMgKGZvbGRlcnMpIHVuZGVyIHRoaXMgc3RvcmFnZSByZWZlcmVuY2UuXHJcbiAqXHJcbiAqIExpc3QgQVBJIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBGaXJlYmFzZSBSdWxlcyBWZXJzaW9uIDIuXHJcbiAqXHJcbiAqIEdDUyBpcyBhIGtleS1ibG9iIHN0b3JlLiBGaXJlYmFzZSBTdG9yYWdlIGltcG9zZXMgdGhlIHNlbWFudGljIG9mICcvJ1xyXG4gKiBkZWxpbWl0ZWQgZm9sZGVyIHN0cnVjdHVyZS5cclxuICogUmVmZXIgdG8gR0NTJ3MgTGlzdCBBUEkgaWYgeW91IHdhbnQgdG8gbGVhcm4gbW9yZS5cclxuICpcclxuICogVG8gYWRoZXJlIHRvIEZpcmViYXNlIFJ1bGVzJ3MgU2VtYW50aWNzLCBGaXJlYmFzZSBTdG9yYWdlIGRvZXMgbm90XHJcbiAqIHN1cHBvcnQgb2JqZWN0cyB3aG9zZSBwYXRocyBlbmQgd2l0aCBcIi9cIiBvciBjb250YWluIHR3byBjb25zZWN1dGl2ZVxyXG4gKiBcIi9cInMuIEZpcmViYXNlIFN0b3JhZ2UgTGlzdCBBUEkgd2lsbCBmaWx0ZXIgdGhlc2UgdW5zdXBwb3J0ZWQgb2JqZWN0cy5cclxuICogbGlzdCgpIG1heSBmYWlsIGlmIHRoZXJlIGFyZSB0b28gbWFueSB1bnN1cHBvcnRlZCBvYmplY3RzIGluIHRoZSBidWNrZXQuXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byBnZXQgbGlzdCBmcm9tLlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFNlZSB7QGxpbmsgTGlzdE9wdGlvbnN9IGZvciBkZXRhaWxzLlxyXG4gKiBAcmV0dXJucyBBIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGl0ZW1zIGFuZCBwcmVmaXhlcy5cclxuICogICAgICBgcHJlZml4ZXNgIGNvbnRhaW5zIHJlZmVyZW5jZXMgdG8gc3ViLWZvbGRlcnMgYW5kIGBpdGVtc2BcclxuICogICAgICBjb250YWlucyByZWZlcmVuY2VzIHRvIG9iamVjdHMgaW4gdGhpcyBmb2xkZXIuIGBuZXh0UGFnZVRva2VuYFxyXG4gKiAgICAgIGNhbiBiZSB1c2VkIHRvIGdldCB0aGUgcmVzdCBvZiB0aGUgcmVzdWx0cy5cclxuICovXHJcbmZ1bmN0aW9uIGxpc3QocmVmLCBvcHRpb25zKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiBsaXN0JDEocmVmLCBvcHRpb25zKTtcclxufVxyXG4vKipcclxuICogTGlzdCBhbGwgaXRlbXMgKGZpbGVzKSBhbmQgcHJlZml4ZXMgKGZvbGRlcnMpIHVuZGVyIHRoaXMgc3RvcmFnZSByZWZlcmVuY2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIGZvciBjYWxsaW5nIGxpc3QoKSByZXBlYXRlZGx5IHVudGlsIHRoZXJlIGFyZVxyXG4gKiBubyBtb3JlIHJlc3VsdHMuIFRoZSBkZWZhdWx0IHBhZ2luYXRpb24gc2l6ZSBpcyAxMDAwLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGUgcmVzdWx0cyBtYXkgbm90IGJlIGNvbnNpc3RlbnQgaWYgb2JqZWN0cyBhcmUgY2hhbmdlZCB3aGlsZSB0aGlzXHJcbiAqIG9wZXJhdGlvbiBpcyBydW5uaW5nLlxyXG4gKlxyXG4gKiBXYXJuaW5nOiBgbGlzdEFsbGAgbWF5IHBvdGVudGlhbGx5IGNvbnN1bWUgdG9vIG1hbnkgcmVzb3VyY2VzIGlmIHRoZXJlIGFyZVxyXG4gKiB0b28gbWFueSByZXN1bHRzLlxyXG4gKiBAcHVibGljXHJcbiAqIEBwYXJhbSByZWYgLSB7QGxpbmsgU3RvcmFnZVJlZmVyZW5jZX0gdG8gZ2V0IGxpc3QgZnJvbS5cclxuICpcclxuICogQHJldHVybnMgQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aXRoIGFsbCB0aGUgaXRlbXMgYW5kIHByZWZpeGVzIHVuZGVyXHJcbiAqICAgICAgdGhlIGN1cnJlbnQgc3RvcmFnZSByZWZlcmVuY2UuIGBwcmVmaXhlc2AgY29udGFpbnMgcmVmZXJlbmNlcyB0b1xyXG4gKiAgICAgIHN1Yi1kaXJlY3RvcmllcyBhbmQgYGl0ZW1zYCBjb250YWlucyByZWZlcmVuY2VzIHRvIG9iamVjdHMgaW4gdGhpc1xyXG4gKiAgICAgIGZvbGRlci4gYG5leHRQYWdlVG9rZW5gIGlzIG5ldmVyIHJldHVybmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdEFsbChyZWYpIHtcclxuICAgIHJlZiA9IGdldE1vZHVsYXJJbnN0YW5jZShyZWYpO1xyXG4gICAgcmV0dXJuIGxpc3RBbGwkMShyZWYpO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkb3dubG9hZCBVUkwgZm9yIHRoZSBnaXZlbiB7QGxpbmsgU3RvcmFnZVJlZmVyZW5jZX0uXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byBnZXQgdGhlIGRvd25sb2FkIFVSTCBmb3IuXHJcbiAqIEByZXR1cm5zIEEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZG93bmxvYWRcclxuICogICAgIFVSTCBmb3IgdGhpcyBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFVSTChyZWYpIHtcclxuICAgIHJlZiA9IGdldE1vZHVsYXJJbnN0YW5jZShyZWYpO1xyXG4gICAgcmV0dXJuIGdldERvd25sb2FkVVJMJDEocmVmKTtcclxufVxyXG4vKipcclxuICogRGVsZXRlcyB0aGUgb2JqZWN0IGF0IHRoaXMgbG9jYXRpb24uXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSBmb3Igb2JqZWN0IHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyBpZiB0aGUgZGVsZXRpb24gc3VjY2VlZHMuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWxldGVPYmplY3QocmVmKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiBkZWxldGVPYmplY3QkMShyZWYpO1xyXG59XHJcbmZ1bmN0aW9uIHJlZihzZXJ2aWNlT3JSZWYsIHBhdGhPclVybCkge1xyXG4gICAgc2VydmljZU9yUmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHNlcnZpY2VPclJlZik7XHJcbiAgICByZXR1cm4gcmVmJDEoc2VydmljZU9yUmVmLCBwYXRoT3JVcmwpO1xyXG59XHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmZ1bmN0aW9uIF9nZXRDaGlsZChyZWYsIGNoaWxkUGF0aCkge1xyXG4gICAgcmV0dXJuIF9nZXRDaGlsZCQxKHJlZiwgY2hpbGRQYXRoKTtcclxufVxyXG4vKipcclxuICogR2V0cyBhIHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gRmlyZWJhc2UgYXBwLlxyXG4gKiBAcHVibGljXHJcbiAqIEBwYXJhbSBhcHAgLSBGaXJlYmFzZSBhcHAgdG8gZ2V0IHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlIGZvci5cclxuICogQHBhcmFtIGJ1Y2tldFVybCAtIFRoZSBnczovLyB1cmwgdG8geW91ciBGaXJlYmFzZSBTdG9yYWdlIEJ1Y2tldC5cclxuICogSWYgbm90IHBhc3NlZCwgdXNlcyB0aGUgYXBwJ3MgZGVmYXVsdCBTdG9yYWdlIEJ1Y2tldC5cclxuICogQHJldHVybnMgQSB7QGxpbmsgRmlyZWJhc2VTdG9yYWdlfSBpbnN0YW5jZS5cclxuICovXHJcbmZ1bmN0aW9uIGdldFN0b3JhZ2UoYXBwID0gZ2V0QXBwKCksIGJ1Y2tldFVybCkge1xyXG4gICAgYXBwID0gZ2V0TW9kdWxhckluc3RhbmNlKGFwcCk7XHJcbiAgICBjb25zdCBzdG9yYWdlUHJvdmlkZXIgPSBfZ2V0UHJvdmlkZXIoYXBwLCBTVE9SQUdFX1RZUEUpO1xyXG4gICAgY29uc3Qgc3RvcmFnZUluc3RhbmNlID0gc3RvcmFnZVByb3ZpZGVyLmdldEltbWVkaWF0ZSh7XHJcbiAgICAgICAgaWRlbnRpZmllcjogYnVja2V0VXJsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdG9yYWdlSW5zdGFuY2U7XHJcbn1cclxuLyoqXHJcbiAqIE1vZGlmeSB0aGlzIHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIENsb3VkIFN0b3JhZ2UgZW11bGF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdG9yYWdlIC0gVGhlIHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlXHJcbiAqIEBwYXJhbSBob3N0IC0gVGhlIGVtdWxhdG9yIGhvc3QgKGV4OiBsb2NhbGhvc3QpXHJcbiAqIEBwYXJhbSBwb3J0IC0gVGhlIGVtdWxhdG9yIHBvcnQgKGV4OiA1MDAxKVxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEVtdWxhdG9yIG9wdGlvbnMuIGBvcHRpb25zLm1vY2tVc2VyVG9rZW5gIGlzIHRoZSBtb2NrIGF1dGhcclxuICogdG9rZW4gdG8gdXNlIGZvciB1bml0IHRlc3RpbmcgU2VjdXJpdHkgUnVsZXMuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmZ1bmN0aW9uIGNvbm5lY3RTdG9yYWdlRW11bGF0b3Ioc3RvcmFnZSwgaG9zdCwgcG9ydCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBjb25uZWN0U3RvcmFnZUVtdWxhdG9yJDEoc3RvcmFnZSwgaG9zdCwgcG9ydCwgb3B0aW9ucyk7XHJcbn1cblxuLyoqXHJcbiAqIENsb3VkIFN0b3JhZ2UgZm9yIEZpcmViYXNlXHJcbiAqXHJcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZmFjdG9yeShjb250YWluZXIsIHsgaW5zdGFuY2VJZGVudGlmaWVyOiB1cmwgfSkge1xyXG4gICAgY29uc3QgYXBwID0gY29udGFpbmVyLmdldFByb3ZpZGVyKCdhcHAnKS5nZXRJbW1lZGlhdGUoKTtcclxuICAgIGNvbnN0IGF1dGhQcm92aWRlciA9IGNvbnRhaW5lci5nZXRQcm92aWRlcignYXV0aC1pbnRlcm5hbCcpO1xyXG4gICAgY29uc3QgYXBwQ2hlY2tQcm92aWRlciA9IGNvbnRhaW5lci5nZXRQcm92aWRlcignYXBwLWNoZWNrLWludGVybmFsJyk7XHJcbiAgICByZXR1cm4gbmV3IEZpcmViYXNlU3RvcmFnZUltcGwoYXBwLCBhdXRoUHJvdmlkZXIsIGFwcENoZWNrUHJvdmlkZXIsIG5ldyBDb25uZWN0aW9uUG9vbCgpLCB1cmwsIFNES19WRVJTSU9OKTtcclxufVxyXG5mdW5jdGlvbiByZWdpc3RlclN0b3JhZ2UoKSB7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudChTVE9SQUdFX1RZUEUsIGZhY3RvcnksIFwiUFVCTElDXCIgLyogUFVCTElDICovKS5zZXRNdWx0aXBsZUluc3RhbmNlcyh0cnVlKSk7XHJcbiAgICAvL1JVTlRJTUVfRU5WIHdpbGwgYmUgcmVwbGFjZWQgZHVyaW5nIHRoZSBjb21waWxhdGlvbiB0byBcIm5vZGVcIiBmb3Igbm9kZWpzIGFuZCBhbiBlbXB0eSBzdHJpbmcgZm9yIGJyb3dzZXJcclxuICAgIHJlZ2lzdGVyVmVyc2lvbihuYW1lLCB2ZXJzaW9uLCAnJyk7XHJcbiAgICAvLyBCVUlMRF9UQVJHRVQgd2lsbCBiZSByZXBsYWNlZCBieSB2YWx1ZXMgbGlrZSBlc201LCBlc20yMDE3LCBjanM1LCBldGMgZHVyaW5nIHRoZSBjb21waWxhdGlvblxyXG4gICAgcmVnaXN0ZXJWZXJzaW9uKG5hbWUsIHZlcnNpb24sICdlc20yMDE3Jyk7XHJcbn1cclxucmVnaXN0ZXJTdG9yYWdlKCk7XG5cbmV4cG9ydCB7IFN0cmluZ0Zvcm1hdCwgRmJzQmxvYiBhcyBfRmJzQmxvYiwgTG9jYXRpb24gYXMgX0xvY2F0aW9uLCBUYXNrRXZlbnQgYXMgX1Rhc2tFdmVudCwgVGFza1N0YXRlIGFzIF9UYXNrU3RhdGUsIFVwbG9hZFRhc2sgYXMgX1VwbG9hZFRhc2ssIGRhdGFGcm9tU3RyaW5nIGFzIF9kYXRhRnJvbVN0cmluZywgX2dldENoaWxkLCBpbnZhbGlkQXJndW1lbnQgYXMgX2ludmFsaWRBcmd1bWVudCwgaW52YWxpZFJvb3RPcGVyYXRpb24gYXMgX2ludmFsaWRSb290T3BlcmF0aW9uLCBjb25uZWN0U3RvcmFnZUVtdWxhdG9yLCBkZWxldGVPYmplY3QsIGdldERvd25sb2FkVVJMLCBnZXRNZXRhZGF0YSwgZ2V0U3RvcmFnZSwgbGlzdCwgbGlzdEFsbCwgcmVmLCB1cGRhdGVNZXRhZGF0YSwgdXBsb2FkQnl0ZXMsIHVwbG9hZEJ5dGVzUmVzdW1hYmxlLCB1cGxvYWRTdHJpbmcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbTIwMTcuanMubWFwXG4iLCJleHBvcnQgKiBmcm9tICdAZmlyZWJhc2Uvc3RvcmFnZSc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5lc20uanMubWFwXG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHYxIH0gZnJvbSAnLi92MS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHYzIH0gZnJvbSAnLi92My5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHY0IH0gZnJvbSAnLi92NC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHY1IH0gZnJvbSAnLi92NS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5JTCB9IGZyb20gJy4vbmlsLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHZhbGlkYXRlIH0gZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2UgfSBmcm9tICcuL3BhcnNlLmpzJzsiLCIvKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbXNnID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGJ5dGVzKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KG1zZy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyArK2kpIHtcbiAgICAgIGJ5dGVzW2ldID0gbXNnLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1kNVRvSGV4RW5jb2RlZEFycmF5KHdvcmRzVG9NZDUoYnl0ZXNUb1dvcmRzKGJ5dGVzKSwgYnl0ZXMubGVuZ3RoICogOCkpO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhbiBhcnJheSBvZiBieXRlc1xuICovXG5cblxuZnVuY3Rpb24gbWQ1VG9IZXhFbmNvZGVkQXJyYXkoaW5wdXQpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgdmFyIGhleFRhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHtcbiAgICB2YXIgeCA9IGlucHV0W2kgPj4gNV0gPj4+IGkgJSAzMiAmIDB4ZmY7XG4gICAgdmFyIGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgdmFyIGEgPSAxNzMyNTg0MTkzO1xuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gIHZhciBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlQWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICB9XG5cbiAgcmV0dXJuIFthLCBiLCBjLCBkXTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IGJ5dGVzIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5cblxuZnVuY3Rpb24gYnl0ZXNUb1dvcmRzKGlucHV0KSB7XG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIHZhciBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHtcbiAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xufVxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVjbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcbn1cblxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBkIHwgYyAmIH5kLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZDU7IiwiZXhwb3J0IGRlZmF1bHQgJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG5mdW5jdGlvbiBwYXJzZSh1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgdmFyIHY7XG4gIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIFBhcnNlICMjIyMjIyMjLS4uLi4tLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFyclswXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgwLCA4KSwgMTYpKSA+Pj4gMjQ7XG4gIGFyclsxXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzJdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclszXSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0jIyMjLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoOSwgMTMpLCAxNikpID4+PiA4O1xuICBhcnJbNV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0jIyMjLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzZdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxOCksIDE2KSkgPj4+IDg7XG4gIGFycls3XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tIyMjIy0uLi4uLi4uLi4uLi5cblxuICBhcnJbOF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTksIDIzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzldID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0uLi4uLSMjIyMjIyMjIyMjI1xuICAvLyAoVXNlIFwiL1wiIHRvIGF2b2lkIDMyLWJpdCB0cnVuY2F0aW9uIHdoZW4gYml0LXNoaWZ0aW5nIGhpZ2gtb3JkZXIgYnl0ZXMpXG5cbiAgYXJyWzEwXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMV0gPSB2IC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTJdID0gdiA+Pj4gMjQgJiAweGZmO1xuICBhcnJbMTNdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMTRdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclsxNV0gPSB2ICYgMHhmZjtcbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2U7IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCIvLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IE47ICsrX2kpIHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQzMkFycmF5KDE2KTtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgYXJyW2pdID0gYnl0ZXNbX2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMl0gPDwgOCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1bX2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBOOyArK19pMikge1xuICAgIHZhciBXID0gbmV3IFVpbnQzMkFycmF5KDgwKTtcblxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfdCA9IDE2OyBfdCA8IDgwOyArK190KSB7XG4gICAgICBXW190XSA9IFJPVEwoV1tfdCAtIDNdIF4gV1tfdCAtIDhdIF4gV1tfdCAtIDE0XSBeIFdbX3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIHZhciBhID0gSFswXTtcbiAgICB2YXIgYiA9IEhbMV07XG4gICAgdmFyIGMgPSBIWzJdO1xuICAgIHZhciBkID0gSFszXTtcbiAgICB2YXIgZSA9IEhbNF07XG5cbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hhMTsiLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnOyAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xuXG52YXIgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgQXJyYXkoMTYpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTsgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG5cbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW3NlZWRCeXRlc1swXSB8IDB4MDEsIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXTtcbiAgICB9XG5cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH0gLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG5cblxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogRGF0ZS5ub3coKTsgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTsgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuXG4gIHZhciBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7IC8vIGB0aW1lX21pZGBcblxuICB2YXIgdG1oID0gbXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmOyAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjsgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG5cbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwOyAvLyBgY2xvY2tfc2VxX2xvd2BcblxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7IC8vIGBub2RlYFxuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBzdHJpbmdpZnkoYik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHYxOyIsImltcG9ydCB2MzUgZnJvbSAnLi92MzUuanMnO1xuaW1wb3J0IG1kNSBmcm9tICcuL21kNS5qcyc7XG52YXIgdjMgPSB2MzUoJ3YzJywgMHgzMCwgbWQ1KTtcbmV4cG9ydCBkZWZhdWx0IHYzOyIsImltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UuanMnO1xuXG5mdW5jdGlvbiBzdHJpbmdUb0J5dGVzKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgdmFyIGJ5dGVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuZXhwb3J0IHZhciBETlMgPSAnNmJhN2I4MTAtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydCB2YXIgVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lc3BhY2UgPSBwYXJzZShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmIChuYW1lc3BhY2UubGVuZ3RoICE9PSAxNikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdOYW1lc3BhY2UgbXVzdCBiZSBhcnJheS1saWtlICgxNiBpdGVyYWJsZSBpbnRlZ2VyIHZhbHVlcywgMC0yNTUpJyk7XG4gICAgfSAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuXG5cbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNiArIHZhbHVlLmxlbmd0aCk7XG4gICAgYnl0ZXMuc2V0KG5hbWVzcGFjZSk7XG4gICAgYnl0ZXMuc2V0KHZhbHVlLCBuYW1lc3BhY2UubGVuZ3RoKTtcbiAgICBieXRlcyA9IGhhc2hmdW5jKGJ5dGVzKTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMHgwZiB8IHZlcnNpb247XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDB4M2YgfCAweDgwO1xuXG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5naWZ5KGJ5dGVzKTtcbiAgfSAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcblxuXG4gIHRyeSB7XG4gICAgZ2VuZXJhdGVVVUlELm5hbWUgPSBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgfSBjYXRjaCAoZXJyKSB7fSAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuXG5cbiAgZ2VuZXJhdGVVVUlELkROUyA9IEROUztcbiAgZ2VuZXJhdGVVVUlELlVSTCA9IFVSTDtcbiAgcmV0dXJuIGdlbmVyYXRlVVVJRDtcbn0iLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgdjM1IGZyb20gJy4vdjM1LmpzJztcbmltcG9ydCBzaGExIGZyb20gJy4vc2hhMS5qcyc7XG52YXIgdjUgPSB2MzUoJ3Y1JywgMHg1MCwgc2hhMSk7XG5leHBvcnQgZGVmYXVsdCB2NTsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5cbmZ1bmN0aW9uIHZlcnNpb24odXVpZCkge1xuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnN1YnN0cigxNCwgMSksIDE2KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmVyc2lvbjsiXSwic291cmNlUm9vdCI6IiJ9