/**
 * Asynchronous queue member for our asynchronous queue
 * Ever object in the Asynchronoues queue needs to implement this interface
 */
export interface AsyncRunnable<T> {
    start();
    then(func: (data: any) => any): AsyncRunnable<T>;
    catch(func: (data: any) => any): AsyncRunnable<T>;
    finally(func: () => void): AsyncRunnable<T>;
}