import {EchoPromiseStatus} from "./EchoPromiseStatus";
import {EchoError} from "./EchoError";
import {EchoResponse} from "./EchoResponse";

export class EchoPromise<T> {

    /**
     * Promise that will be used as EchoPromise.
     */
    private promise: Promise<T>;

    constructor(promise: Promise<T>) {
        this.promise = promise;
    }

    /**
     * Status of the request.
     */
    status: EchoPromiseStatus = EchoPromiseStatus.LOADING;

    /**
     * Data received on a successful request.
     */
    data?: T;

    /**
     * Error received on a failed request.
     */
    error?: EchoError;

    /**
     * Response received on a successful request.
     */
    response?: EchoResponse;

    /**
     * Get if the request is loading.
     */
    isLoading(): boolean {
        return this.status === EchoPromiseStatus.LOADING;
    }

    /**
     * Get if the request succeeded.
     */
    isSuccess(): boolean {
        return this.status === EchoPromiseStatus.SUCCESS;
    };

    /**
     * Get if the request failed.
     */
    isError(): boolean {
        return this.status === EchoPromiseStatus.ERROR;
    }

    /**
     * Convert the optional data object to an actual data object.
     *  Warning: will throw error when not defined.
     */
    requireData(): T {
        if(this.data === undefined) {
            throw new Error("Data is undefined.")
        }

        return this.data!!;
    }

    /**
     * Convert the optional error object to an actual error object.
     *  Warning: will throw error when not defined.
     */
    requireError(): EchoError {
        if(this.error === undefined) {
            throw new Error("Error is undefined.")
        }

        return this.error!!;
    }

    /**
     * Convert the optional response object to an actual response object.
     *  Warning: will throw error when not defined.
     */
    requireResponse(): EchoResponse {
        if(this.response === undefined) {
            throw new Error("Response is undefined.")
        }

        return this.response!!;
    }

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null) {
        this.promise.then(onfulfilled, onrejected);
    }

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null) {
        this.promise.catch();
    }

    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null) {
        this.promise.finally(onfinally);
    }
}